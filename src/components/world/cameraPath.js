// Camera shots per chapter. Each [data-cam] section on the page anchors one shot.
export const SHOTS = {
  hero: { pos: [5.6, 2.5, 9.8], target: [0, 1.9, 0] },
  enter: { pos: [17, 16, 21], target: [-2, 0, -6] },
  storefront: { pos: [1.3, 1.9, 5.4], target: [-0.2, 1.5, 0] },
  product: { pos: [-0.3, 1.4, 3.1], target: [-0.3, 1.3, 0] },
  people: { pos: [-5, 3.2, 7], target: [0, 1.6, 0] },
  vendor: { pos: [-8.5, 5.2, 8], target: [0.8, 1.8, 0] },
  connect: { pos: [-1.6, 2.1, 6.2], target: [-2.9, 1.4, 0] },
};

export const LABELS = {
  hero: "A miniature street market at dusk, centered on the blue Vendr hot dog cart.",
  enter: "The camera rises above rows of popcorn, taco, ice cream and hot dog carts.",
  storefront: "The camera approaches the Vendr cart's counter.",
  product: "The Vendr cart, close up.",
  people: "A view across the cart and the market around it.",
  vendor: "The Vendr cart seen from a studio angle.",
  connect: "The camera glides in close to the Vendr cart, which settles on the right.",
};

const clamp = (v) => Math.min(1, Math.max(0, v));
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function readAnchors() {
  return [...document.querySelectorAll("[data-cam]")].map((el) => ({
    name: el.dataset.cam,
    y: el.getBoundingClientRect().top + window.scrollY,
  }));
}

export function sample(anchors, y, reduced) {
  if (!anchors.length) return { name: "hero", ...SHOTS.hero };
  let i = 0;
  while (i < anchors.length - 1 && y >= anchors[i + 1].y) i++;
  const a = anchors[i];
  const b = anchors[i + 1];
  if (!b) return { name: a.name, ...SHOTS[a.name] };
  const span = b.y - a.y;
  if (reduced) {
    const n = y < a.y + span / 2 ? a.name : b.name;
    return { name: n, ...SHOTS[n] };
  }
  // Short hold after arriving at each shot, so the eye can settle.
  const t = ease(clamp((y - a.y - span * 0.18) / (span * 0.72)));
  const A = SHOTS[a.name];
  const B = SHOTS[b.name];
  const mix = (p, q) => p.map((v, k) => v + (q[k] - v) * t);
  return { name: t < 0.5 ? a.name : b.name, pos: mix(A.pos, B.pos), target: mix(A.target, B.target) };
}