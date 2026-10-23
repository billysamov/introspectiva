-- Run once in the Supabase SQL editor or with `supabase db push`.
-- The browser cannot read, write, or call this endpoint directly.
begin;

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

create table public.contact_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 2 and 100),
  email text not null check (char_length(email) between 3 and 254),
  company text check (char_length(company) <= 120),
  service text not null check (service in ('landing', 'corporativa', 'ecommerce', 'sistema', 'asesoria')),
  budget text check (char_length(budget) <= 80),
  message text not null check (char_length(message) between 20 and 4000),
  consent boolean not null check (consent is true),
  consent_version text not null default 'contact-v1',
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'closed'))
);
create index contact_requests_created_at_idx on public.contact_requests (created_at desc);
alter table public.contact_requests enable row level security;
revoke all on public.contact_requests from public, anon, authenticated, service_role;
-- Dashboard/admin access stays available; new rows must use the rate-limited RPC.
grant select, update, delete on public.contact_requests to service_role;

create table private.contact_rate_events (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  email_hash text not null check (email_hash ~ '^[a-f0-9]{64}$'),
  ip_hash text check (ip_hash ~ '^[a-f0-9]{64}$')
);
create index contact_rate_events_email_idx on private.contact_rate_events (email_hash, created_at);
create index contact_rate_events_ip_idx on private.contact_rate_events (ip_hash, created_at);
create index contact_rate_events_expiry_idx on private.contact_rate_events (created_at);
alter table private.contact_rate_events enable row level security;
revoke all on private.contact_rate_events from public, anon, authenticated, service_role;
revoke all on sequence private.contact_rate_events_id_seq from public, anon, authenticated, service_role;

create function public.submit_contact_request(
  p_name text,
  p_email text,
  p_company text,
  p_service text,
  p_budget text,
  p_message text,
  p_consent boolean,
  p_email_hash text,
  p_ip_hash text
) returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_id uuid;
  v_now timestamptz := clock_timestamp();
  v_lock bigint;
  v_count bigint;
  v_first timestamptz;
begin
  if p_email_hash is null or p_email_hash !~ '^[a-f0-9]{64}$'
     or (p_ip_hash is not null and p_ip_hash !~ '^[a-f0-9]{64}$') then
    raise exception 'Invalid rate-limit identity' using errcode = '22023';
  end if;

  -- Shared transaction locks serialize requests across every Vercel instance.
  -- Sorted lock IDs avoid deadlocks when requests share either identifier.
  for v_lock in
    select distinct hashtextextended(identity, 0) as lock_id
    from unnest(array['contact:email:' || p_email_hash, 'contact:ip:' || p_ip_hash]) as identities(identity)
    where identity is not null
    order by lock_id
  loop
    perform pg_advisory_xact_lock(v_lock);
  end loop;

  -- Purges old limiter hashes during traffic; no IP is stored on the lead.
  delete from private.contact_rate_events where created_at < v_now - interval '24 hours';
  select count(*), min(created_at) into v_count, v_first
    from private.contact_rate_events
    where email_hash = p_email_hash and created_at > v_now - interval '24 hours';
  if v_count >= 3 then
    return jsonb_build_object('status', 'rate_limited', 'retry_after',
      greatest(1, ceil(extract(epoch from v_first + interval '24 hours' - v_now))));
  end if;

  if p_ip_hash is not null then
    select count(*), min(created_at) into v_count, v_first
      from private.contact_rate_events
      where ip_hash = p_ip_hash and created_at > v_now - interval '1 hour';
    if v_count >= 5 then
      return jsonb_build_object('status', 'rate_limited', 'retry_after',
        greatest(1, ceil(extract(epoch from v_first + interval '1 hour' - v_now))));
    end if;
  end if;

  insert into public.contact_requests (name, email, company, service, budget, message, consent)
    values (p_name, p_email, p_company, p_service, p_budget, p_message, p_consent)
    returning id into v_id;
  insert into private.contact_rate_events (created_at, email_hash, ip_hash)
    values (v_now, p_email_hash, p_ip_hash);
  return jsonb_build_object('status', 'accepted', 'id', v_id);
end;
$$;

revoke all on function public.submit_contact_request(text, text, text, text, text, text, boolean, text, text) from public, anon, authenticated;
grant execute on function public.submit_contact_request(text, text, text, text, text, text, boolean, text, text) to service_role;

comment on function public.submit_contact_request(text, text, text, text, text, text, boolean, text, text)
  is 'Server-only atomic lead capture: 3 submissions/email/24h, 5 submissions/IP/1h. HMAC identities only.';
commit;
