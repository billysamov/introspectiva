import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/inter";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Motion } from "@/components/motion";
import { BrandExperience } from "@/components/brand-experience";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { InteractiveCursor } from "@/components/interactive-cursor";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Introspectiva Studio — Diseño que mira más allá", template: "%s | Introspectiva Studio" },
  description: site.description,
  openGraph: { type: "website", locale: "es_PE", siteName: site.name, title: "Introspectiva Studio — Diseño que mira más allá", description: site.description, images: [{ url: "/images/hero-sculpture.png", width: 1536, height: 1024, alt: "Introspectiva Studio — diseño, estrategia y tecnología" }] },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <a href="#contenido" className="skip-link">Saltar al contenido</a>
        <InteractiveCursor />
        <Header />
        <Motion>
          <main id="contenido">{children}</main>
          <BrandExperience />
          <WhatsAppButton />
        </Motion>
        <Footer />
      </body>
    </html>
  );
}
