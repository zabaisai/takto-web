# Movimiento y accesibilidad

## El fallo que originó este documento

Dos secciones de la landing (WhatsApp Business y el CTA final) perdieron su título,
su descripción y su lista de beneficios. En pantalla solo sobrevivían los checks verdes,
el botón dorado y tres tarjetas oscuras.

**No fue un problema de animación.** En ese momento la landing no tenía ni un solo
revelado por scroll. La causa era CSS inválido:

```css
/* Lo que generaba Tailwind a partir de la utilidad de fondo arbitraria */
background-image: radial-gradient(900px 500px at 85% 0%, …), var(--color-ink);
```

Las secciones oscuras declaraban su fondo con una utilidad `bg-[…]` que mezclaba capas
de gradiente y, como última capa, un color sólido. Eso es válido en la propiedad
abreviada `background`, que es como estaba escrito en el mockup original, pero Tailwind
traduce una utilidad de fondo con gradientes a **`background-image`**, y `background-image`
solo admite valores de tipo `<image>`. Un color no lo es.

Consecuencia en cadena:

1. La declaración queda inválida en tiempo de cómputo.
2. `background-image` vuelve a su valor inicial: `none`.
3. La sección no recibe ningún color de fondo y se pinta transparente.
4. El marfil de la página (`#F8F5EF`) se ve a través.
5. Todo el texto `text-bone` (también `#F8F5EF`) queda a contraste 1:1: invisible.
6. El contenido sigue ocupando altura, así que la sección parece "medio vacía".

Solo sobrevivía lo que llevaba color propio: los checks verdes, el botón con texto
oscuro sobre dorado y las tarjetas con `bg-ink-panel`.

### La regla que se deriva

Las superficies de sección se declaran en `src/styles/globals.css` como clases
(`.surface-hero`, `.surface-ink-wa`, `.surface-ink-flow`, `.surface-ink-gold`,
`.surface-bone-gold`), con `background-color` y `background-image` **separados**.

Nunca se pone un color como capa dentro de una utilidad de fondo arbitraria.
Hay pruebas que lo verifican en `src/components/landing/visibility.test.tsx`.

> Nota: Tailwind escanea también los comentarios del código. Escribir la sintaxis
> defectuosa dentro de un comentario vuelve a generar la clase muerta en el CSS,
> así que en el código se describe en prosa.

---

## Regla fundamental del movimiento

**Todo el contenido esencial es visible por defecto. Ninguna animación es necesaria
para que aparezca.**

El movimiento solo mejora la entrada o marca el ritmo de una demostración. Si el
JavaScript falla, si `IntersectionObserver` no existe, si el observer no dispara o si el
usuario pide reducción de movimiento, la información sigue completa y legible.

## Cómo se implementa

### `Reveal` — entrada escalonada

`src/components/motion/Reveal.tsx`

El servidor renderiza `data-reveal="idle"`, que en CSS es opacidad 1 y sin transformar.
Solo después de hidratar, y **solo si el elemento está por debajo del pliegue**, pasa a
`armed` y se observa su entrada.

| Situación | Resultado |
| --- | --- |
| Sin JavaScript | Visible |
| Sin `IntersectionObserver` | Visible |
| `prefers-reduced-motion` | Visible (además el CSS lo fuerza con `!important`) |
| Recarga a media página | Lo que ya está en pantalla, visible |
| Volver atrás en el historial | Visible |
| El observer nunca dispara | Un temporizador de respaldo de 1,2 s lo revela |
| Elemento ya en viewport al cargar | Nunca se oculta, aparece de inmediato |

Nunca se oculta contenido que el usuario ya podría estar viendo.

El observer y el temporizador se retiran en la función de limpieza del efecto.

### `Sequence` — demostraciones en bucle

`src/components/motion/Sequence.tsx`

Decide **cuándo** corren las animaciones, nunca si el contenido se ve. Alterna
`data-seq` entre `run` e `idle`; en `idle` el CSS aplica
`animation-play-state: paused`, así que los elementos se congelan donde estén,
sin ocultarse.

Se pausa cuando el bloque sale del viewport y cuando `document.visibilityState`
deja de ser `visible`, lo que evita que se acumulen ciclos al cambiar de pestaña.
Con `prefers-reduced-motion` no llega a arrancar.

El observer y el listener de visibilidad se retiran al desmontar. Hay pruebas de
ello en `src/components/motion/motion.test.tsx`.

### Ningún fotograma oculta información

Las secuencias no llevan contenido a opacidad 0. Los mensajes del chat y la
notificación final bajan como mucho a 0,4–0,45 de opacidad; los pasos ya recorridos
se quedan encendidos. Los elementos que sí desaparecen por completo son capas
puramente decorativas y llevan `aria-hidden`: el punto que viaja del teléfono al CRM,
el halo de las marcas de ejemplo y la marca de verificación superpuesta.

## Sistema de duraciones

Definido una sola vez en `globals.css`. Ningún componente inventa las suyas.

| Uso | Duración |
| --- | --- |
| Microinteracciones (hover, foco, subrayados) | 150–300 ms |
| Entradas de bloque | 560 ms |
| Secuencias demostrativas | 8 s por ciclo |

Curvas: `--ease-premium` y `--ease-premium-out`. Sin rebotes.

## Reducción de movimiento

Con `prefers-reduced-motion: reduce` se eliminan animaciones, transiciones y el
desplazamiento suave. Además se fuerza:

- `[data-reveal]` en cualquier estado → opacidad 1, sin transformar.
- Cualquier clase `seq-*` → opacidad 1, sin transformar.
- `.hero-in` → visible.
- `.proc-fill` → barra completa, no vacía.
- El panel de FAQ abierto → opaco.

Es decir: se pierde el movimiento, nunca la información.

## Accesibilidad de los mockups

Cada mockup de producto se expone como `role="img"` con un `aria-label` que describe el
proceso completo y termina indicando que son datos de ejemplo. Un lector de pantalla
recibe la información sin depender de la animación.

Las etiquetas de estado de las demostraciones son texto real, no imágenes.

## Rendimiento

Dos decisiones tomadas tras ver el renderizador bloquearse durante el scroll:

1. **Sin `mask-image` en las cuadrículas de fondo.** Enmascarar una capa a pantalla
   completa obliga al compositor a rasterizarla en cada fotograma. El desvanecido se
   consigue con un degradado dentro del propio `background-image`, sin coste de
   composición. Además la cuadrícula solo se pinta desde 768 px.
2. **Un único valor de `backdrop-filter` en el header.** Cambiar el desenfoque al
   hacer scroll obligaba a rehacer la capa; ahora solo cambian color, borde y sombra.

Las secuencias fuera del viewport están pausadas, así que el coste no crece con la
longitud de la página.

## Nota sobre la CSP en preview

`upgrade-insecure-requests` va activado en producción. En un preview servido por HTTP
sobre una IP de red el navegador no considera de confianza esa IP, fuerza la hoja de
estilos a `https://` y la petición falla: la página se ve sin CSS.

Para eso existe `CSP_ALLOW_INSECURE_PREVIEW=1`, que **solo** debe usarse en preview.
Se pasa como argumento de build (`--build-arg`), porque las cabeceras de
`next.config.ts` se resuelven durante el build y no en tiempo de ejecución.
