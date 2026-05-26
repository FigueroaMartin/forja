import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── LÍNEAS Y PRODUCTOS ───────────────────────────────────────────────────────
const PRODUCTS = [
  // ── LÍNEA ANILLOS ──
  {
    id:"frj-r01", slug:"norte", linea:"Anillos",
    name:"Norte", basePrice:89,
    tagline:"Sigue tu dirección. Sin excusas.",
    concepto:"Este anillo representa la claridad de quien sabe adónde va. Su geometría limpia y perfil bajo son el reflejo de un hombre que no necesita adornos para demostrar su rumbo. Lo que comunica lo hace con presencia.",
    inspiracion:"Dirección · Propósito · Claridad",
    detalles:["Anillo sello de perfil bajo","Plata 925 · Oro 18K","Acabado cepillado satinado","Ancho 8mm · Espesor 2mm","Ajustable tallas 7–12","Resistente al agua"],
    accent:"#C9A84C", tag:"Más vendido",
    img:"https://plus.unsplash.com/premium_photo-1673285096774-92c7b3e57424?w=700&q=85&auto=format&fit=crop",
    imgs:[
      "https://plus.unsplash.com/premium_photo-1673285096774-92c7b3e57424?w=700&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=700&q=85&auto=format&fit=crop",
    ],
    reviews:[
      {name:"Rodrigo V.", stars:5, text:"Lo uso en cada reunión importante. Tiene algo que da peso a la presencia."},
      {name:"Felipe A.",  stars:5, text:"El acabado es impecable. Plata 925 real, no se mancha ni descolora."},
    ]
  },
  {
    id:"frj-r02", slug:"sello", linea:"Anillos",
    name:"Sello", basePrice:95,
    tagline:"Tu historia grabada en metal.",
    concepto:"Un anillo sello es una declaración ancestral de identidad. Desde los romanos hasta los ejecutivos modernos, quien lleva un sello comunica que tiene algo que defender. Forja lo interpreta con líneas del siglo XXI.",
    inspiracion:"Identidad · Legado · Autoridad",
    detalles:["Anillo sello rectangular plano","Plata 925 · Oro 18K","Superficie grabable a pedido","Ancho 12mm · Espesor 2.5mm","Tallas 7–13","Cepillado mate en cara superior"],
    accent:"#A8A9AD", tag:"Personalizable",
    img:"https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=700&q=85&auto=format&fit=crop",
    imgs:[
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=700&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1689287428894-9b52d1534a25?w=700&q=85&auto=format&fit=crop",
    ],
    reviews:[
      {name:"Matías C.", stars:5, text:"Me lo grabaron con mis iniciales. Quedó perfecto, mejor que lo que esperaba."},
      {name:"Andrés M.", stars:5, text:"Lo mandé a hacer en oro 18K. Vale cada peso."},
    ]
  },
  {
    id:"frj-r03", slug:"bloque", linea:"Anillos",
    name:"Bloque", basePrice:79,
    tagline:"Construido para durar. Como tú.",
    concepto:"Inspirado en la arquitectura brutalista: formas masivas, líneas rectas, sin ornamentos innecesarios. El Bloque es para el hombre que construye cosas reales y quiere una joya que lo represente.",
    inspiracion:"Fuerza · Construcción · Permanencia",
    detalles:["Banda ancha de perfil cuadrado","Plata 925","Acabado pulido espejo","Ancho 10mm · Espesor 3mm","Tallas 8–13","Alto impacto visual"],
    accent:"#C9A84C", tag:null,
    img:"https://images.unsplash.com/photo-1565206077202-14752579e787?w=700&q=85&auto=format&fit=crop",
    imgs:[
      "https://images.unsplash.com/photo-1565206077202-14752579e787?w=700&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1575862469342-61fd7aa6d577?w=700&q=85&auto=format&fit=crop",
    ],
    reviews:[
      {name:"Sebastián R.", stars:5, text:"Lo primero que notan cuando doy la mano. Elegante sin ser ostentoso."},
    ]
  },
  {
    id:"frj-r04", slug:"corte", linea:"Anillos",
    name:"Corte", basePrice:109,
    tagline:"Precisión que se lleva puesta.",
    concepto:"El Corte nace de la obsesión por el detalle. Cada ángulo fue pensado para capturar la luz de manera distinta. Es el anillo del hombre que valora la ingeniería detrás de las cosas.",
    inspiracion:"Precisión · Filo · Rareza",
    detalles:["Anillo facetado de corte geométrico","Oro 18K · Plata 925","Múltiples facetas pulidas","Ancho 8mm variable","Tallas 7–12","Diseño exclusivo FORJA"],
    accent:"#C9A84C", tag:"Ed. limitada",
    img:"https://images.unsplash.com/photo-1565619601015-e57cced38f39?w=700&q=85&auto=format&fit=crop",
    imgs:[
      "https://images.unsplash.com/photo-1565619601015-e57cced38f39?w=700&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620656798579-1984d9e87df7?w=700&q=85&auto=format&fit=crop",
    ],
    reviews:[
      {name:"Cristóbal F.", stars:5, text:"El acabado en oro 18K es brutal. Vale la inversión completamente."},
      {name:"Diego P.", stars:5, text:"Edición limitada y se nota. Una joya con carácter real."},
    ]
  },

  // ── LÍNEA COLLARES ──
  {
    id:"frj-c01", slug:"ruta", linea:"Collares",
    name:"Ruta", basePrice:110,
    tagline:"El camino que elegiste te define.",
    concepto:"Una cadena rolo limpia y directa. Sin pendientes, sin excesos. La Ruta es la joya del hombre que ya llegó a donde quería llegar y lo demuestra con sobriedad. Cincuenta y cinco centímetros de carácter.",
    inspiracion:"Camino · Disciplina · Sobriedad",
    detalles:["Cadena rolo eslabón redondo 3mm","Plata 925 · Oro 18K","Largo 55cm ajustable","Cierre de langosta","Resistente al agua y al sudor","Apto uso diario"],
    accent:"#A8A9AD", tag:"Más vendido",
    img:"https://plus.unsplash.com/premium_photo-1708711288213-1726e476ce74?w=700&q=85&auto=format&fit=crop",
    imgs:[
      "https://plus.unsplash.com/premium_photo-1708711288213-1726e476ce74?w=700&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1679973297332-cb76bf05275c?w=700&q=85&auto=format&fit=crop",
    ],
    reviews:[
      {name:"Ignacio T.", stars:5, text:"La uso con todo. Con polera, con camisa, hasta debajo de la chaqueta. Siempre está."},
      {name:"Tomás V.",   stars:5, text:"Plata 925 real. No se pone negra ni pierde brillo."},
    ]
  },
  {
    id:"frj-c02", slug:"eslabón", linea:"Collares",
    name:"Eslabón", basePrice:125,
    tagline:"Cada vínculo que construyes es tuyo.",
    concepto:"La cadena de eslabón plano es uno de los diseños más masculinos de la historia de la joyería. El Eslabón lo toma y lo simplifica al máximo: anchura justa, grosor honesto, caída perfecta.",
    inspiracion:"Vínculo · Peso · Continuidad",
    detalles:["Cadena eslabón plano tipo curb 5mm","Plata 925 · Oro 18K","Largo 50cm fijo","Cierre de mosquetón","Peso sustancial · Caída perfecta","Diseño unisex con esencia masculina"],
    accent:"#C9A84C", tag:null,
    img:"https://images.unsplash.com/photo-1679973297365-04286fb12e6c?w=700&q=85&auto=format&fit=crop",
    imgs:[
      "https://images.unsplash.com/photo-1679973297365-04286fb12e6c?w=700&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605884878538-6468614df578?w=700&q=85&auto=format&fit=crop",
    ],
    reviews:[
      {name:"Álvaro S.", stars:5, text:"El eslabón tiene un peso perfecto. No es exagerado pero sí lo notas."},
    ]
  },
  {
    id:"frj-c03", slug:"vértice", linea:"Collares",
    name:"Vértice", basePrice:98,
    tagline:"El punto donde todo converge.",
    concepto:"Una cadena fina con un colgante geométrico discreto. El Vértice es para el ejecutivo que quiere una declaración sutil. Visible solo cuando importa. Un punto de enfoque para los que saben mirar.",
    inspiracion:"Enfoque · Convergencia · Sutileza",
    detalles:["Cadena rolo fina 1.5mm + colgante","Colgante hexagonal 8mm","Plata 925","Largo 45cm","Cierre de langosta","Diseño minimalista de autor"],
    accent:"#A8A9AD", tag:"Nuevo",
    img:"https://images.unsplash.com/photo-1680068098869-aa8224f6bd64?w=700&q=85&auto=format&fit=crop",
    imgs:[
      "https://images.unsplash.com/photo-1680068098869-aa8224f6bd64?w=700&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=700&q=85&auto=format&fit=crop",
    ],
    reviews:[
      {name:"Patricio M.", stars:5, text:"El colgante hexagonal es minimalista pero con identidad. Exactamente lo que buscaba."},
    ]
  },

  // ── LÍNEA PULSERAS ──
  {
    id:"frj-b01", slug:"base", linea:"Pulseras",
    name:"Base", basePrice:64,
    tagline:"Lo esencial nunca pasa de moda.",
    concepto:"La pulsera de eslabón es el punto de partida de cualquier colección masculina. La Base no trata de ser más de lo que es: una pieza honesta, duradera, que se lleva solo o se apila. Sin pretensiones. Con carácter.",
    inspiracion:"Fundamento · Origen · Constancia",
    detalles:["Pulsera eslabón plano tipo curb","Plata 925 · Oro 18K","Largo 20cm con cierre caja","Cierre doble seguro","Ancho 5mm","Resistente al agua"],
    accent:"#C9A84C", tag:"Más vendido",
    img:"https://images.unsplash.com/photo-1612450362046-91773458b103?w=700&q=85&auto=format&fit=crop",
    imgs:[
      "https://images.unsplash.com/photo-1612450362046-91773458b103?w=700&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1748017741116-6c53196ba9d0?w=700&q=85&auto=format&fit=crop",
    ],
    reviews:[
      {name:"Gonzalo H.", stars:5, text:"La primera pulsera que uso regularmente. El cierre es sólido, no se abre solo."},
      {name:"Javier L.",  stars:5, text:"La tengo en plata y en oro. Las apilo. Quedó perfecto."},
    ]
  },
  {
    id:"frj-b02", slug:"tensor", linea:"Pulseras",
    name:"Tensor", basePrice:95,
    tagline:"Tensión que se transforma en forma.",
    concepto:"El brazalete rígido lleva milenios en la historia de la joyería masculina. El Tensor lo rediseña con apertura lateral inteligente y tensión estructural visible. Para el hombre que entiende que la fortaleza también tiene una estética.",
    inspiracion:"Tensión · Equilibrio · Fuerza",
    detalles:["Brazalete rígido apertura lateral","Plata 925","Ancho 6mm · Acabado cepillado","Apertura elástica regulable","Diámetro interior 58–62mm","Grabado lineal interior"],
    accent:"#A8A9AD", tag:null,
    img:"https://images.unsplash.com/photo-1681091639096-a7b2eb1d4990?w=700&q=85&auto=format&fit=crop",
    imgs:[
      "https://images.unsplash.com/photo-1681091639096-a7b2eb1d4990?w=700&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1748018384116-41eabe92aae0?w=700&q=85&auto=format&fit=crop",
    ],
    reviews:[
      {name:"Eduardo C.", stars:5, text:"El brazalete tiene un peso y rigidez perfectos. Se siente premium."},
    ]
  },
  {
    id:"frj-b03", slug:"huggie", linea:"Pulseras",
    name:"Huggie", basePrice:72,
    tagline:"Lo que te abraza, te define.",
    concepto:"Un brazalete de perfil circular que rodea la muñeca con precisión. El Huggie cierra mediante un mecanismo articulado que garantiza un ajuste perfecto. Es la pieza que no ves hasta que la sientes, y cuando la sientes, no quieres quitártela.",
    inspiracion:"Abrazo · Cuerpo · Identidad",
    detalles:["Brazalete perfil redondo cierre articulado","Plata 925 · Oro 18K","Sección circular 4mm","Cierre articulado de precisión","Diámetro interior 56–60mm","Acabado pulido espejo"],
    accent:"#C9A84C", tag:"Nuevo",
    img:"https://images.unsplash.com/photo-1708221235889-244b2b9495f3?w=700&q=85&auto=format&fit=crop",
    imgs:[
      "https://images.unsplash.com/photo-1708221235889-244b2b9495f3?w=700&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1624913503273-5f9c4e980dba?w=700&q=85&auto=format&fit=crop",
    ],
    reviews:[
      {name:"Bruno A.", stars:5, text:"Cierre articulado impecable. Se pone y saca sin drama. Parece más caro de lo que es."},
    ]
  },
];

const LINEAS = ["Todos","Anillos","Collares","Pulseras"];

const MATERIALS = [
  { id:"silver", label:"Plata", modifier:0,  suffix:"925" },
  { id:"gold",   label:"Oro",   modifier:80, suffix:"18K" },
];

const PIECE_TYPES = [
  { id:"ring",     icon:"◈", label:"Anillo",      desc:"Sello · Banda · Facetado" },
  { id:"necklace", icon:"⬡", label:"Collar",      desc:"Cadena · Colgante · Mixto" },
  { id:"bracelet", icon:"◇", label:"Pulsera",     desc:"Eslabón · Rígida · Cuerda" },
  { id:"set",      icon:"⬟", label:"Set completo",desc:"Combinación a medida" },
];

const BUDGETS = [
  { id:"b1", label:"$80 – $150 USD" },
  { id:"b2", label:"$150 – $300 USD" },
  { id:"b3", label:"$300 – $600 USD" },
  { id:"b4", label:"Sin límite definido" },
];

const calcPrice = (base, mat) => base + (MATERIALS.find(m=>m.id===mat)?.modifier ?? 0);
const fmt = n => `$${n.toLocaleString("es-CL")} USD`;
const genId = () => `FRJ-${Date.now().toString(36).toUpperCase()}`;

// ─── ANIMATION VARIANTS ───────────────────────────────────────────────────────
const FU = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25,0.46,0.45,0.94] } },
};
const FI = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.5 } },
};
const SC = (delay = 0, sc = 0.1) => ({
  hidden: {},
  show:   { transition: { staggerChildren: sc, delayChildren: delay } },
});

// ─── LOGO ─────────────────────────────────────────────────────────────────────
function Logo({ size=26, color="#C9A84C" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <polygon points="50,4 91,27.5 91,72.5 50,96 9,72.5 9,27.5" stroke={color} strokeWidth="2" fill="none"/>
      <polygon points="50,20 76,35 76,65 50,80 24,65 24,35" stroke={color} strokeWidth="1.2" fill="none" opacity="0.55"/>
      <polygon points="50,33 67,50 50,67 33,50" stroke={color} strokeWidth="1.4" fill="none"/>
      <circle cx="50" cy="50" r="4.5" fill={color}/>
      {[0,1,2,3,4,5].map(i=>{
        const a=(i*Math.PI)/3-Math.PI/6;
        return <circle key={i} cx={50+46*Math.cos(a)} cy={50+46*Math.sin(a)} r="2.2" fill={color} opacity="0.65"/>;
      })}
    </svg>
  );
}

// ─── CSS ──────────────────────────────────────────────────────────────────────
const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@300;400&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --bg:#0a0a0a;--surf:#111;--surf2:#0e0e0e;--brd:#1e1e1e;--brd2:#2a2a2a;
  --txt:#f0ede8;--mut:#666;--mut2:#444;
  --gold:#C9A84C;--silver:#A8A9AD;--white:#fff;
  --serif:'Cormorant Garamond',Georgia,serif;
  --mono:'DM Mono',monospace;
  --ease:cubic-bezier(.25,.46,.45,.94);
  --eout:cubic-bezier(0,.55,.45,1);
}
body{background:var(--bg);color:var(--txt);font-family:var(--mono);-webkit-font-smoothing:antialiased;}
img{display:block;max-width:100%;}
button{cursor:pointer;font-family:var(--mono);}

/* ANN BAR */
.ann{background:var(--gold);color:#000;text-align:center;padding:.5rem 1rem;font-size:.6rem;letter-spacing:.2em;text-transform:uppercase;}

/* NAV */
.nav{position:sticky;top:0;z-index:100;background:rgba(10,10,10,.96);backdrop-filter:blur(16px);border-bottom:.5px solid var(--brd);}
.nav-top{display:flex;align-items:center;justify-content:space-between;padding:.9rem 2.5rem;}
.nav-logo{display:flex;align-items:center;gap:.7rem;cursor:pointer;}
.nav-wm{font-family:var(--serif);font-size:1.35rem;font-weight:300;letter-spacing:.22em;color:var(--white);}
.nav-right{display:flex;align-items:center;gap:1.5rem;}
.nav-ph{font-size:.58rem;color:var(--mut);letter-spacing:.1em;text-decoration:none;transition:color .2s;}
.nav-ph:hover{color:var(--gold);}
.nav-cart{display:flex;align-items:center;gap:.5rem;background:none;border:none;color:var(--mut);font-size:.65rem;letter-spacing:.1em;text-transform:uppercase;transition:color .2s;}
.nav-cart:hover{color:var(--gold);}
.nav-bbl{display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;border-radius:50%;background:var(--gold);color:#000;font-size:.58rem;font-weight:700;}
.nav-lineas{display:flex;align-items:center;border-top:.5px solid var(--brd);overflow-x:auto;padding:0 2.5rem;scrollbar-width:none;}
.nav-lineas::-webkit-scrollbar{display:none;}
.nav-lb{background:none;border:none;color:var(--mut);font-size:.6rem;letter-spacing:.14em;text-transform:uppercase;padding:.75rem 1.1rem;white-space:nowrap;transition:color .2s;border-bottom:1.5px solid transparent;margin-bottom:-1px;}
.nav-lb:hover{color:var(--white);}
.nav-lb.on{color:var(--gold);border-bottom-color:var(--gold);}

/* HERO */
.hero{position:relative;height:90vh;min-height:560px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;overflow:hidden;}
.hero-bg{position:absolute;inset:0;background:radial-gradient(ellipse 70% 60% at 50% 100%,rgba(201,168,76,.07) 0%,transparent 65%);}
.hero-grid{position:absolute;inset:0;pointer-events:none;}
.hero-c{position:relative;z-index:1;padding:2rem;}
.hero-eye{font-size:.58rem;letter-spacing:.3em;color:var(--gold);text-transform:uppercase;margin-bottom:1.5rem;}
.hero-h1{font-family:var(--serif);font-weight:300;line-height:1.02;letter-spacing:.05em;font-size:clamp(3rem,8vw,6rem);color:var(--white);}
.hero-h1 em{font-style:italic;color:var(--gold);}
.hero-sub{margin-top:1.25rem;font-size:.7rem;color:var(--mut);letter-spacing:.1em;line-height:1.9;max-width:400px;margin-left:auto;margin-right:auto;}
.hero-ctas{display:flex;align-items:center;gap:1rem;margin-top:2.5rem;justify-content:center;flex-wrap:wrap;}
.btn-p{padding:.85rem 2rem;background:var(--gold);color:#000;font-family:var(--mono);font-size:.65rem;letter-spacing:.16em;text-transform:uppercase;border:none;transition:opacity .2s,transform .15s;}
.btn-p:hover{opacity:.88;transform:translateY(-1px);}
.btn-s{padding:.85rem 2rem;background:transparent;color:var(--mut);font-family:var(--mono);font-size:.65rem;letter-spacing:.16em;text-transform:uppercase;border:.5px solid var(--brd2);transition:color .2s,border-color .2s;}
.btn-s:hover{color:var(--white);border-color:var(--white);}
.hero-scr{position:absolute;bottom:2.5rem;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:.5rem;}
.hero-scr-l{width:.5px;height:40px;background:var(--brd2);animation:sl 2s infinite;}
@keyframes sl{0%{transform:scaleY(0);transform-origin:top;}50%{transform:scaleY(1);transform-origin:top;}51%{transform-origin:bottom;}100%{transform:scaleY(0);transform-origin:bottom;}}
.hero-scr-t{font-size:.5rem;color:var(--mut2);letter-spacing:.14em;text-transform:uppercase;}

/* TRUST */
.trust{display:grid;grid-template-columns:repeat(4,1fr);border-bottom:.5px solid var(--brd);}
@media(max-width:640px){.trust{grid-template-columns:repeat(2,1fr);}}
.trust-i{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:1.8rem 1rem;gap:.5rem;border-right:.5px solid var(--brd);text-align:center;}
.trust-i:last-child{border-right:none;}
.ti-ic{font-size:1rem;color:var(--gold);}
.ti-t{font-size:.62rem;letter-spacing:.12em;color:var(--white);text-transform:uppercase;}
.ti-s{font-size:.58rem;color:var(--mut);letter-spacing:.08em;}

/* SECTION */
.sec{padding:4rem 2.5rem;}
.sec-hdr{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:2.5rem;flex-wrap:wrap;gap:.5rem;}
.sec-t{font-family:var(--serif);font-size:1.8rem;font-weight:300;color:var(--white);}
.sec-lbl{font-size:.58rem;letter-spacing:.22em;color:var(--mut);text-transform:uppercase;margin-bottom:.3rem;}
.sec-lnk{font-size:.6rem;letter-spacing:.1em;color:var(--mut);text-transform:uppercase;text-decoration:none;transition:color .2s;cursor:pointer;background:none;border:none;}
.sec-lnk:hover{color:var(--gold);}
.sec-div{height:.5px;background:var(--brd);margin:0 2.5rem;}

/* LINEA HEADERS */
.linea-hdr{display:flex;align-items:center;gap:1.5rem;padding:2rem 2.5rem 1.5rem;border-top:.5px solid var(--brd);}
.linea-hdr:first-child{border-top:none;}
.linea-num{font-size:.55rem;letter-spacing:.2em;color:var(--gold);text-transform:uppercase;}
.linea-title{font-family:var(--serif);font-size:2rem;font-weight:300;color:var(--white);}
.linea-desc{font-size:.62rem;color:var(--mut);letter-spacing:.06em;margin-left:auto;}

/* PRODUCT GRID */
.pgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1px;background:var(--brd);margin:0 2.5rem;}
.pc{background:var(--surf);cursor:pointer;display:flex;flex-direction:column;position:relative;overflow:hidden;transition:background .25s;}
.pc:hover{background:#141414;}
.pc-iw{position:relative;overflow:hidden;aspect-ratio:1;background:var(--surf2);}
.pc-img{width:100%;height:100%;object-fit:cover;transition:transform .6s var(--ease),filter .5s;filter:brightness(.82);}
.pc:hover .pc-img{transform:scale(1.06);filter:brightness(.55);}
.pc-iw::after{content:'';position:absolute;inset:0;background:linear-gradient(to top,rgba(10,10,10,.8) 0%,rgba(10,10,10,0) 55%);opacity:0;transition:opacity .45s var(--ease);pointer-events:none;z-index:1;}
.pc:hover .pc-iw::after{opacity:1;}
.pc-tag{position:absolute;top:1rem;left:1rem;font-size:.52rem;letter-spacing:.12em;text-transform:uppercase;background:var(--gold);color:#000;padding:.25rem .6rem;z-index:2;}
.pc-w{position:absolute;top:1rem;right:1rem;background:rgba(10,10,10,.7);width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-size:.9rem;opacity:0;transition:opacity .2s;border:none;color:var(--mut);z-index:2;}
.pc:hover .pc-w{opacity:1;}
.pc-b{padding:1.25rem 1.5rem 1.75rem;display:flex;flex-direction:column;gap:.5rem;flex:1;}
.pc-linea{font-size:.5rem;letter-spacing:.18em;color:var(--mut);text-transform:uppercase;}
.pc-name{font-family:var(--serif);font-size:1.6rem;font-weight:300;color:var(--white);line-height:1.05;}
.pc-tgl{font-size:.6rem;color:var(--mut);line-height:1.7;font-style:italic;flex:1;}
.pc-ft{display:flex;align-items:center;justify-content:space-between;margin-top:.5rem;}
.pc-price{font-size:.72rem;color:var(--gold);letter-spacing:.04em;}
.pc-cta{font-size:.58rem;color:var(--mut2);letter-spacing:.1em;text-transform:uppercase;transition:color .2s;}
.pc:hover .pc-cta{color:var(--silver);}
.pc-line{position:absolute;bottom:0;left:0;height:1.5px;width:0;background:linear-gradient(to right,var(--gold),transparent);transition:width .5s var(--ease);}
.pc:hover .pc-line{width:100%;}

/* HIGHLIGHT */
.hl{display:grid;grid-template-columns:1fr 1fr;min-height:480px;}
@media(max-width:700px){.hl{grid-template-columns:1fr;}}
.hl-iw{overflow:hidden;}
.hl-iw img{width:100%;height:100%;object-fit:cover;filter:brightness(.6);transition:transform .7s var(--ease);}
.hl:hover .hl-iw img{transform:scale(1.04);}
.hl-c{background:var(--surf);display:flex;flex-direction:column;justify-content:center;padding:3.5rem;gap:1.5rem;}
.hl-eye{font-size:.58rem;letter-spacing:.22em;color:var(--gold);text-transform:uppercase;}
.hl-t{font-family:var(--serif);font-size:2.4rem;font-weight:300;color:var(--white);line-height:1.1;}
.hl-d{font-size:.68rem;color:var(--mut);line-height:1.9;}
.hl-list{display:flex;flex-direction:column;gap:.5rem;}
.hl-li{display:flex;align-items:center;gap:.6rem;font-size:.62rem;color:var(--mut);}
.hl-li::before{content:'';width:4px;height:4px;background:var(--gold);flex-shrink:0;}

/* CRAFT */
.craft{display:grid;grid-template-columns:1fr 1fr;}
@media(max-width:700px){.craft{grid-template-columns:1fr;}}
.craft-c{background:var(--surf2);padding:4rem 3.5rem;display:flex;flex-direction:column;gap:1.5rem;justify-content:center;}
.craft-lbl{font-size:.55rem;letter-spacing:.24em;color:var(--gold);text-transform:uppercase;}
.craft-t{font-family:var(--serif);font-size:2.2rem;font-weight:300;color:var(--white);line-height:1.1;}
.craft-d{font-size:.67rem;color:var(--mut);line-height:1.9;}
.craft-q{border-left:1.5px solid var(--gold);padding-left:1.25rem;font-family:var(--serif);font-size:1.1rem;font-style:italic;color:var(--silver);line-height:1.5;}
.craft-iw{overflow:hidden;}
.craft-iw img{width:100%;height:100%;object-fit:cover;filter:brightness(.7);transition:transform .7s var(--ease);}
.craft:hover .craft-iw img{transform:scale(1.03);}

/* TESTIMONIOS */
.tgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:1px;background:var(--brd);}
.tc{background:var(--surf);padding:2rem;display:flex;flex-direction:column;gap:1rem;transition:background .25s;}
.tc:hover{background:#141414;}
.tc-stars{color:var(--gold);font-size:.85rem;letter-spacing:.1em;}
.tc-txt{font-size:.68rem;color:var(--mut);line-height:1.9;font-style:italic;flex:1;}
.tc-name{font-size:.6rem;color:var(--silver);letter-spacing:.1em;text-transform:uppercase;}

/* NEWSLETTER */
.nl{background:var(--surf);padding:4rem 2.5rem;text-align:center;border-top:.5px solid var(--brd);border-bottom:.5px solid var(--brd);}
.nl-t{font-family:var(--serif);font-size:2rem;font-weight:300;color:var(--white);margin-bottom:.5rem;}
.nl-s{font-size:.65rem;color:var(--mut);letter-spacing:.1em;margin-bottom:2rem;}
.nl-form{display:flex;max-width:420px;margin:0 auto;}
.nl-inp{flex:1;background:var(--bg);border:.5px solid var(--brd2);color:var(--white);font-family:var(--mono);font-size:.68rem;padding:.8rem 1rem;outline:none;border-right:none;transition:border-color .2s;}
.nl-inp:focus{border-color:var(--gold);}
.nl-inp::placeholder{color:var(--mut2);}
.nl-btn{padding:.8rem 1.25rem;background:var(--gold);color:#000;font-family:var(--mono);font-size:.62rem;letter-spacing:.12em;text-transform:uppercase;border:none;transition:opacity .2s;}
.nl-btn:hover{opacity:.88;}

/* FOOTER */
.ftr{padding:3.5rem 2.5rem 2rem;border-top:.5px solid var(--brd);}
.ftr-top{display:grid;grid-template-columns:1.4fr 1fr 1fr 1fr;gap:3rem;margin-bottom:3rem;}
@media(max-width:760px){.ftr-top{grid-template-columns:1fr 1fr;gap:2rem;}}
@media(max-width:440px){.ftr-top{grid-template-columns:1fr;}}
.ftr-brand{display:flex;flex-direction:column;gap:1rem;}
.ftr-tgl{font-size:.62rem;color:var(--mut);line-height:1.8;letter-spacing:.06em;}
.ftr-ct{font-size:.58rem;letter-spacing:.22em;color:var(--white);text-transform:uppercase;margin-bottom:.75rem;}
.ftr-cl{display:flex;flex-direction:column;gap:.5rem;}
.ftr-lk{font-size:.6rem;color:var(--mut);letter-spacing:.06em;text-decoration:none;transition:color .2s;cursor:pointer;}
.ftr-lk:hover{color:var(--gold);}
.ftr-bot{display:flex;align-items:center;justify-content:space-between;border-top:.5px solid var(--brd);padding-top:1.5rem;flex-wrap:wrap;gap:.75rem;}
.ftr-cp{font-size:.55rem;color:var(--mut2);letter-spacing:.1em;}
.ftr-pay{display:flex;gap:.5rem;align-items:center;}
.pay-b{font-size:.48rem;letter-spacing:.06em;color:var(--mut2);border:.5px solid var(--brd2);padding:.25rem .5rem;}

/* DETAIL */
.detail{max-width:1100px;margin:0 auto;padding:0 2.5rem 5rem;}
.detail-back{display:inline-flex;align-items:center;gap:.5rem;font-size:.6rem;letter-spacing:.12em;color:var(--mut);text-transform:uppercase;background:none;border:none;padding:2rem 0;transition:color .2s;}
.detail-back:hover{color:var(--white);}
.detail-layout{display:grid;grid-template-columns:1fr 1fr;gap:0;align-items:start;}
@media(max-width:720px){.detail-layout{grid-template-columns:1fr;}}

/* GALLERY */
.gal{display:flex;flex-direction:column;gap:0;position:sticky;top:4rem;}
.gal-main{aspect-ratio:1;overflow:hidden;border:.5px solid var(--brd);position:relative;}
.gal-main img{width:100%;height:100%;object-fit:cover;filter:brightness(.85);}
.gal-thumbs{display:flex;gap:1px;background:var(--brd);margin-top:1px;}
.gal-th{flex:1;aspect-ratio:1;overflow:hidden;cursor:pointer;opacity:.45;transition:opacity .2s;border:none;background:none;padding:0;}
.gal-th.on,.gal-th:hover{opacity:1;}
.gal-th img{width:100%;height:100%;object-fit:cover;filter:brightness(.8);}

/* DETAIL INFO */
.di{padding:2.5rem;display:flex;flex-direction:column;gap:1.75rem;background:var(--surf2);}
.di-brd{display:flex;align-items:center;gap:.5rem;font-size:.55rem;color:var(--mut2);letter-spacing:.08em;}
.di-linea{font-size:.55rem;letter-spacing:.22em;color:var(--gold);text-transform:uppercase;}
.di-name{font-family:var(--serif);font-size:3rem;font-weight:300;color:var(--white);line-height:.95;margin-top:.2rem;}
.di-tgl{font-family:var(--serif);font-size:1.1rem;font-style:italic;color:var(--silver);line-height:1.4;}
.di-div{height:.5px;background:var(--brd);}
.concepto-box{background:var(--surf);border:.5px solid var(--brd);padding:1.5rem;}
.cb-title{font-size:.55rem;letter-spacing:.2em;color:var(--gold);text-transform:uppercase;margin-bottom:.75rem;}
.cb-txt{font-size:.68rem;color:var(--mut);line-height:1.9;}
.cb-ins{display:flex;align-items:center;gap:.5rem;margin-top:.75rem;font-size:.58rem;color:var(--mut2);letter-spacing:.06em;}
.cb-ins::before{content:'';width:20px;height:.5px;background:var(--gold);}
.opt-lbl{font-size:.55rem;letter-spacing:.18em;color:var(--mut);text-transform:uppercase;margin-bottom:.8rem;}
.opt-grp{display:flex;flex-wrap:wrap;gap:.5rem;}
.opt-btn{padding:.55rem 1rem;border:.5px solid var(--brd2);background:transparent;color:var(--mut);font-family:var(--mono);font-size:.6rem;letter-spacing:.08em;transition:all .2s;}
.opt-btn:hover{border-color:var(--silver);color:var(--white);}
.opt-btn.on{border-color:var(--gold);color:var(--gold);background:rgba(201,168,76,.05);}
.price-from{font-size:.6rem;color:var(--mut);letter-spacing:.08em;margin-bottom:.25rem;}
.price-main{font-family:var(--serif);font-size:2.8rem;font-weight:300;color:var(--white);}
.price-bd{font-size:.58rem;color:var(--mut2);letter-spacing:.06em;margin-top:.3rem;}
.price-ship{font-size:.6rem;color:var(--mut);margin-top:.5rem;}
.btn-add{width:100%;padding:1.1rem;background:var(--gold);color:#000;font-family:var(--mono);font-size:.68rem;letter-spacing:.16em;text-transform:uppercase;border:none;transition:opacity .2s,transform .15s;}
.btn-add:hover{opacity:.88;transform:translateY(-1px);}
.det-list{display:flex;flex-direction:column;gap:.6rem;}
.det-row{display:flex;align-items:center;gap:.75rem;font-size:.62rem;color:var(--mut);}
.det-row::before{content:'';width:4px;height:4px;border:1px solid var(--gold);flex-shrink:0;}
.dtrust{display:flex;flex-direction:column;gap:.6rem;border:.5px solid var(--brd);padding:1.25rem;}
.dtr{display:flex;align-items:center;gap:.75rem;font-size:.6rem;color:var(--mut);}
.dtr-ic{color:var(--gold);}
.d-rev-title{font-family:var(--serif);font-size:1.4rem;font-weight:300;color:var(--white);}
.d-rev-grid{display:flex;flex-direction:column;gap:1rem;}
.d-rev{background:var(--surf);border:.5px solid var(--brd);padding:1.25rem;display:flex;flex-direction:column;gap:.5rem;}
.d-rev-stars{color:var(--gold);font-size:.8rem;}
.d-rev-txt{font-size:.65rem;color:var(--mut);line-height:1.85;font-style:italic;}
.d-rev-name{font-size:.55rem;color:var(--silver);letter-spacing:.1em;text-transform:uppercase;}

/* CART */
.overlay{position:fixed;inset:0;background:rgba(0,0,0,.65);z-index:199;}
.cart-panel{position:fixed;top:0;right:0;bottom:0;width:min(440px,100vw);background:var(--surf);border-left:.5px solid var(--brd);z-index:200;display:flex;flex-direction:column;}
.cart-hdr{display:flex;align-items:center;justify-content:space-between;padding:1.5rem 2rem;border-bottom:.5px solid var(--brd);}
.cart-ttl{font-family:var(--serif);font-size:1.4rem;font-weight:300;color:var(--white);}
.cart-cls{background:none;border:none;color:var(--mut);font-size:1rem;transition:color .2s;padding:.25rem;}
.cart-cls:hover{color:var(--white);}
.cart-items{flex:1;overflow-y:auto;padding:1.5rem 2rem;display:flex;flex-direction:column;gap:1.5rem;}
.cart-empty{text-align:center;color:var(--mut);font-size:.65rem;letter-spacing:.1em;padding-top:3rem;line-height:2;}
.cart-item{display:flex;gap:1rem;align-items:flex-start;}
.ci-img{width:60px;height:60px;object-fit:cover;flex-shrink:0;border:.5px solid var(--brd);filter:brightness(.85);}
.ci-info{flex:1;min-width:0;}
.ci-name{font-family:var(--serif);font-size:1.05rem;color:var(--white);}
.ci-opts{font-size:.56rem;color:var(--mut);letter-spacing:.08em;margin-top:.2rem;text-transform:uppercase;}
.ci-price{font-size:.7rem;color:var(--gold);margin-top:.4rem;}
.ci-rm{background:none;border:none;color:var(--mut2);transition:color .2s;padding:.25rem;font-size:.75rem;}
.ci-rm:hover{color:#e55;}
.cart-ftr{padding:1.5rem 2rem;border-top:.5px solid var(--brd);display:flex;flex-direction:column;gap:1.25rem;}
.cart-cnt{font-size:.55rem;color:var(--mut2);letter-spacing:.12em;}
.cart-tot{display:flex;justify-content:space-between;align-items:baseline;}
.cart-tot-l{font-size:.6rem;letter-spacing:.16em;color:var(--mut);text-transform:uppercase;}
.cart-tot-v{font-family:var(--serif);font-size:1.6rem;color:var(--white);}
.btn-chk{width:100%;padding:1rem;background:transparent;color:var(--white);font-family:var(--mono);font-size:.65rem;letter-spacing:.14em;text-transform:uppercase;border:.5px solid var(--brd2);transition:background .25s,color .25s,border-color .25s;}
.btn-chk:hover{background:var(--white);color:#000;border-color:var(--white);}

/* CHECKOUT */
.checkout{max-width:580px;margin:0 auto;padding:4rem 2.5rem;}
.co-t{font-family:var(--serif);font-size:2.2rem;font-weight:300;color:var(--white);margin-bottom:.25rem;}
.co-s{font-size:.6rem;color:var(--mut);letter-spacing:.1em;margin-bottom:2.5rem;}
.co-sum{background:var(--surf);border:.5px solid var(--brd);padding:1.5rem;margin-bottom:2.5rem;display:flex;flex-direction:column;gap:.8rem;}
.co-sum-h{font-size:.56rem;letter-spacing:.2em;color:var(--mut);text-transform:uppercase;margin-bottom:.25rem;}
.co-row{display:flex;justify-content:space-between;font-size:.63rem;color:var(--mut);}
.co-row.tot{color:var(--white);border-top:.5px solid var(--brd);padding-top:.8rem;margin-top:.1rem;font-size:.76rem;}
.co-row.tot .v{color:var(--gold);}
.fs{margin-bottom:2rem;}
.fs-h{font-size:.55rem;letter-spacing:.2em;color:var(--mut);text-transform:uppercase;padding-bottom:.7rem;border-bottom:.5px solid var(--brd);margin-bottom:1rem;}
.field{display:flex;flex-direction:column;gap:.4rem;margin-bottom:.8rem;}
.field label{font-size:.56rem;letter-spacing:.14em;color:var(--mut);text-transform:uppercase;}
.field input{background:var(--surf);border:.5px solid var(--brd);color:var(--white);font-family:var(--mono);font-size:.7rem;padding:.75rem 1rem;outline:none;transition:border-color .2s;-webkit-appearance:none;}
.field input:focus{border-color:var(--gold);}
.field input::placeholder{color:var(--mut2);}
.field-row{display:grid;grid-template-columns:1fr 1fr;gap:1rem;}
.btn-cfm{width:100%;padding:1.1rem;margin-top:.5rem;background:var(--gold);color:#000;font-family:var(--mono);font-size:.68rem;letter-spacing:.16em;text-transform:uppercase;border:none;transition:opacity .2s;}
.btn-cfm:hover:not(:disabled){opacity:.88;}
.btn-cfm:disabled{opacity:.35;cursor:not-allowed;}

/* SUCCESS */
.suc{max-width:500px;margin:5rem auto;padding:3rem 2.5rem;text-align:center;}
.suc-t{font-family:var(--serif);font-size:2.4rem;font-weight:300;color:var(--white);margin-bottom:.4rem;}
.suc-id{font-size:.58rem;letter-spacing:.14em;color:var(--gold);margin-bottom:1.5rem;}
.suc-s{font-size:.67rem;color:var(--mut);line-height:1.9;margin-bottom:2.5rem;}
.suc-meta{display:flex;flex-direction:column;margin-bottom:2.5rem;}
.suc-row{display:flex;justify-content:space-between;font-size:.6rem;color:var(--mut2);padding:.65rem 0;border-bottom:.5px solid var(--brd);}
.suc-row span:last-child{color:var(--silver);}
.btn-gh{padding:.8rem 2rem;border:.5px solid var(--brd2);background:transparent;color:var(--mut);font-family:var(--mono);font-size:.62rem;letter-spacing:.14em;text-transform:uppercase;transition:all .2s;}
.btn-gh:hover{border-color:var(--white);color:var(--white);}

/* TOAST */
.toast{position:fixed;bottom:2.5rem;left:50%;transform:translateX(-50%);background:var(--gold);color:#000;padding:.75rem 1.75rem;font-family:var(--mono);font-size:.6rem;letter-spacing:.14em;text-transform:uppercase;z-index:400;white-space:nowrap;}

/* NAV QUOTE BUTTON */
.nav-quote{padding:.42rem 1rem;background:transparent;border:.5px solid var(--gold);color:var(--gold);font-family:var(--mono);font-size:.58rem;letter-spacing:.14em;text-transform:uppercase;transition:all .22s;}
.nav-quote:hover{background:var(--gold);color:#000;}

/* PACKAGING */
.pkg{display:grid;grid-template-columns:1fr 1.15fr;border-top:.5px solid var(--brd);}
@media(max-width:700px){.pkg{grid-template-columns:1fr;}}
.pkg-c{background:var(--surf2);padding:2.5rem 2.8rem;display:flex;flex-direction:column;gap:1rem;justify-content:center;position:relative;overflow:hidden;}
.pkg-c::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 90% 60% at 0% 110%,rgba(201,168,76,.055) 0%,transparent 60%);pointer-events:none;}
.pkg-lbl{font-size:.48rem;letter-spacing:.28em;color:var(--gold);text-transform:uppercase;}
.pkg-t{font-family:var(--serif);font-size:clamp(1.6rem,3vw,2.1rem);font-weight:300;color:var(--white);line-height:1.05;}
.pkg-t em{font-style:italic;color:var(--gold);}
.pkg-tag{font-family:var(--serif);font-size:.88rem;font-style:italic;color:var(--silver);line-height:1.5;opacity:.8;}
.pkg-d{font-size:.64rem;color:var(--mut);line-height:1.85;}
.pkg-list{display:flex;flex-direction:column;gap:.4rem;}
.pkg-li{display:flex;align-items:center;gap:.6rem;font-size:.58rem;color:var(--mut);}
.pkg-li::before{content:'';width:3px;height:3px;background:var(--gold);flex-shrink:0;}
.pkg-q{border-left:1.5px solid var(--gold);padding-left:1rem;font-family:var(--serif);font-size:.88rem;font-style:italic;color:var(--silver);line-height:1.5;opacity:.7;}
.pkg-iw{overflow:hidden;position:relative;background:var(--bg);display:flex;align-items:center;justify-content:center;}
.pkg-iw img{width:100%;height:100%;object-fit:contain;transition:transform .85s var(--ease);}
.pkg:hover .pkg-iw img{transform:scale(1.03);}

/* STORY VIEW */
.story{max-width:860px;margin:0 auto;padding:3.5rem 2.5rem 6rem;}
.story-hero{text-align:center;padding:2rem 0 3.5rem;}
.story-eye{font-size:.52rem;letter-spacing:.32em;color:var(--gold);text-transform:uppercase;margin-bottom:1.5rem;}
.story-h1{font-family:var(--serif);font-size:clamp(3rem,7vw,5rem);font-weight:300;color:var(--white);line-height:1.0;margin-bottom:1.5rem;}
.story-h1 em{font-style:italic;color:var(--gold);}
.story-intro{font-size:.7rem;color:var(--mut);line-height:2.1;max-width:560px;margin:0 auto;}
.story-chapter{display:grid;grid-template-columns:52px 1fr;gap:0 2rem;padding:3rem 0;border-top:.5px solid var(--brd);}
.story-num{font-size:.5rem;letter-spacing:.2em;color:var(--gold);text-transform:uppercase;padding-top:.2rem;font-family:var(--mono);}
.story-ch-lbl{font-size:.5rem;letter-spacing:.24em;color:var(--gold);text-transform:uppercase;margin-bottom:.75rem;}
.story-ch-t{font-family:var(--serif);font-size:clamp(1.8rem,4vw,2.6rem);font-weight:300;color:var(--white);line-height:1.05;margin-bottom:1.25rem;}
.story-ch-t em{font-style:italic;color:var(--gold);}
.story-ch-d{font-size:.7rem;color:var(--mut);line-height:2;margin-bottom:1rem;}
.story-ch-q{border-left:1.5px solid var(--gold);padding-left:1.25rem;font-family:var(--serif);font-size:1.1rem;font-style:italic;color:var(--silver);line-height:1.55;margin-top:.5rem;}
.story-closing{text-align:center;padding:4rem 0 1rem;border-top:.5px solid var(--brd);}
.story-closing-t{font-family:var(--serif);font-size:clamp(1.8rem,4vw,2.8rem);font-weight:300;color:var(--white);margin-bottom:1rem;}
.story-closing-t em{font-style:italic;color:var(--gold);}
.story-closing-d{font-size:.7rem;color:var(--mut);line-height:2;max-width:520px;margin:0 auto 2rem;}

/* QUOTE SECTION — catalog teaser */
.qsec{position:relative;padding:5.5rem 2.5rem;overflow:hidden;border-top:.5px solid var(--brd);border-bottom:.5px solid var(--brd);}
.qsec-bg{position:absolute;inset:0;background:radial-gradient(ellipse 100% 70% at 50% 100%,rgba(201,168,76,.06) 0%,transparent 65%),radial-gradient(ellipse 50% 40% at 15% 0%,rgba(168,169,173,.03) 0%,transparent 55%);}
.qsec-inner{position:relative;z-index:1;text-align:center;}
.qsec-lbl{font-size:.52rem;letter-spacing:.32em;color:var(--gold);text-transform:uppercase;margin-bottom:1.2rem;}
.qsec-t{font-family:var(--serif);font-size:clamp(2.8rem,6vw,4.5rem);font-weight:300;color:var(--white);line-height:1.02;margin-bottom:1.25rem;}
.qsec-t em{font-style:italic;color:var(--gold);}
.qsec-body{font-size:.7rem;color:var(--mut);line-height:2.1;letter-spacing:.04em;max-width:580px;margin:0 auto 1.25rem;}
.qsec-q{font-family:var(--serif);font-size:1.08rem;font-style:italic;color:var(--silver);opacity:.65;margin-bottom:2.5rem;line-height:1.65;}
.qsec-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--brd);margin:2.5rem 0 3rem;text-align:left;}
@media(max-width:700px){.qsec-steps{grid-template-columns:repeat(2,1fr);}}
.qss{background:var(--surf);padding:1.5rem 1.25rem;}
.qss-n{font-size:.48rem;letter-spacing:.22em;color:var(--gold);text-transform:uppercase;margin-bottom:.55rem;}
.qss-ic{font-size:1.05rem;margin-bottom:.45rem;opacity:.65;}
.qss-t{font-family:var(--serif);font-size:1.15rem;color:var(--white);margin-bottom:.3rem;}
.qss-d{font-size:.58rem;color:var(--mut);line-height:1.75;}

/* QUOTE FORM VIEW */
.qf{max-width:720px;margin:0 auto;padding:3.5rem 2.5rem 5rem;}
.qf-hdr{margin-bottom:2rem;}
.qf-lbl{font-size:.52rem;letter-spacing:.28em;color:var(--gold);text-transform:uppercase;margin-bottom:.55rem;}
.qf-t{font-family:var(--serif);font-size:clamp(2.2rem,4vw,3.2rem);font-weight:300;color:var(--white);line-height:1.02;margin-bottom:.75rem;}
.qf-sub{font-size:.65rem;color:var(--mut);line-height:1.9;max-width:520px;}
.qf-div{height:.5px;background:var(--brd);margin:2rem 0;}
.qf-sh{font-size:.52rem;letter-spacing:.2em;color:var(--mut);text-transform:uppercase;margin-bottom:.9rem;}
.qf-tiles{display:grid;grid-template-columns:repeat(auto-fill,minmax(148px,1fr));gap:1px;background:var(--brd);margin-bottom:1.5rem;}
.qf-tile{background:var(--surf);padding:1.25rem 1rem;cursor:pointer;border:1.5px solid transparent;transition:all .22s;display:flex;flex-direction:column;gap:.4rem;}
.qf-tile:hover{background:#141414;}
.qf-tile.on{border-color:var(--gold);background:rgba(201,168,76,.04);}
.qf-tile-ic{font-size:1.05rem;opacity:.65;}
.qf-tile-t{font-family:var(--serif);font-size:1rem;color:var(--white);}
.qf-tile-d{font-size:.54rem;color:var(--mut);letter-spacing:.04em;}
.qf-textarea{width:100%;background:var(--surf);border:.5px solid var(--brd);color:var(--white);font-family:var(--mono);font-size:.67rem;padding:1rem 1.1rem;outline:none;resize:vertical;min-height:110px;transition:border-color .2s;line-height:1.9;-webkit-appearance:none;}
.qf-textarea:focus{border-color:var(--gold);}
.qf-textarea::placeholder{color:var(--mut2);}
.qf-inp{width:100%;background:var(--surf);border:.5px solid var(--brd);color:var(--white);font-family:var(--mono);font-size:.68rem;padding:.75rem 1rem;outline:none;transition:border-color .2s;-webkit-appearance:none;}
.qf-inp:focus{border-color:var(--gold);}
.qf-inp::placeholder{color:var(--mut2);}
.qf-flbl{font-size:.54rem;letter-spacing:.14em;color:var(--mut);text-transform:uppercase;margin-bottom:.35rem;display:block;}
.qf-budget{display:flex;flex-wrap:wrap;gap:.5rem;}
.qf-bud{padding:.55rem 1.1rem;border:.5px solid var(--brd2);background:transparent;color:var(--mut);font-family:var(--mono);font-size:.6rem;letter-spacing:.06em;transition:all .22s;cursor:pointer;}
.qf-bud:hover{border-color:var(--silver);color:var(--white);}
.qf-bud.on{border-color:var(--gold);color:var(--gold);background:rgba(201,168,76,.05);}
.btn-qsend{width:100%;padding:1.1rem;background:var(--gold);color:#000;font-family:var(--mono);font-size:.68rem;letter-spacing:.16em;text-transform:uppercase;border:none;transition:opacity .2s,transform .15s;margin-top:.5rem;}
.btn-qsend:hover:not(:disabled){opacity:.88;transform:translateY(-1px);}
.btn-qsend:disabled{opacity:.35;cursor:not-allowed;}
.qf-sent{text-align:center;padding:4rem 1rem;}
.qf-sent-t{font-family:var(--serif);font-size:2.5rem;font-weight:300;color:var(--white);margin-bottom:.5rem;}
.qf-sent-sub{font-size:.65rem;color:var(--mut);letter-spacing:.06em;line-height:2.2;margin-bottom:2rem;}

::-webkit-scrollbar{width:4px;}
::-webkit-scrollbar-track{background:var(--bg);}
::-webkit-scrollbar-thumb{background:var(--brd2);}

/* ── SIZE GUIDE ACCORDION ── */
.sg{border-top:.5px solid var(--brd);margin-top:1.5rem;}
.sg-toggle{width:100%;display:flex;align-items:center;justify-content:space-between;padding:1.1rem 0;background:none;border:none;color:var(--white);font-family:var(--mono);font-size:.62rem;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;transition:color .2s;}
.sg-toggle:hover{color:var(--gold);}
.sg-toggle-t{display:flex;align-items:center;gap:.7rem;}
.sg-ic{color:var(--gold);}
.sg-arrow{transition:transform .3s ease;display:inline-block;font-size:.9rem;color:var(--mut);}
.sg-arrow.open{transform:rotate(180deg);}
.sg-inner{padding:0 0 1.8rem;}
.sg-methods{display:flex;flex-direction:column;gap:0;margin-bottom:1.5rem;}
.sg-method{display:flex;gap:1rem;align-items:flex-start;padding:.9rem 0;border-bottom:.5px solid var(--brd);}
.sg-mn{font-family:var(--mono);font-size:.58rem;color:var(--gold);letter-spacing:.14em;min-width:22px;padding-top:.1rem;}
.sg-mt{font-size:.7rem;color:var(--white);margin-bottom:.3rem;letter-spacing:.03em;}
.sg-md{font-size:.67rem;color:var(--mut2);line-height:1.7;}
.sg-tbl-wrap{margin-bottom:1.3rem;border:.5px solid var(--brd);}
.sg-tbl-row{display:grid;grid-template-columns:1fr 1.2fr 1.2fr;padding:.6rem .8rem;border-bottom:.5px solid var(--brd);font-size:.68rem;color:var(--mut2);}
.sg-tbl-row.two{grid-template-columns:1fr 1.6fr;}
.sg-tbl-row:last-child{border-bottom:none;}
.sg-tbl-h{font-family:var(--mono);font-size:.56rem;letter-spacing:.1em;text-transform:uppercase;color:var(--mut);background:rgba(255,255,255,.02);}
.sg-tips{display:flex;flex-direction:column;gap:.6rem;margin-bottom:1.3rem;}
.sg-tip{display:flex;gap:.8rem;align-items:flex-start;padding:.8rem 1rem;background:rgba(201,168,76,.04);border:.5px solid rgba(201,168,76,.15);font-size:.66rem;color:var(--mut2);line-height:1.7;}
.sg-tip-ic{color:var(--gold);flex-shrink:0;font-size:.8rem;margin-top:.1rem;}
.sg-brc-note{font-size:.7rem;color:var(--mut2);line-height:1.8;padding:.75rem 1rem;border-left:2px solid var(--gold);margin-bottom:1.2rem;background:rgba(201,168,76,.03);}
.sg-dl{display:inline-flex;align-items:center;gap:.5rem;font-family:var(--mono);font-size:.58rem;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);text-decoration:none;border:.5px solid rgba(201,168,76,.35);padding:.55rem 1.1rem;transition:all .2s;}
.sg-dl:hover{background:rgba(201,168,76,.08);}

/* ── INFO PAGES ── */
.info-pg{max-width:720px;margin:0 auto;padding:3rem 2.5rem 6rem;}
.info-hdr{margin:2rem 0 3rem;}
.info-eye{font-family:var(--mono);font-size:.58rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin-bottom:1rem;}
.info-t{font-family:var(--serif);font-size:3rem;font-weight:300;color:var(--white);line-height:1.15;margin-bottom:0;}
.info-body{display:flex;flex-direction:column;gap:3rem;}
.info-sh{font-family:var(--mono);font-size:.62rem;letter-spacing:.14em;text-transform:uppercase;color:var(--mut);margin-bottom:1.2rem;padding-bottom:.6rem;border-bottom:.5px solid var(--brd);}
.info-p{font-size:.78rem;color:var(--mut2);line-height:1.9;white-space:pre-line;margin:0;}
.info-rows{display:flex;flex-direction:column;}
.info-row{display:flex;justify-content:space-between;align-items:baseline;padding:.75rem 0;border-bottom:.5px solid var(--brd);}
.info-rl{font-size:.65rem;color:var(--mut);letter-spacing:.06em;}
.info-rv{font-size:.72rem;color:var(--white);}
.info-link{color:var(--gold);text-decoration:none;transition:opacity .2s;}
.info-link:hover{opacity:.75;}
.info-tbl{display:flex;flex-direction:column;}
.info-tr{display:grid;grid-template-columns:repeat(3,1fr);padding:.65rem .4rem;border-bottom:.5px solid var(--brd);font-size:.7rem;color:var(--mut2);}
.info-tr.two{grid-template-columns:1fr 1.6fr;}
.info-tr-h{color:var(--mut);font-family:var(--mono);font-size:.58rem;letter-spacing:.1em;text-transform:uppercase;background:rgba(255,255,255,.02);}
@media(max-width:600px){.info-pg{padding:2rem 1.25rem 5rem;}.info-t{font-size:2.2rem;}}
`;

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function Nav({ cartCount, onCartOpen, onLogo, activeLinea, onLinea, onQuote, showLineas }) {
  return (
    <nav className="nav">
      <div className="nav-top">
        <div className="nav-logo" onClick={onLogo}>
          <Logo size={26}/><span className="nav-wm">FORJA</span>
        </div>
        <div className="nav-right">
          <a className="nav-ph" href="tel:+56912345678">+56 9 1234 5678</a>
          <button className="nav-quote" onClick={onQuote}>Cotizar</button>
          <button className="nav-cart" onClick={onCartOpen}>
            <AnimatePresence mode="wait">
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  className="nav-bbl"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
            Carrito
          </button>
        </div>
      </div>
      {showLineas && (
        <div className="nav-lineas">
          {LINEAS.map(l => (
            <button key={l} className={`nav-lb${activeLinea===l?" on":""}`} onClick={() => onLinea(l)}>{l}</button>
          ))}
        </div>
      )}
    </nav>
  );
}

function Gallery({ imgs }) {
  const [active, setActive] = useState(0);
  return (
    <div className="gal">
      <div className="gal-main">
        <AnimatePresence mode="wait">
          <motion.img
            key={active}
            src={imgs[active]}
            alt="producto"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25,0.46,0.45,0.94] }}
          />
        </AnimatePresence>
      </div>
      {imgs.length > 1 && (
        <div className="gal-thumbs">
          {imgs.map((src, i) => (
            <button key={i} className={`gal-th${active===i?" on":""}`} onClick={() => setActive(i)}>
              <img src={src} alt={`vista ${i+1}`}/>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ProductDetail({ product, onBack, onAdd }) {
  const [mat, setMat] = useState("silver");
  const matD = MATERIALS.find(m => m.id === mat);
  const price = calcPrice(product.basePrice, mat);

  return (
    <div className="detail">
      <motion.button
        className="detail-back"
        onClick={onBack}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        ← Volver al catálogo
      </motion.button>
      <div className="detail-layout">

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.25,0.46,0.45,0.94] }}
        >
          <Gallery imgs={product.imgs}/>
        </motion.div>

        <motion.div
          className="di"
          initial="hidden"
          animate="show"
          variants={SC(0.15, 0.07)}
        >
          <motion.div variants={FU}>
            <div className="di-brd">
              <span>Tienda</span><span>/</span>
              <span>{product.linea}</span><span>/</span>
              <span style={{color:"var(--mut)"}}>{product.name}</span>
            </div>
            <div className="di-linea">{product.linea}</div>
            <div className="di-name">{product.name}</div>
            <div className="di-tgl">"{product.tagline}"</div>
          </motion.div>

          <motion.div variants={FI} className="di-div"/>

          <motion.div variants={FU} className="concepto-box">
            <div className="cb-title">El concepto</div>
            <div className="cb-txt">{product.concepto}</div>
            <div className="cb-ins">{product.inspiracion}</div>
          </motion.div>

          <motion.div variants={FI} className="di-div"/>

          <motion.div variants={FU}>
            <div className="opt-lbl">Material</div>
            <div className="opt-grp">
              {MATERIALS.map(m => (
                <button
                  key={m.id}
                  className={`opt-btn${mat===m.id?" on":""}`}
                  onClick={() => setMat(m.id)}
                >
                  {m.label} {m.suffix}{m.modifier>0?` +${m.modifier}`:""}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div variants={FU}>
            <div className="price-from">Precio final</div>
            <div className="price-main">{fmt(price)}</div>
            <div className="price-bd">
              Base {fmt(product.basePrice)}
              {matD?.modifier > 0 && ` + ${matD.label} ${fmt(matD.modifier)}`}
            </div>
            <div className="price-ship">✓ Envío gratis · Entrega 5–7 días hábiles</div>
          </motion.div>

          <motion.button
            variants={FU}
            className="btn-add"
            onClick={() => onAdd({...product, materialId:mat, materialLabel:matD?.label, price})}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
          >
            Agregar al carrito
          </motion.button>

          <motion.div variants={FU}>
            <div className="opt-lbl" style={{marginBottom:"1rem"}}>Detalles</div>
            <div className="det-list">
              {product.detalles.map((d,i) => (
                <div className="det-row" key={i}>{d}</div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={FU}>
            <SizeGuide linea={product.linea} slug={product.slug}/>
          </motion.div>

          <motion.div variants={FI} className="di-div"/>

          <motion.div variants={FU} className="dtrust">
            <div className="dtr"><span className="dtr-ic">◈</span> Materiales certificados — Plata 925 · Oro 18K</div>
            <div className="dtr"><span className="dtr-ic">⬡</span> Garantía de autenticidad incluida</div>
            <div className="dtr"><span className="dtr-ic">◇</span> Devolución en 15 días sin preguntas</div>
            <div className="dtr"><span className="dtr-ic">⬟</span> Empaque de regalo incluido</div>
          </motion.div>

          {product.reviews?.length > 0 && (
            <motion.div variants={FU}>
              <div className="d-rev-title" style={{marginBottom:"1rem"}}>Lo que dicen de él</div>
              <div className="d-rev-grid">
                {product.reviews.map((r,i) => (
                  <div className="d-rev" key={i}>
                    <div className="d-rev-stars">{"★".repeat(r.stars)}</div>
                    <div className="d-rev-txt">"{r.text}"</div>
                    <div className="d-rev-name">{r.name} · Verificado</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

// ─── STORY VIEW ──────────────────────────────────────────────────────────────
function StoryView({ onBack, onQuote, onCatalog }) {
  const chapters = [
    {
      n: "01",
      lbl: "El origen",
      title: <>Dos bomberos y<br/>una <em>revelación</em></>,
      body: [
        "Pasamos años enfrentando el fuego como enemigo. Aprendimos su fuerza, su lógica, su devastación. Pero en algún turno de madrugada, en medio del silencio que queda después del caos, algo cambió la pregunta que nos hacíamos.",
        "Si el fuego tiene el poder de arrasar con todo, también tiene el poder de dar forma a lo que dura para siempre. Los metales preciosos no existen sin él. Las joyas que perduran generaciones nacen exactamente del mismo elemento que nosotros aprendimos a dominar.",
      ],
      quote: "\"El fuego no elige destruir o crear. Eso lo decide quien lo sostiene.\"",
    },
    {
      n: "02",
      lbl: "El maestro",
      title: <>Treinta años de<br/><em>oficio</em></>,
      body: [
        "Nuestro aliado lleva más de tres décadas doblando metales preciosos con las manos. Conoce el oro como se conoce a un viejo amigo: sus caprichos, su comportamiento bajo el calor, la paciencia que exige. Conoce la plata como conoce su propia voz.",
        "Cuando lo encontramos, entendimos de inmediato que la diferencia entre un metal y una joya es exactamente la misma que entre un incendio y una fragua: el control consciente, preciso y respetuoso del fuego.",
      ],
      quote: "\"Un maestro no doma el metal. Lo escucha hasta que el metal le dice qué quiere ser.\"",
    },
    {
      n: "03",
      lbl: "La alianza",
      title: <>Tres visiones.<br/>Una sola <em>forja</em></>,
      body: [
        "La alianza entre dos bomberos y un maestro joyero no fue un negocio calculado. Fue una convergencia de propósitos que ninguno de los tres buscaba deliberadamente — simplemente ocurrió, como ocurren las cosas que tienen que ocurrir.",
        "El conocimiento del fuego se encontró con el dominio del metal. La disciplina del rescate se fusionó con la paciencia del artesano. FORJA nació de esa mesa: donde lo que destruye y lo que crea son exactamente lo mismo, y la diferencia está en las manos que lo sostienen.",
      ],
      quote: "\"FORJA no es una marca. Es el nombre de lo que pasa cuando el fuego tiene una intención.\"",
    },
    {
      n: "04",
      lbl: "El propósito",
      title: <>Tu joya.<br/>Tu <em>proceso</em>.</>,
      body: [
        "Lo que diferencia a FORJA no es solo el material ni el diseño. Es la invitación.",
        "Queremos que seas parte activa del proceso de creación de tu propia joya. Que conozcas de qué está hecha, cómo nació, qué decisiones se tomaron en el camino. Que elijas el metal, el acabado, el grabado — y que entiendas el porqué de cada uno. Porque una joya que comprendes se lleva de manera completamente distinta a una que simplemente compras.",
      ],
      quote: "\"No te vendemos una joya. Te invitamos a forjarla.\"",
    },
  ];

  return (
    <motion.div className="story" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}>
      <button className="detail-back" onClick={onBack}>← Volver</button>

      <motion.div className="story-hero" initial="hidden" animate="show" variants={SC(0.1,0.12)}>
        <motion.div variants={FU} className="story-eye">Nuestra historia · El origen de FORJA</motion.div>
        <motion.h1 variants={FU} className="story-h1">El fuego que<br/><em>crea</em></motion.h1>
        <motion.p variants={FU} className="story-intro">
          Dos bomberos. Un maestro joyero con treinta años de oficio. Y la convicción de que el fuego no solo destruye — también es la herramienta más antigua de creación que existe.
        </motion.p>
      </motion.div>

      {chapters.map((ch, i) => (
        <motion.div
          key={i}
          className="story-chapter"
          initial={{ opacity:0, y:30 }}
          whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, margin:"-60px" }}
          transition={{ duration:0.6, ease:[0.25,0.46,0.45,0.94] }}
        >
          <div className="story-num">{ch.n}</div>
          <div>
            <div className="story-ch-lbl">{ch.lbl}</div>
            <h2 className="story-ch-t">{ch.title}</h2>
            {ch.body.map((p,j) => <p key={j} className="story-ch-d">{p}</p>)}
            <div className="story-ch-q">{ch.quote}</div>
          </div>
        </motion.div>
      ))}

      <motion.div
        className="story-closing"
        initial={{ opacity:0, y:20 }}
        whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true }}
        transition={{ duration:0.6 }}
      >
        <div className="story-closing-t">El fuego sigue <em>encendido</em></div>
        <p className="story-closing-d">
          Cada pieza que sale de FORJA lleva en ella la historia de tres personas que decidieron que el fuego podía significar algo distinto. Si llegaste hasta aquí, ya eres parte de esa historia.
        </p>
        <div style={{display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap"}}>
          <button className="btn-p" onClick={onCatalog}>Explorar colección</button>
          <button className="btn-s" onClick={onQuote}>Cotizar pieza única</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── PACKAGING SECTION ───────────────────────────────────────────────────────
function PackagingSection() {
  return (
    <motion.section
      className="pkg"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.75, ease: [0.25,0.46,0.45,0.94] }}
    >
      <motion.div
        className="pkg-c"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={SC(0.2, 0.1)}
      >
        <motion.div variants={FU} className="pkg-lbl">El arte de la entrega · Packaging FORJA</motion.div>

        <motion.h2 variants={FU} className="pkg-t">
          La experiencia<br/>
          comienza antes<br/>
          de <em>abrirlo</em>
        </motion.h2>

        <motion.p variants={FU} className="pkg-tag">
          "Porque recibir una joya FORJA no es un simple envío.<br/>
          Es el inicio de un rito."
        </motion.p>

        <motion.div variants={FU} className="pkg-list">
          {[
            "Negro absoluto exterior · interior aterciopelado oscuro",
            "Foil en oro sobre cartón de alta gramaje",
            "Tres formatos: anillo · collar · pulsera",
            "Incluido en cada pedido — sin costo adicional",
            "Diseñado para regalar sin necesidad de envoltura",
          ].map((li, i) => (
            <div className="pkg-li" key={i}>{li}</div>
          ))}
        </motion.div>

        <motion.div variants={FI} className="pkg-q">
          "Una joya bien dada llega ya envuelta en intención.<br/>
          La caja es el primer gesto — la joya, el segundo."
        </motion.div>
      </motion.div>

      <div className="pkg-iw">
        <img
          src={`${import.meta.env.BASE_URL}packaging.jpg`}
          alt="Packaging FORJA — cajas premium en negro con foil dorado"
          loading="lazy"
        />
      </div>
    </motion.section>
  );
}

// ─── QUOTE SECTION (catalog teaser) ─────────────────────────────────────────
function QuoteSection({ onQuote }) {
  return (
    <motion.section
      className="qsec"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, ease: [0.25,0.46,0.45,0.94] }}
    >
      <div className="qsec-bg"/>
      <motion.div
        className="qsec-inner"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={SC(0.1, 0.1)}
      >
        <motion.div variants={FU} className="qsec-lbl">Pieza única · Creada solo para ti</motion.div>
        <motion.h2 variants={FU} className="qsec-t">
          Tu historia,<br/>grabada en <em>metal</em>
        </motion.h2>
        <motion.p variants={FU} className="qsec-body">
          Hay joyas que no pueden existir en serie porque llevan algo que nadie más tiene: un nombre, una fecha, un símbolo que solo tú comprendes. En FORJA, la forja más íntima no comienza con el metal — comienza con tu relato.
        </motion.p>
        <motion.p variants={FI} className="qsec-q">
          "Como el herrero que escucha el acero antes de doblarlo,<br/>
          nosotros escuchamos tu historia antes de forjar tu pieza."
        </motion.p>

        <motion.div className="qsec-steps" variants={SC(0, 0.08)}>
          {[
            { n:"01", ic:"◈", t:"El Relato",  d:"Cuéntanos qué quieres transmitir y qué hace especial esta pieza." },
            { n:"02", ic:"⬡", t:"La Materia", d:"Elegimos juntos el metal, la forma y cada detalle." },
            { n:"03", ic:"⬟", t:"La Forja",   d:"Un maestro joyero trabaja tu pieza única en 3 a 5 días." },
            { n:"04", ic:"◇", t:"La Entrega", d:"Llega a tus manos con certificado de autor y empaque de regalo." },
          ].map((s,i) => (
            <motion.div className="qss" key={i} variants={FU}>
              <div className="qss-n">Paso {s.n}</div>
              <div className="qss-ic">{s.ic}</div>
              <div className="qss-t">{s.t}</div>
              <div className="qss-d">{s.d}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.button
          variants={FU}
          className="btn-p"
          onClick={onQuote}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          Solicitar cotización →
        </motion.button>
      </motion.div>
    </motion.section>
  );
}

// ─── QUOTE FORM (full view) ──────────────────────────────────────────────────
function QuoteForm({ onBack }) {
  const [pieceType, setPieceType] = useState(null);
  const [material, setMaterial]   = useState(null);
  const [vision, setVision]       = useState("");
  const [engraving, setEngraving] = useState("");
  const [budget, setBudget]       = useState(null);
  const [name, setName]           = useState("");
  const [contact, setContact]     = useState("");
  const [sent, setSent]           = useState(false);

  const ok = pieceType && material && vision.length > 10 && budget && name.length > 2 && contact.length > 4;

  if (sent) return (
    <motion.div className="qf" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}>
      <div className="qf-sent">
        <motion.div
          initial={{ scale:0.7, opacity:0 }}
          animate={{ scale:1, opacity:1 }}
          transition={{ delay:0.2, duration:0.5, ease:[0,0.55,0.45,1] }}
          style={{ marginBottom:"1.75rem", display:"flex", justifyContent:"center" }}
        >
          <Logo size={56}/>
        </motion.div>
        <div className="qf-sent-t">Tu relato está en nuestras manos</div>
        <p className="qf-sent-sub">
          Un maestro joyero de FORJA revisará tu solicitud<br/>
          y se pondrá en contacto contigo en menos de 24 horas.<br/>
          Cada pieza única merece ser escuchada antes de ser forjada.
        </p>
        <button className="btn-gh" onClick={onBack}>← Volver al catálogo</button>
      </div>
    </motion.div>
  );

  return (
    <motion.div className="qf" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}>
      <button className="detail-back" onClick={onBack}>← Volver al catálogo</button>

      <div className="qf-hdr">
        <div className="qf-lbl">Pieza única · Forja personalizada</div>
        <h1 className="qf-t">Forjemos algo<br/>solo para ti</h1>
        <p className="qf-sub">
          Cuéntanos tu visión y un maestro joyero te contactará en menos de 24 horas con una propuesta diseñada desde cero — solo para ti.
        </p>
      </div>

      <motion.div initial="hidden" animate="show" variants={SC(0.15, 0.09)}>

        {/* — Tipo de pieza — */}
        <div className="qf-div"/>
        <motion.div variants={FU}>
          <div className="qf-sh">¿Qué tipo de pieza imaginas?</div>
          <div className="qf-tiles">
            {PIECE_TYPES.map(pt => (
              <div key={pt.id} className={`qf-tile${pieceType===pt.id?" on":""}`} onClick={()=>setPieceType(pt.id)}>
                <div className="qf-tile-ic">{pt.icon}</div>
                <div className="qf-tile-t">{pt.label}</div>
                <div className="qf-tile-d">{pt.desc}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* — Material — */}
        <motion.div variants={FU}>
          <div className="qf-sh">¿En qué material la imaginas?</div>
          <div className="opt-grp" style={{marginBottom:"1.5rem"}}>
            {MATERIALS.map(m => (
              <button key={m.id} className={`opt-btn${material===m.id?" on":""}`} onClick={()=>setMaterial(m.id)}>
                {m.label} {m.suffix}
              </button>
            ))}
          </div>
        </motion.div>

        {/* — Visión — */}
        <div className="qf-div"/>
        <motion.div variants={FU}>
          <div className="qf-sh">Cuéntanos tu visión</div>
          <textarea
            className="qf-textarea"
            placeholder="Describe qué quieres transmitir con esta pieza. ¿Qué la hace especial? ¿Hay un nombre, una fecha, un símbolo o una historia detrás? No hay detalles pequeños cuando se trata de algo verdaderamente único..."
            value={vision}
            onChange={e=>setVision(e.target.value)}
            rows={5}
          />
        </motion.div>

        {/* — Grabado — */}
        <motion.div variants={FU} style={{marginTop:"1.5rem"}}>
          <div className="qf-sh">
            Grabado o texto especial&nbsp;
            <span style={{color:"var(--mut2)",fontSize:".5rem",letterSpacing:".1em"}}>(opcional)</span>
          </div>
          <input className="qf-inp" placeholder="Nombre, fecha, coordenadas, frase, símbolo..." value={engraving} onChange={e=>setEngraving(e.target.value)}/>
        </motion.div>

        {/* — Presupuesto — */}
        <div className="qf-div"/>
        <motion.div variants={FU}>
          <div className="qf-sh">Presupuesto estimado</div>
          <div className="qf-budget">
            {BUDGETS.map(b => (
              <button key={b.id} className={`qf-bud${budget===b.id?" on":""}`} onClick={()=>setBudget(b.id)}>{b.label}</button>
            ))}
          </div>
        </motion.div>

        {/* — Contacto — */}
        <div className="qf-div"/>
        <motion.div variants={FU}>
          <div className="qf-sh">¿Cómo te contactamos?</div>
          <div style={{display:"flex",flexDirection:"column",gap:".8rem"}}>
            <div>
              <label className="qf-flbl">Nombre</label>
              <input className="qf-inp" placeholder="Tu nombre" value={name} onChange={e=>setName(e.target.value)}/>
            </div>
            <div>
              <label className="qf-flbl">Email o WhatsApp</label>
              <input className="qf-inp" placeholder="correo@email.com · +56 9 ..." value={contact} onChange={e=>setContact(e.target.value)}/>
            </div>
          </div>
        </motion.div>

        {/* — Submit — */}
        <motion.button
          variants={FU}
          className="btn-qsend"
          disabled={!ok}
          onClick={()=>ok&&setSent(true)}
          whileHover={ok?{scale:1.01}:{}}
          whileTap={ok?{scale:0.98}:{}}
          style={{marginTop:"2rem"}}
        >
          Enviar solicitud de cotización
        </motion.button>

        <motion.p variants={FI} style={{fontSize:".57rem",color:"var(--mut2)",textAlign:"center",marginTop:"1rem",letterSpacing:".06em",lineHeight:1.7}}>
          Sin compromiso · Respuesta en menos de 24 horas · Tu información es confidencial
        </motion.p>

      </motion.div>
    </motion.div>
  );
}

function CartPanel({ items, onClose, onRemove, onCheckout }) {
  const total = items.reduce((s,i) => s+i.price, 0);
  return (
    <>
      <motion.div
        className="overlay"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.aside
        className="cart-panel"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.38, ease: [0, 0.55, 0.45, 1] }}
      >
        <div className="cart-hdr">
          <span className="cart-ttl">Carrito</span>
          <button className="cart-cls" onClick={onClose}>✕</button>
        </div>
        <div className="cart-items">
          {items.length === 0 ? (
            <div className="cart-empty">
              <div style={{marginBottom:"1rem",opacity:.3}}><Logo size={28}/></div>
              El carrito está vacío.<br/>Explora la colección.
            </div>
          ) : items.map((it,i) => (
            <motion.div
              className="cart-item"
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06, duration: 0.3 }}
            >
              <img className="ci-img" src={it.imgs[0]} alt={it.name}/>
              <div className="ci-info">
                <div className="ci-name">{it.name}</div>
                <div className="ci-opts">{it.linea} · {it.materialLabel}</div>
                <div className="ci-price">{fmt(it.price)}</div>
              </div>
              <button className="ci-rm" onClick={() => onRemove(i)}>✕</button>
            </motion.div>
          ))}
        </div>
        {items.length > 0 && (
          <div className="cart-ftr">
            <div>
              <div className="cart-cnt">{items.length} {items.length===1?"pieza":"piezas"}</div>
              <div className="cart-tot">
                <span className="cart-tot-l">Total</span>
                <span className="cart-tot-v">{fmt(total)}</span>
              </div>
            </div>
            <button className="btn-chk" onClick={onCheckout}>Proceder al pago</button>
          </div>
        )}
      </motion.aside>
    </>
  );
}

function CheckoutForm({ cart, onBack, onConfirm }) {
  const total = cart.reduce((s,i) => s+i.price, 0);
  const [f, setF] = useState({name:"",email:"",card:"",exp:"",cvv:""});
  const set = k => e => setF(p => ({...p,[k]:e.target.value}));
  const ok = f.name.length>2 && f.email.includes("@") && f.card.length>=16 && f.exp.length>=4 && f.cvv.length>=3;
  return (
    <motion.div
      className="checkout"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button className="detail-back" onClick={onBack}>← Volver al carrito</button>
      <div className="co-t">Checkout</div>
      <p className="co-s">Transacción segura · Sin almacenamiento de datos</p>
      <div className="co-sum">
        <div className="co-sum-h">Resumen del pedido</div>
        {cart.map((it,i) => (
          <div className="co-row" key={i}><span>{it.name} · {it.materialLabel}</span><span>{fmt(it.price)}</span></div>
        ))}
        <div className="co-row" style={{color:"var(--mut2)",fontSize:".6rem"}}><span>Envío</span><span>Gratis</span></div>
        <div className="co-row tot"><span>Total</span><span className="v">{fmt(total)}</span></div>
      </div>
      <div className="fs">
        <div className="fs-h">Datos de contacto</div>
        <div className="field"><label>Nombre completo</label><input placeholder="Juan Rodríguez" value={f.name} onChange={set("name")}/></div>
        <div className="field"><label>Email</label><input type="email" placeholder="juan@email.com" value={f.email} onChange={set("email")}/></div>
      </div>
      <div className="fs">
        <div className="fs-h">Datos de pago (simulado)</div>
        <div className="field"><label>Número de tarjeta</label><input placeholder="4242 4242 4242 4242" maxLength={16} value={f.card} onChange={set("card")}/></div>
        <div className="field-row">
          <div className="field"><label>Vencimiento</label><input placeholder="MM/AA" maxLength={5} value={f.exp} onChange={set("exp")}/></div>
          <div className="field"><label>CVV</label><input placeholder="123" maxLength={3} value={f.cvv} onChange={set("cvv")}/></div>
        </div>
      </div>
      <button className="btn-cfm" disabled={!ok} onClick={onConfirm}>Confirmar pedido — {fmt(total)}</button>
    </motion.div>
  );
}

function SuccessScreen({ orderId, cart, onReset }) {
  const total = cart.reduce((s,i) => s+i.price, 0);
  const del = new Date(Date.now()+7*86400000).toLocaleDateString("es-CL",{day:"numeric",month:"long"});
  return (
    <motion.div
      className="suc"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        style={{marginBottom:"2rem"}}
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5, ease: [0, 0.55, 0.45, 1] }}
      >
        <Logo size={56}/>
      </motion.div>
      <div className="suc-t">Pedido confirmado</div>
      <div className="suc-id">{orderId}</div>
      <p className="suc-s">Tu pieza comenzará a forjarse en las próximas horas. Recibirás confirmación por correo.</p>
      <div className="suc-meta">
        <div className="suc-row"><span>Total pagado</span><span>{fmt(total)}</span></div>
        <div className="suc-row"><span>Piezas</span><span>{cart.length}</span></div>
        <div className="suc-row"><span>Entrega estimada</span><span>{del}</span></div>
      </div>
      <button className="btn-gh" onClick={onReset}>Volver al catálogo</button>
    </motion.div>
  );
}

// ─── SIZE GUIDE ──────────────────────────────────────────────────────────────
const RING_SIZES = [
  ["8","4,82 cm"],["9","4,95 cm"],["10","5,08 cm"],["11","5,20 cm"],["12","5,34 cm"],
  ["13","5,46 cm"],["14","5,59 cm"],["15","5,71 cm"],["16","5,84 cm"],["17","5,97 cm"],
  ["18","6,10 cm"],["19","6,22 cm"],["20","6,35 cm"],["21","6,48 cm"],["22","6,60 cm"],
];
const BANGLE_SIZES = [
  ["Pequeña","14–16 cm","Hasta 58 mm"],
  ["Mediana","17–18 cm","58–62 mm"],
  ["Grande","18–20 cm","62–68 mm"],
];

function SizeGuide({ linea, slug }) {
  const [open, setOpen] = useState(false);
  if (linea !== "Anillos" && linea !== "Pulseras") return null;

  const isRing   = linea === "Anillos";
  const isBangle = slug === "tensor" || slug === "huggie";

  return (
    <div className="sg">
      <button className="sg-toggle" onClick={()=>setOpen(o=>!o)}>
        <span className="sg-toggle-t"><span className="sg-ic">◈</span> Guía de tallas</span>
        <span className={`sg-arrow${open?" open":""}`}>▾</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div key="sgb"
            initial={{opacity:0,height:0}} animate={{opacity:1,height:"auto"}}
            exit={{opacity:0,height:0}} style={{overflow:"hidden"}}
            transition={{duration:.32,ease:[.25,.46,.45,.94]}}
          >
            <div className="sg-inner">
              {isRing && (<>
                <div className="sg-methods">
                  {[
                    {n:"01",t:"Recorta una tira de papel",d:"Córtala de unos 15 cm de largo y 1 cm de ancho. Colócala alrededor del dedo que quieras medir."},
                    {n:"02",t:"Marcá el cierre del círculo",d:"Con un lápiz, marcá en el papel el punto exacto donde la tira se cierra sobre sí misma."},
                    {n:"03",t:"Medí y buscá tu talla",d:"Medí desde el inicio de la tira hasta la marca. Esa es tu circunferencia. Buscá ese valor en la tabla."},
                  ].map(m=>(
                    <div className="sg-method" key={m.n}>
                      <div className="sg-mn">{m.n}</div>
                      <div><div className="sg-mt">{m.t}</div><div className="sg-md">{m.d}</div></div>
                    </div>
                  ))}
                </div>
                <div style={{fontSize:".52rem",letterSpacing:".18em",color:"var(--mut)",textTransform:"uppercase",margin:"1.2rem 0 .6rem"}}>Tabla de tallas</div>
                <div className="sg-tbl-wrap">
                  <div className="sg-tbl-row two sg-tbl-h"><span>Talla FORJA</span><span>Circunferencia</span></div>
                  {RING_SIZES.map(([t,c])=>(
                    <div className="sg-tbl-row two" key={t}><span>{t}</span><span>{c}</span></div>
                  ))}
                </div>
                <div style={{fontSize:".52rem",letterSpacing:".18em",color:"var(--mut)",textTransform:"uppercase",margin:"1.2rem 0 .6rem"}}>Tips</div>
                <div className="sg-tips">
                  {[
                    {ic:"◇",t:"Medí tu dedo al final del día, cuando esté a su tamaño normal."},
                    {ic:"◇",t:"Evitá medir tus dedos cuando haga mucho frío o calor."},
                    {ic:"◇",t:"Si estás entre dos tallas, te recomendamos elegir la más grande."},
                  ].map((tip,i)=>(
                    <div className="sg-tip" key={i}>
                      <span className="sg-tip-ic">{tip.ic}</span>
                      <span>{tip.t}</span>
                    </div>
                  ))}
                </div>
                <a href={`${import.meta.env.BASE_URL}guia-tallas.pdf`} download className="sg-dl">↓ Descargar guía completa PDF</a>
              </>)}

              {!isRing && isBangle && (<>
                <div className="sg-methods">
                  {[
                    {n:"01",t:"Mide tu muñeca",d:"Con cinta métrica o hilo, rodea la muñeca en el punto más estrecho. Anota en cm."},
                    {n:"02",t:"Mide el ancho de tus nudillos",d:"Cierra la mano suavemente. Mide la circunferencia a la altura de los nudillos — ese es el punto más ancho que debe pasar por el aro."},
                  ].map(m=>(
                    <div className="sg-method" key={m.n}>
                      <div className="sg-mn">{m.n}</div>
                      <div><div className="sg-mt">{m.t}</div><div className="sg-md">{m.d}</div></div>
                    </div>
                  ))}
                </div>
                <div className="sg-tbl-wrap">
                  <div className="sg-tbl-row sg-tbl-h"><span>Talla</span><span>Muñeca</span><span>Nudillos máx.</span></div>
                  {BANGLE_SIZES.map(([t,w,k])=>(
                    <div className="sg-tbl-row" key={t}><span>{t}</span><span>{w}</span><span>{k}</span></div>
                  ))}
                </div>
                <div className="sg-tip">
                  <span className="sg-tip-ic">◇</span>
                  <span>El brazalete se pone comprimiendo levemente la mano. Si tus nudillos son pronunciados, elige la apertura más grande.</span>
                </div>
              </>)}

              {!isRing && !isBangle && (<>
                <div className="sg-methods">
                  <div className="sg-method">
                    <div className="sg-mn">01</div>
                    <div>
                      <div className="sg-mt">Mide tu muñeca</div>
                      <div className="sg-md">Con cinta métrica o hilo, rodea la muñeca en el punto más estrecho. Anota la longitud en cm.</div>
                    </div>
                  </div>
                </div>
                <div className="sg-brc-note">
                  La <strong>Base</strong> tiene largo fijo de 20 cm — cómoda para muñecas de hasta 17 cm. Para muñecas más grandes, contáctanos para medida personalizada.
                </div>
                <div className="sg-tip">
                  <span className="sg-tip-ic">◇</span>
                  <span>El cierre de caja con doble seguro permite ajustar la holgura dentro del rango estándar.</span>
                </div>
              </>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── INFO PAGES ──────────────────────────────────────────────────────────────
const INFO_PAGES = {
  contacto: {
    title:"Contacto", eyebrow:"Estamos aquí para ti",
    sections:[
      { heading:"Escríbenos", items:[
        { label:"Email",     value:"hola@forja.cl",     href:"mailto:hola@forja.cl" },
        { label:"WhatsApp",  value:"+56 9 1234 5678",   href:"https://wa.me/56912345678?text=Hola FORJA, quiero saber más sobre sus joyas" },
        { label:"Instagram", value:"@forja.joyas",      href:"https://instagram.com/forja.joyas" },
      ]},
      { heading:"Horario de atención", text:"Lunes a viernes · 9:00 – 18:00 hrs\nRespuesta por email o WhatsApp en menos de 24 horas." },
    ]
  },
  envios: {
    title:"Envíos y devoluciones", eyebrow:"Entrega segura · Garantía real",
    sections:[
      { heading:"Envíos", items:[
        { label:"Tiempo de entrega", value:"5–7 días hábiles" },
        { label:"Envío gratis",      value:"En pedidos sobre $120 USD" },
        { label:"Cobertura",         value:"Todo Chile · Consultar envíos internacionales" },
        { label:"Seguimiento",       value:"Número de tracking por email al despachar" },
      ]},
      { heading:"Devoluciones", items:[
        { label:"Plazo",     value:"15 días desde la recepción" },
        { label:"Condición", value:"Sin uso y en empaque original" },
        { label:"Proceso",   value:"Escríbenos y coordinamos el retiro sin costo" },
      ]},
      { heading:"Garantía", text:"Cada pieza FORJA tiene garantía de 6 meses contra defectos de fabricación. No cubre daños por uso inadecuado, humedad extrema ni pérdida." },
    ]
  },
  tallas: {
    title:"Guía de tallas", eyebrow:"Encuentra tu medida exacta",
    sections:[
      { heading:"Cómo medir tu talla — anillos", text:"01 · Recortá una tira de papel de unos 15 cm y envolvela alrededor del dedo que quieras medir.\n\n02 · Marcá con un lápiz el punto donde la tira se cierra sobre sí misma.\n\n03 · Medí desde el inicio de la tira hasta la marca. Esa longitud es tu circunferencia. Buscala en la tabla." },
      { heading:"Tabla de tallas — anillos", table:[
        ["Talla FORJA","Circunferencia"],
        ["8","4,82 cm"],["9","4,95 cm"],["10","5,08 cm"],["11","5,20 cm"],["12","5,34 cm"],
        ["13","5,46 cm"],["14","5,59 cm"],["15","5,71 cm"],["16","5,84 cm"],["17","5,97 cm"],
        ["18","6,10 cm"],["19","6,22 cm"],["20","6,35 cm"],["21","6,48 cm"],["22","6,60 cm"],
      ]},
      { heading:"Tips", text:"· Medí tu dedo al final del día, cuando esté a su tamaño normal.\n· Evitá medir tus dedos cuando haga mucho frío o calor.\n· Si estás entre dos tallas, te recomendamos elegir la más grande." },
      { heading:"Pulseras de eslabón (Base)", text:"La Base tiene largo fijo de 20 cm — cómoda para muñecas de hasta 17 cm con holgura natural. Para muñecas más grandes, contáctanos para un largo personalizado." },
      { heading:"Brazaletes rígidos (Tensor · Huggie)", text:"Medí la circunferencia de tus nudillos cerrando la mano suavemente — ese es el punto más ancho que debe pasar por el aro.\n\nTensor — diámetro interior 58–62 mm (ajustable)\nHuggie — diámetro interior 56–60 mm\n\nSi tus nudillos miden más de 62 mm, contáctanos." },
      { heading:"Descargar guía completa", text:"Guía PDF con instrucciones paso a paso, tabla completa y referencia de brazaletes.", download:true },
    ]
  },
  privacidad: {
    title:"Política de privacidad", eyebrow:"Tu información, protegida",
    sections:[
      { heading:"Datos que recopilamos", text:"Al realizar una compra o cotización recopilamos nombre, correo electrónico y teléfono de contacto. No almacenamos datos de tarjetas de crédito — los pagos se procesan por plataformas certificadas." },
      { heading:"Uso de los datos", text:"Tu información se usa exclusivamente para procesar pedidos, responder consultas y enviarte novedades si te suscribiste al newsletter. No vendemos ni compartimos tus datos con terceros." },
      { heading:"Cookies", text:"Este sitio no utiliza cookies de rastreo publicitario. Solo cookies técnicas necesarias para el funcionamiento básico del sitio." },
      { heading:"Tus derechos", text:"Puedes solicitar acceso, rectificación o eliminación de tus datos en cualquier momento escribiendo a hola@forja.cl. Respondemos en un plazo máximo de 5 días hábiles." },
    ]
  },
};

function InfoView({ page, onBack }) {
  const pg = INFO_PAGES[page];
  if (!pg) return null;
  return (
    <motion.div className="info-pg" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.5}}>
      <button className="detail-back" onClick={onBack}>← Volver</button>
      <div className="info-hdr">
        <div className="info-eye">{pg.eyebrow}</div>
        <h1 className="info-t">{pg.title}</h1>
      </div>
      <div className="info-body">
        {pg.sections.map((sec,i)=>(
          <div key={i}>
            <div className="info-sh">{sec.heading}</div>
            {sec.text && <p className="info-p">{sec.text}</p>}
            {sec.download && (
              <a href={`${import.meta.env.BASE_URL}guia-tallas.pdf`} download className="sg-dl" style={{marginTop:"1rem",display:"inline-flex"}}>
                ↓ Descargar guía de tallas PDF
              </a>
            )}
            {sec.items && (
              <div className="info-rows">
                {sec.items.map((item,j)=>(
                  <div className="info-row" key={j}>
                    <span className="info-rl">{item.label}</span>
                    {item.href
                      ? <a href={item.href} target="_blank" rel="noopener noreferrer" className="info-rv info-link">{item.value}</a>
                      : <span className="info-rv">{item.value}</span>
                    }
                  </div>
                ))}
              </div>
            )}
            {sec.table && (
              <div className="info-tbl">
                {sec.table.map((row,j)=>(
                  <div key={j} className={`info-tr${sec.table[0].length===2?" two":""}${j===0?" info-tr-h":""}`}>
                    {row.map((cell,k)=><span key={k}>{cell}</span>)}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
const TESTIMONIALS_GLOBAL = [
  {name:"Rodrigo V.", stars:5, text:"Calidad impresionante. El Norte en acero llegó perfecto y el empaque es de otro nivel. Lo uso todos los días."},
  {name:"Matías C.",  stars:5, text:"La pulsera Base es exactamente lo que buscaba: minimalista, resistente y con un cierre perfecto."},
  {name:"Felipe A.",  stars:5, text:"Me sorprendió la atención. La Ruta en plata 925 supera todas mis expectativas."},
  {name:"Andrés M.",  stars:5, text:"El Sello personalizado con mis iniciales quedó impecable. Vale cada peso."},
];

export default function App() {
  const [view, setView] = useState("catalog");
  const [selected, setSelected] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [activeLinea, setActiveLinea] = useState("Todos");
  const [nlEmail, setNlEmail] = useState("");
  const [nlSent, setNlSent] = useState(false);
  const [infoPage, setInfoPage] = useState(null);
  const catalogRef = useRef(null);

  const openInfo = page => { setInfoPage(page); setView("info"); };

  const filtered = activeLinea === "Todos" ? PRODUCTS : PRODUCTS.filter(p => p.linea === activeLinea);
  const byLinea = LINEAS.slice(1).map(l => ({ linea: l, items: filtered.filter(p => p.linea === l) })).filter(g => g.items.length > 0);

  const showToast = () => { setToast(true); setTimeout(()=>setToast(false), 1500); };
  const addToCart = item => { setCart(c=>[...c,item]); showToast(); };
  const removeFromCart = idx => setCart(c=>c.filter((_,i)=>i!==idx));
  useEffect(() => {
    const annH = document.querySelector(".ann")?.offsetHeight ?? 0;
    window.scrollTo({ top: annH, behavior: "instant" });
  }, [view]);

  const scrollCat = () => setTimeout(()=>catalogRef.current?.scrollIntoView({behavior:"smooth"}),50);
  const handleLinea = l => { setActiveLinea(l); setView("catalog"); scrollCat(); };
  const handleLogo = () => {
    setView("catalog"); setSelected(null); setActiveLinea("Todos");
    const annH = document.querySelector(".ann")?.offsetHeight ?? 0;
    window.scrollTo({ top: annH, behavior: "smooth" });
  };
  const handleConfirm = () => { setOrderId(genId()); setView("success"); setCartOpen(false); };
  const reset = () => { setView("catalog"); setCart([]); setSelected(null); setCartOpen(false); setOrderId(null); setActiveLinea("Todos"); };

  return (
    <>
      <style>{css}</style>

      {/* ANNOUNCEMENT */}
      <div className="ann">Envío gratis en pedidos sobre $120 USD · Plata 925 · Oro 18K</div>

      <Nav cartCount={cart.length} onCartOpen={()=>setCartOpen(true)} onLogo={handleLogo} activeLinea={activeLinea} onLinea={handleLinea} onQuote={()=>setView("quote")} showLineas={view==="catalog"}/>

      {view === "catalog" && (<>

        {/* ── HERO ── */}
        <section className="hero">
          <div className="hero-bg"/>
          <svg className="hero-grid" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
            {[200,400,600,800,1000,1200].map(x=><line key={x} x1={x} y1="0" x2={x} y2="800" stroke="#1e1e1e" strokeWidth=".5"/>)}
            {[160,320,480,640].map(y=><line key={y} x1="0" y1={y} x2="1440" y2={y} stroke="#1e1e1e" strokeWidth=".5"/>)}
          </svg>
          <motion.div
            className="hero-c"
            initial="hidden"
            animate="show"
            variants={SC(0.1, 0.12)}
          >
            <motion.div variants={FI} style={{marginBottom:"2rem"}}>
              <Logo size={68}/>
            </motion.div>
            <motion.div variants={FU} className="hero-eye">Joyería Masculina de Autor · Colección 2025</motion.div>
            <motion.h1 variants={FU} className="hero-h1">Forjando tu<br/><em>esencia</em></motion.h1>
            <motion.p variants={FU} className="hero-sub">Tres líneas. Diez piezas. Una identidad.<br/>Anillos, Collares y Pulseras con nombre propio.</motion.p>
            <motion.div variants={FU} className="hero-ctas">
              <button className="btn-p" onClick={scrollCat}>Explorar colección</button>
              <button className="btn-s" onClick={()=>setView("story")}>Nuestra historia</button>
            </motion.div>
          </motion.div>
          <motion.div
            className="hero-scr"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <div className="hero-scr-l"/><div className="hero-scr-t">Scroll</div>
          </motion.div>
        </section>

        {/* ── TRUST ── */}
        <motion.div
          className="trust"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={SC(0, 0.1)}
        >
          {[
            {icon:"◈",title:"Plata 925 · Oro 18K",sub:"Materiales premium certificados"},
            {icon:"⬡",title:"Garantía de autenticidad",sub:"Cada pieza verificada"},
            {icon:"⬟",title:"Envío a todo Chile",sub:"5–7 días hábiles"},
            {icon:"◇",title:"Empaque de regalo",sub:"Presentación incluida"},
          ].map((t,i)=>(
            <motion.div className="trust-i" key={i} variants={FU}>
              <div className="ti-ic">{t.icon}</div>
              <div className="ti-t">{t.title}</div>
              <div className="ti-s">{t.sub}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── CATÁLOGO POR LÍNEAS ── */}
        <div ref={catalogRef}>
          {byLinea.length === 0 ? (
            <div style={{padding:"4rem 2.5rem",color:"var(--mut)",fontSize:".7rem",textAlign:"center"}}>
              No hay productos en esta línea aún.
            </div>
          ) : byLinea.map(({ linea, items }, gi) => (
            <div key={linea}>
              <motion.div
                className="linea-hdr"
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.25,0.46,0.45,0.94] }}
              >
                <div className="linea-num">Línea 0{gi+1}</div>
                <div className="linea-title">{linea}</div>
                <div className="linea-desc">{items.length} piezas</div>
              </motion.div>
              <div className="pgrid">
                {items.map((p, idx) => (
                  <motion.div
                    className="pc"
                    key={p.id}
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.55, delay: (idx % 3) * 0.09, ease: [0.25,0.46,0.45,0.94] }}
                    onClick={()=>{setSelected(p);setView("detail");}}
                  >
                    <div className="pc-iw">
                      <img className="pc-img" src={p.img} alt={p.name} loading="lazy"/>
                      {p.tag && <span className="pc-tag">{p.tag}</span>}
                      <button className="pc-w">♡</button>
                    </div>
                    <div className="pc-b">
                      <div className="pc-linea">{p.linea}</div>
                      <div className="pc-name">{p.name}</div>
                      <div className="pc-tgl">{p.tagline}</div>
                      <div className="pc-ft">
                        <div className="pc-price">desde {fmt(calcPrice(p.basePrice, "silver"))}</div>
                        <div className="pc-cta">Ver pieza →</div>
                      </div>
                    </div>
                    <div className="pc-line"/>
                  </motion.div>
                ))}
              </div>
              <div style={{height:"1px",background:"var(--brd)",margin:"0 2.5rem"}}/>
            </div>
          ))}
        </div>

        {/* ── HIGHLIGHT ── */}
        <motion.section
          className="hl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.25,0.46,0.45,0.94] }}
        >
          <div className="hl-iw">
            <img src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=900&q=80&auto=format&fit=crop" alt="Joyero artesanal"/>
          </div>
          <div className="hl-c">
            <div className="hl-eye">El proceso importa</div>
            <h2 className="hl-t">Maestría local.<br/>Legado digital.</h2>
            <p className="hl-d">Cada pieza FORJA nace del oficio artesanal. No vendemos un objeto terminado; vendemos el derecho a presenciar su nacimiento. Cada modelo tiene nombre, historia y propósito.</p>
            <div className="hl-list">
              <div className="hl-li">Plata 925 · Oro 18K amarillo</div>
              <div className="hl-li">Cada pieza tiene nombre e historia propia</div>
              <div className="hl-li">Piezas hipoalergénicas resistentes al agua</div>
              <div className="hl-li">Empaque de regalo incluido en cada pedido</div>
            </div>
            <button className="btn-p" style={{alignSelf:"flex-start"}} onClick={scrollCat}>Ver la colección</button>
          </div>
        </motion.section>

        {/* ── CRAFT ── */}
        <motion.section
          className="craft"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.25,0.46,0.45,0.94] }}
        >
          <div className="craft-c">
            <div className="craft-lbl">Identidad de marca</div>
            <h2 className="craft-t">El Lujo de la<br/>Identidad</h2>
            <p className="craft-d">Forja nace desde la convicción de que una joya no es solo un accesorio, sino una extensión de la identidad de quien la lleva. Cada pieza representa carácter, decisión y presencia.</p>
            <div className="craft-q">"La verdadera fuerza no necesita exagerarse: se transmite con presencia."</div>
            <button className="btn-s" style={{alignSelf:"flex-start"}} onClick={()=>setView("story")}>Nuestra historia →</button>
          </div>
          <div className="craft-iw">
            <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80&auto=format&fit=crop" alt="Joyería masculina"/>
          </div>
        </motion.section>

        {/* ── PACKAGING ── */}
        <PackagingSection/>

        {/* ── COTIZAR ── */}
        <QuoteSection onQuote={()=>setView("quote")}/>

        {/* ── TESTIMONIOS ── */}
        <section className="sec">
          <motion.div
            className="sec-hdr"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <div className="sec-lbl">Lo que dicen nuestros clientes</div>
              <h2 className="sec-t">Opiniones</h2>
            </div>
            <button className="sec-lnk" onClick={()=>window.open("https://www.google.com/search?q=FORJA+joyeria+masculina+Chile","_blank")}>Ver en Google →</button>
          </motion.div>
          <motion.div
            className="tgrid"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={SC(0, 0.12)}
          >
            {TESTIMONIALS_GLOBAL.map((t,i)=>(
              <motion.div className="tc" key={i} variants={FU}>
                <div className="tc-stars">{"★".repeat(t.stars)}</div>
                <div className="tc-txt">"{t.text}"</div>
                <div className="tc-name">{t.name} · Verificado</div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── NEWSLETTER ── */}
        <motion.div
          className="nl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <div className="nl-t">Acceso anticipado</div>
          <div className="nl-s">Sé el primero en conocer nuevos lanzamientos y ediciones limitadas</div>
          {nlSent ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              style={{fontSize:".68rem",color:"var(--gold)",letterSpacing:".1em"}}
            >
              ✓ Registrado — te avisaremos pronto
            </motion.div>
          ) : (
            <div className="nl-form">
              <input className="nl-inp" type="email" placeholder="tu@email.com" value={nlEmail} onChange={e=>setNlEmail(e.target.value)}/>
              <button className="nl-btn" onClick={()=>nlEmail&&setNlSent(true)}>Suscribir</button>
            </div>
          )}
        </motion.div>

        {/* ── FOOTER ── */}
        <footer className="ftr">
          <div className="ftr-top">
            <div className="ftr-brand">
              <div onClick={handleLogo} style={{cursor:"pointer"}}><Logo size={22}/></div>
              <p className="ftr-tgl">Joyería masculina de autor.<br/>Piezas de precisión forjadas<br/>para el hombre moderno.</p>
            </div>
            <div>
              <div className="ftr-ct">Líneas</div>
              <div className="ftr-cl">
                {["Anillos","Collares","Pulseras"].map(l=><span key={l} className="ftr-lk" onClick={()=>handleLinea(l)}>{l}</span>)}
              </div>
            </div>
            <div>
              <div className="ftr-ct">Ayuda</div>
              <div className="ftr-cl">
                <span className="ftr-lk" onClick={()=>setView("story")}>Nuestra historia</span>
                <span className="ftr-lk" onClick={()=>openInfo("contacto")}>Contacto</span>
                <span className="ftr-lk" onClick={()=>openInfo("envios")}>Envíos y devoluciones</span>
                <span className="ftr-lk" onClick={()=>openInfo("tallas")}>Guía de tallas</span>
                <span className="ftr-lk" onClick={()=>openInfo("privacidad")}>Política de privacidad</span>
              </div>
            </div>
            <div>
              <div className="ftr-ct">Síguenos</div>
              <div className="ftr-cl">
                <a className="ftr-lk" href="https://instagram.com/forja.joyas" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a className="ftr-lk" href="https://tiktok.com/@forja.joyas" target="_blank" rel="noopener noreferrer">TikTok</a>
                <a className="ftr-lk" href="https://pinterest.com/forjajoyas" target="_blank" rel="noopener noreferrer">Pinterest</a>
                <a className="ftr-lk" href="https://facebook.com/forjajoyas" target="_blank" rel="noopener noreferrer">Facebook</a>
              </div>
            </div>
          </div>
          <div className="ftr-bot">
            <span className="ftr-cp">© 2025 FORJA — Todos los derechos reservados.</span>
            <div className="ftr-pay">
              {["Visa","Mastercard","Amex","Webpay"].map(b=><span key={b} className="pay-b">{b}</span>)}
            </div>
          </div>
        </footer>

      </>)}

      {view === "detail" && selected && (
        <ProductDetail
          product={selected}
          onBack={()=>setView("catalog")}
          onAdd={item=>{addToCart(item);setView("catalog");}}
        />
      )}

      {view === "info" && infoPage && (
        <InfoView page={infoPage} onBack={()=>setView("catalog")}/>
      )}

      {view === "story" && (
        <StoryView
          onBack={()=>setView("catalog")}
          onQuote={()=>setView("quote")}
          onCatalog={()=>{ setView("catalog"); scrollCat(); }}
        />
      )}

      {view === "quote" && (
        <QuoteForm onBack={()=>setView("catalog")}/>
      )}

      {view === "checkout" && (
        <CheckoutForm cart={cart} onBack={()=>setCartOpen(true)} onConfirm={handleConfirm}/>
      )}

      {view === "success" && (
        <SuccessScreen orderId={orderId} cart={cart} onReset={reset}/>
      )}

      {/* CART con AnimatePresence */}
      <AnimatePresence>
        {cartOpen && (
          <CartPanel
            items={cart}
            onClose={()=>setCartOpen(false)}
            onRemove={removeFromCart}
            onCheckout={()=>{setCartOpen(false);setView("checkout");}}
          />
        )}
      </AnimatePresence>

      {/* TOAST con AnimatePresence */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className="toast"
            initial={{ opacity: 0, y: 16, x: "-50%" }}
            animate={{ opacity: 1, y: 0,  x: "-50%" }}
            exit={{ opacity: 0,    y: -10, x: "-50%" }}
            transition={{ duration: 0.25, ease: [0, 0.55, 0.45, 1] }}
          >
            ✓ Agregado al carrito
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
