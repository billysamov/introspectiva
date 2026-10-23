# Experiencia de marca

`components/brand-experience.tsx` exporta `BrandExperience`. Se monta una vez dentro de `Motion`; usa `useMotionSettings().paused` y la preferencia de movimiento reducido del sistema. No requiere dependencias adicionales.

## Entrada

El preloader dibuja las partes del símbolo con GSAP y abre una cortina hacia arriba. Se muestra una vez por sesión del navegador, usando la clave `introspectiva:intro:v1` de `sessionStorage`. Espera las fuentes y un máximo de cuatro imágenes prioritarias; las imágenes diferidas no retrasan la página. Si los recursos ya están listos, la firma dura aproximadamente 1,4 segundos. Un límite total de 2,5 segundos libera la pantalla incluso si la red falla. No muestra porcentajes ficticios.

El HTML inicial mantiene la cortina invisible: la página se puede usar sin JavaScript. El preloader no mueve ni atrapa el foco. Un estado de carga accesible acompaña la animación. Escape, cambiar de pestaña, pausar las animaciones o activar movimiento reducido liberan inmediatamente la pantalla. Con movimiento reducido o animaciones pausadas, se omite la entrada.

## Navegación

Un clic principal sobre un enlace a otra ruta interna cierra brevemente la cortina, navega con el router de Next y vuelve a abrirla cuando cambia la ruta. Un límite de 1,8 segundos evita que la cortina quede bloqueada. Enlaces externos, archivos estáticos, descargas, anclas en la misma página, clics modificados, nuevas pestañas y activación con teclado conservan su comportamiento nativo. `data-transition="off"` permite excluir un enlace.

Al navegar con teclado, historial o código se dibuja una pequeña firma en la esquina superior derecha, sin cubrir el contenido. El movimiento reducido y el control global de pausa desactivan ambas variantes. No se interceptan los controles Atrás/Adelante.

Las navegaciones capturadas usan `router.push(..., { scroll: false })` y colocan la nueva página instantáneamente al inicio, o en el ancla indicada en su URL, antes de revelar la cortina. Si la ruta tarda más que el límite visual, se conserva únicamente ese destino de scroll para aplicarlo cuando llegue. Atrás/Adelante cancela ese destino; las navegaciones nativas y los cambios de ancla dentro de la misma página conservan su scroll habitual.

## Sonido

Los botones `.button` principales, `.header-cta`, `.round-cta`, navegación principal y móvil, apertura del menú, tarjetas y filtros de proyectos, enlaces `.text-link`, filas de servicios y elementos con `data-sound` emiten un tono suave de 140 ms. Las etapas del proceso y el botón global de WhatsApp participan mediante `data-sound`. Los botones secundarios están excluidos de forma predeterminada. `data-sound="off"` excluye cualquier control. El audio se sintetiza localmente mediante Web Audio: no descarga pistas ni requiere un servicio externo.

No existe autoplay. El contexto de audio se crea únicamente tras un clic humano, incluyendo activación accesible por teclado, y se espera su reanudación antes de emitir el tono. Los eventos sintéticos no producen sonido. El control inferior derecho refleja la preferencia y la guarda en `localStorage`, clave `introspectiva:sound:v1`. Silenciar no emite tono; volver a activar reproduce una muestra. Si el navegador impide audio o almacenamiento, la navegación continúa funcionando. El contexto se cierra al desmontar el componente.

## WhatsApp global

`WhatsAppButton` aparece en todas las rutas públicas desde el layout. Abre el número oficial de Introspectiva, +51 922 394 336, en otra pestaña con un saludo genérico editable. No envía mensajes automáticamente. Comparte la URL con la página de contacto mediante `lib/contact-channels.ts`. Su posición deja espacio al control de sonido y contempla las áreas seguras del móvil.

## Archivos vectoriales

- Símbolo: `/logo-symbol.svg`.
- Logo completo: `/logo-lockup.svg`.

Se pueden abrir estas rutas en la web y guardar los SVG, o tomar los originales de `public/`. Son gráficos vectoriales con fondo transparente, preparados para fondos oscuros. El símbolo conserva la geometría del `BrandMark` existente y separa anillo blanco, anillo azul, punto, flecha y línea en piezas identificables. La variante completa incluye letras convertidas a curvas para no depender de fuentes externas. Es una reconstrucción digital basada en la referencia suministrada, no el archivo original de identidad.

Para repetir la entrada durante desarrollo, eliminar `introspectiva:intro:v1` en el almacenamiento de sesión y recargar. Una pestaña nueva puede heredar el almacenamiento de sesión del navegador si se abre desde otra; borrar esa clave permite reiniciar la prueba de forma explícita.
