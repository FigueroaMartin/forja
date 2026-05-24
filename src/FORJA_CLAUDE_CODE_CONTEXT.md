# FORJA — Contexto completo para Claude Code

> Copia y pega este documento completo al inicio de cada sesión con Claude Code.

---

## 1. QUÉ ES FORJA

**FORJA** es una tienda e-commerce de joyería masculina de autor chilena.
Concepto: *"Joyería con identidad. Porque cada hombre lleva consigo una historia digna de representar."*

El cliente objetivo es el hombre ejecutivo y contemporáneo (25–45 años) que quiere proyectar seguridad, elegancia y personalidad con piezas sobrias pero con carácter. No es joyería de lujo ostentoso — es joyería de identidad silenciosa.

---

## 2. STACK TÉCNICO ACTUAL

```
Framework:   React (Vite, JavaScript — NO TypeScript)
Estilos:     CSS-in-JS (string template dentro del componente, variable `css`)
Estado:      useState / useRef (sin Zustand, sin Redux)
Routing:     Estado interno con variable `view` (sin React Router)
Fuentes:     Cormorant Garamond (serif) + DM Mono (monospace) — Google Fonts
Imágenes:    Unsplash CDN (URLs directas, no assets locales)
Sin backend: Todo es mock data — sin API, sin base de datos, sin auth
Deploy:      Local Vite — npm run dev → http://localhost:5173
```

**Archivo principal:** `src/App.jsx` (todo el proyecto vive en un solo archivo)

**Ruta del proyecto:**
```
C:\Users\marti\OneDrive\Escritorio\Forja\forja-web\
```

**Para correr:**
```bash
cd C:\Users\marti\OneDrive\Escritorio\Forja\forja-web
npm run dev
```

---

## 3. IDENTIDAD VISUAL — TOKENS EXACTOS

```css
--bg:      #0a0a0a   /* negro profundo — fondo global, NUNCA cambia */
--surf:    #111111   /* superficies de tarjetas y paneles */
--surf2:   #0e0e0e   /* superficies alternadas */
--brd:     #1e1e1e   /* bordes suaves (0.5px) */
--brd2:    #2a2a2a   /* bordes de énfasis */
--txt:     #f0ede8   /* texto principal (crema) */
--mut:     #666666   /* texto secundario / muted */
--mut2:    #444444   /* texto muy secundario */
--gold:    #C9A84C   /* acento dorado — color principal de marca */
--silver:  #A8A9AD   /* acento plata — color secundario */
--white:   #ffffff
--serif:   'Cormorant Garamond', Georgia, serif
--mono:    'DM Mono', monospace
--ease:    cubic-bezier(.25,.46,.45,.94)
--eout:    cubic-bezier(0,.55,.45,1)
```

**Reglas irrompibles de estilo:**
- Fondo siempre `#0a0a0a`. NUNCA fondo claro en ninguna página.
- Bordes siempre `0.5px` — nunca `1px` grueso.
- Acentos exclusivamente dorado y plata. Sin azul, rojo, verde.
- Tipografía headings → Cormorant Garamond weight 300. UI → DM Mono weight 300–400.
- Sin sombras fuertes (`box-shadow`). Sin gradientes decorativos.
- Animaciones 200–400ms, ease cubic-bezier.
- El CSS completo vive en la variable `const css` dentro de `App.jsx`.

---

## 4. ESTRUCTURA DE VISTAS (variable `view`)

```
"catalog"   → Página principal: hero + trust strip + catálogo por líneas + banners + footer
"detail"    → Página de producto individual (estilo Brava Joyería)
"checkout"  → Formulario de pago simulado
"success"   → Pantalla de confirmación de pedido
```

**Navegación:**
- No hay React Router. El cambio de vista se hace con `setView("nombre")`.
- El carrito es un panel lateral (`cartOpen: boolean`) sobre cualquier vista.

---

## 5. COMPONENTES PRINCIPALES

```
<App/>              → Root. Maneja todo el estado global.
<Nav/>              → Sticky. Logo + teléfono + carrito + barra de líneas (tabs).
<Gallery/>          → Galería de producto con imagen principal + miniaturas clicables.
<ProductDetail/>    → Página de detalle al estilo Brava: galería + concepto + material + precio + reviews.
<CartPanel/>        → Slide-in desde la derecha. Lista de items + total + CTA checkout.
<CheckoutForm/>     → Formulario simulado (nombre, email, tarjeta). Sin pago real.
<SuccessScreen/>    → Confirmación con ID de pedido generado dinámicamente.
<Logo/>             → SVG vectorial del logo FORJA (hexágono + diamante + punto dorado).
```

**Componentes inline en catalog view** (no son componentes separados, están en el JSX del return):
- Announcement bar
- Hero section
- Trust strip (4 columnas)
- Catálogo por líneas con `byLinea` grouping
- Highlight banner (imagen + texto)
- Craft section (texto + imagen)
- Testimonials grid
- Newsletter
- Footer

---

## 6. DATA STRUCTURE — PRODUCTOS

Cada producto tiene esta forma:

```js
{
  id: "frj-r01",           // ID único
  slug: "norte",           // URL slug (no se usa aún para routing)
  linea: "Anillos",        // "Anillos" | "Collares" | "Pulseras"
  name: "Norte",           // Nombre de la pieza
  basePrice: 89,           // Precio base en USD (sin material modifier)
  tagline: "Sigue tu dirección. Sin excusas.",
  concepto: "Texto largo que explica la historia e inspiración de la pieza...",
  inspiracion: "Dirección · Propósito · Claridad",  // 3 palabras clave
  detalles: ["Anillo sello de perfil bajo", "Acero 316L · Plata 925 · Oro 18K", ...],
  accent: "#C9A84C",       // Color de acento (gold o silver)
  tag: "Más vendido",      // Badge opcional | null
  img: "https://images.unsplash.com/...",   // Imagen principal (thumbnail)
  imgs: ["url1", "url2", "url3"],           // Array para galería en detail
  reviews: [
    { name: "Rodrigo V.", stars: 5, text: "..." },
  ]
}
```

---

## 7. CATÁLOGO ACTUAL (10 piezas)

### Línea 01 — Anillos (4 piezas)

| ID | Nombre | Precio base | Inspiración | Tag |
|----|--------|-------------|-------------|-----|
| frj-r01 | Norte | $89 | Dirección · Propósito · Claridad | Más vendido |
| frj-r02 | Sello | $95 | Identidad · Legado · Autoridad | Personalizable |
| frj-r03 | Bloque | $79 | Fuerza · Construcción · Permanencia | — |
| frj-r04 | Corte | $109 | Precisión · Detalle · Excelencia | Ed. limitada |

### Línea 02 — Collares (3 piezas)

| ID | Nombre | Precio base | Inspiración | Tag |
|----|--------|-------------|-------------|-----|
| frj-c01 | Ruta | $110 | Camino · Disciplina · Sobriedad | Más vendido |
| frj-c02 | Eslabón | $125 | Vínculo · Historia · Solidez | — |
| frj-c03 | Vértice | $98 | Enfoque · Convergencia · Sutileza | Nuevo |

### Línea 03 — Pulseras (3 piezas)

| ID | Nombre | Precio base | Inspiración | Tag |
|----|--------|-------------|-------------|-----|
| frj-b01 | Base | $64 | Esencia · Durabilidad · Honestidad | Más vendido |
| frj-b02 | Arco | $95 | Fortaleza · Historia · Estructura | — |
| frj-b03 | Nudo | $72 | Compromiso · Textura · Autenticidad | Nuevo |

---

## 8. MATERIALES Y PRECIOS

```js
const MATERIALS = [
  { id: "steel",  label: "Acero",  modifier: 0,   suffix: "316L" },
  { id: "silver", label: "Plata",  modifier: 40,  suffix: "925"  },
  { id: "gold",   label: "Oro",    modifier: 120, suffix: "18K"  },
];

// Precio final = basePrice + material.modifier
const calcPrice = (base, mat) => base + (MATERIALS.find(m => m.id === mat)?.modifier ?? 0);
```

---

## 9. ESTADO GLOBAL (en `<App/>`)

```js
view          // "catalog" | "detail" | "checkout" | "success"
selected      // producto seleccionado (objeto completo) | null
cart          // array de CartItems
cartOpen      // boolean — panel lateral del carrito
toast         // boolean — notificación "Agregado al carrito"
orderId       // string generado en éxito | null
activeLinea   // "Todos" | "Anillos" | "Collares" | "Pulseras"
nlEmail       // string — email del newsletter
nlSent        // boolean — newsletter enviado
```

**CartItem** (lo que se guarda en `cart`):
```js
{
  ...product,           // todos los campos del producto
  materialId: "steel",  // id del material seleccionado
  materialLabel: "Acero", // label del material
  price: 89,            // precio final calculado
}
```

---

## 10. IMÁGENES ACTUALES (Unsplash)

```
Anillos:
  Norte/Sello/Bloque  → photo-1605100804763  (anillo sobre fondo oscuro)
                      → photo-1603561591411  (anillo signet plata)
                      → photo-1574169208507  (anillo minimalista)
  Corte               → photo-1620656798579  (anillo facetado)

Collares:
  Ruta                → photo-1599643477877  (cadena plata)
  Eslabón             → photo-1611085583191  (cadena gruesa)
  Vértice             → photo-1535632066927  (collar con colgante)

Pulseras:
  Base                → photo-1573408301185  (pulsera eslabón)
  Arco                → photo-1611652022419  (brazalete rígido)
  Nudo                → photo-1624913503273  (pulsera cuerda)

Banners:
  Highlight           → photo-1558618666    (manos con joyas oscuro)
  Craft               → photo-1599643478518 (joyero artesanal)
```

Formato URL: `https://images.unsplash.com/photo-XXXXXXXXXX?w=700&q=85&auto=format&fit=crop`

---

## 11. FUNCIONES CLAVE

```js
fmt(n)           // Formatea precio: fmt(89) → "$89 USD"
calcPrice(b, m)  // Precio final: calcPrice(89, "silver") → 129
genId()          // ID de pedido: "FRJ-XXXXX"
showToast()      // Muestra notificación 1.5s
addToCart(item)  // Agrega al array cart + showToast()
removeFromCart(idx)  // Filtra por índice
scrollCat()      // Scroll suave al catálogo
handleLinea(l)   // Cambia filtro de línea + scroll
handleLogo()     // Vuelve a catalog + reset filtros
handleConfirm()  // Genera orderId + view "success"
reset()          // Resetea todo el estado
```

---

## 12. REFERENCIA DE DISEÑO

El sitio está inspirado estructuralmente en **ellajoyas.cl**:
- Announcement bar arriba
- Nav con logo + teléfono + carrito + barra de categorías
- Hero full height
- Trust strip de 4 columnas
- Catálogo con grid de productos
- Banners editoriales intercalados
- Testimonios
- Newsletter
- Footer con 4 columnas

La página de producto está inspirada en **Brava Joyería**:
- Galería con miniaturas
- Caja "El Concepto" con historia de la pieza
- "Lo que dicen de él" (reviews por producto)
- Selector de material con precio dinámico
- Detalles técnicos
- Bloque de garantías

---

## 13. CONVENCIONES DE CÓDIGO

- **CSS:** Todo en la variable `const css` como template string. Clases cortas y abreviadas (`.pc` = product card, `.di` = detail info, etc.)
- **Componentes:** Funcionales, sin TypeScript, sin PropTypes
- **Sin imports externos:** No hay librerías de UI (no MUI, no shadcn, no Tailwind)
- **Sin imágenes locales:** Todas las imágenes son URLs externas (Unsplash)
- **Sin React Router:** Navegación por estado `view`
- **Sin backend:** Todo es mock — precios, reviews, órdenes son hardcoded o generados en cliente

---

## 14. TAREAS COMUNES Y CÓMO HACERLAS

### Agregar un producto nuevo
1. Agregar objeto al array `PRODUCTS` con todos los campos requeridos
2. Buscar imagen en Unsplash y pegar la URL
3. El catálogo lo muestra automáticamente agrupado por `linea`

### Cambiar un precio
```js
// En el array PRODUCTS, buscar por name y cambiar basePrice
{ name: "Norte", basePrice: 89 }  // cambiar a 99
```

### Agregar una nueva línea
1. Agregar `"NombreLinea"` al array `LINEAS`
2. Agregar productos con `linea: "NombreLinea"`

### Cambiar un color de marca
```js
// En la variable css, buscar en :root y cambiar el token
--gold: #C9A84C;  // cambiar aquí afecta todo el sitio
```

### Agregar un banner nuevo
Agregar JSX directamente en el `return` del catálogo, siguiendo el patrón de `.hl` o `.craft`

### Modificar la página de producto
El componente es `<ProductDetail/>`. La estructura es:
- `<Gallery/>` (izquierda)
- `.di` (derecha): breadcrumb → nombre → tagline → concepto-box → material selector → precio → btn-add → detalles → trust → reviews

---

## 15. PRÓXIMAS MEJORAS SUGERIDAS

- [ ] Agregar selector de talla para anillos
- [ ] Agregar opción de grabado personalizado para "Sello"
- [ ] Integrar WhatsApp CTA en la página de producto
- [ ] Añadir sección "Cómo cuidar tu pieza FORJA"
- [ ] Agregar más imágenes reales por producto (fotos en uso / en mano)
- [ ] Implementar filtro de precio en el catálogo
- [ ] Agregar página "Nuestra historia" con el concepto del joyero
- [ ] Sección de "Piezas personalizadas" con formulario de contacto
- [ ] Animación de entrada en las tarjetas al hacer scroll (IntersectionObserver)
- [ ] Modo oscuro ya implementado — considerar versión clara opcional

---

## 16. VERSIONES DEL ARCHIVO

```
forja-store-v1.jsx   → Primera versión con SVG illustrations, 6 productos mock
forja-store-v2.jsx   → Estructura tipo ellajoyas.cl, imágenes Unsplash
forja-store-v3.jsx   → VERSIÓN ACTUAL: 3 líneas, nombres con concepto,
                       página de producto estilo Brava, 10 piezas
```

**Siempre trabajar sobre `forja-store-v3.jsx` → copiado a `src/App.jsx`**

---

*Documento generado el 20/05/2026. Actualizar cuando cambien productos, precios o estructura.*
