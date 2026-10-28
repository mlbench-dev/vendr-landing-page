import * as THREE from "three";

function rng(seed) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const THEMES = [
  { body: "#1a56db", accent: "#f8f7f4" }, // StreetVendr Royal Blue
  { body: "#c23a2b", accent: "#fde8e8" }, // Crimson
  { body: "#1e7e48", accent: "#e6f4ea" }, // Emerald
  { body: "#d97706", accent: "#fef3c7" }, // Amber
  { body: "#4338ca", accent: "#e0e7ff" }, // Indigo
  { body: "#0f766e", accent: "#ccfbf1" }, // Teal
];

export function buildWorld(scene, { lite }) {
  const rand = rng(19);
  const shadows = !lite;
  const disposables = [];
  const cache = {};

  const mat = (color, o = {}) => {
    const k = color + JSON.stringify(o);
    if (!cache[k]) {
      cache[k] = new THREE.MeshStandardMaterial({ color, ...o });
      disposables.push(cache[k]);
    }
    return cache[k];
  };

  // Luxury & atmosphere materials
  const goldBrass = mat("#e0b04c", { roughness: 0.22, metalness: 0.88 });
  const darkIron = mat("#18191f", { roughness: 0.35, metalness: 0.65 });
  const chrome = mat("#dce0e8", { roughness: 0.12, metalness: 0.95 });
  const walnutWood = mat("#6f3d1e", { roughness: 0.32, metalness: 0.04 });
  const chalkboard = mat("#14161a", { roughness: 0.82 });
  const chalkFrame = mat("#8a522a", { roughness: 0.45 });
  const glassMat = mat("#ffffff", { roughness: 0.08, transparent: true, opacity: 0.45 });

  // Emissive light materials
  const warmLight = new THREE.MeshStandardMaterial({
    color: "#2a1805",
    emissive: "#ffad42",
    emissiveIntensity: 0,
    roughness: 0.2,
  });
  const lateLight = new THREE.MeshStandardMaterial({
    color: "#18181c",
    emissive: "#ffc266",
    emissiveIntensity: 0,
    roughness: 0.2,
  });
  const lanternGlow = new THREE.MeshBasicMaterial({ color: "#ffe082" });
  disposables.push(warmLight, lateLight, lanternGlow);

  // Common Geometries
  const box = new THREE.BoxGeometry(1, 1, 1).translate(0, 0.5, 0);
  const cyl = new THREE.CylinderGeometry(1, 1, 1, lite ? 16 : 28);
  const blob = new THREE.IcosahedronGeometry(1, lite ? 1 : 2);
  const torus = new THREE.TorusGeometry(1, 0.22, 12, lite ? 20 : 32);
  disposables.push(box, cyl, blob, torus);

  const part = (g, m, parent, s, p, r) => {
    const me = new THREE.Mesh(g, m);
    me.scale.set(...s);
    me.position.set(...p);
    if (r) me.rotation.set(...r);
    me.castShadow = shadows;
    me.receiveShadow = true;
    parent.add(me);
    return me;
  };

  // ─── 1. Wet Cobblestone Plaza Ground ───────────────────────────────────────────
  const size = lite ? 52 : 72;
  // Deep slate wet plaza plinth
  const groundMat = mat("#0d0f14", { roughness: 0.3, metalness: 0.2 });
  const plinth = new THREE.Mesh(box, groundMat);
  plinth.scale.set(size, 0.8, size);
  plinth.position.y = -0.8;
  plinth.receiveShadow = true;
  scene.add(plinth);
  disposables.push(groundMat);

  // Cobblestone paver banding & curbs
  const bandMat = mat("#171a22", { roughness: 0.38, metalness: 0.15 });
  for (let a = -size / 2 + 5; a < size / 2; a += 9) {
    part(box, bandMat, scene, [size, 0.02, 1.8], [0, 0, a]);
  }
  for (let b = -size / 2 + 5; b < size / 2; b += 9) {
    part(box, bandMat, scene, [1.8, 0.025, size], [b, 0, 0]);
  }

  // Plaza perimeter border curb
  const curbMat = mat("#222634", { roughness: 0.45, metalness: 0.1 });
  part(box, curbMat, scene, [size + 0.6, 0.12, 0.4], [0, -0.06, size / 2 + 0.2]);
  part(box, curbMat, scene, [size + 0.6, 0.12, 0.4], [0, -0.06, -size / 2 - 0.2]);
  part(box, curbMat, scene, [0.4, 0.12, size + 0.6], [size / 2 + 0.2, -0.06, 0]);
  part(box, curbMat, scene, [0.4, 0.12, size + 0.6], [-size / 2 - 0.2, -0.06, 0]);

  // ─── 2. Vintage Street Lamps ───────────────────────────────────────────────────
  const lampPositions = [
    [-14, 0, -10],
    [14, 0, -10],
    [-14, 0, 10],
    [14, 0, 10],
    [0, 0, 12],
    [0, 0, -14],
  ];
  const lampLights = [];

  lampPositions.forEach(([lx, ly, lz]) => {
    const lampG = new THREE.Group();
    // Base
    part(cyl, darkIron, lampG, [0.35, 0.4, 0.35], [0, 0.2, 0]);
    // Pole
    part(cyl, darkIron, lampG, [0.08, 4.4, 0.08], [0, 2.4, 0]);
    // Lantern crossarm
    part(box, darkIron, lampG, [0.9, 0.06, 0.06], [0, 4.1, 0]);
    // Lantern head
    part(box, darkIron, lampG, [0.36, 0.6, 0.36], [0, 4.5, 0]);
    part(blob, lanternGlow, lampG, [0.18, 0.24, 0.18], [0, 4.5, 0]);
    lampG.position.set(lx, ly, lz);
    scene.add(lampG);

    // Warm ambient point light for lamp
    const lLight = new THREE.PointLight("#ffb852", 0, 9, 2);
    lLight.position.set(lx, 4.3, lz);
    scene.add(lLight);
    lampLights.push(lLight);
  });

  // ─── 3. Detailed Carts ──────────────────────────────────────────────────────────
  const buildCart = ({ x, z, ry, theme, type, isHero = false, scale = 1 }) => {
    const g = new THREE.Group();
    const bodyMat = mat(theme.body, { roughness: isHero ? 0.22 : 0.35, metalness: isHero ? 0.15 : 0.05 });
    const whiteMat = mat(theme.accent, { roughness: 0.35 });

    // Main cart cabinet body
    part(box, bodyMat, g, [1.85, 0.92, 1.05], [0, 0.32, 0]);

    // Decorative lower trim
    part(box, isHero ? goldBrass : darkIron, g, [1.9, 0.06, 1.1], [0, 0.03, 0]);

    // Polished Wood Counter Top
    part(box, isHero ? walnutWood : whiteMat, g, [2.05, 0.08, 1.18], [0, 1.22, 0]);

    // Counter shelf / front sign board
    part(box, isHero ? chalkboard : whiteMat, g, [0.9, 0.46, 0.03], [0, 0.65, 0.54]);
    if (isHero) {
      part(box, goldBrass, g, [0.96, 0.52, 0.02], [0, 0.65, 0.53]);
    }

    // Canopy Brass / Iron Upright Poles
    const poleMat = isHero ? goldBrass : darkIron;
    const poleOffset = [[-0.88, -0.48], [0.88, -0.48], [-0.88, 0.48], [0.88, 0.48]];
    poleOffset.forEach(([px, pz]) => {
      part(cyl, poleMat, g, [0.032, 1.1, 0.032], [px, 1.76, pz]);
    });

    // Canopy Striped Awning with overhang
    const numStripes = 8;
    const stripeW = 2.1 / numStripes;
    for (let i = 0; i < numStripes; i++) {
      const sMat = i % 2 === 0 ? bodyMat : whiteMat;
      part(box, sMat, g, [stripeW, 0.06, 1.34], [-1.05 + (i + 0.5) * stripeW, 2.26, 0.02], [0.12, 0, 0]);
      // Scalloped awning front drape
      part(box, sMat, g, [stripeW, 0.18, 0.04], [-1.05 + (i + 0.5) * stripeW, 2.15, 0.66]);
    }
    // Awning rear header board
    part(box, bodyMat, g, [2.08, 0.28, 0.05], [0, 2.28, -0.62]);

    // Spoke Wheels with Rubber Tires & Brass Hubs
    const wheelZ = [-0.6, 0.6];
    wheelZ.forEach((wz) => {
      // Rubber tire
      part(torus, darkIron, g, [0.36, 0.36, 0.36], [0.45, 0.38, wz], [Math.PI / 2, 0, 0]);
      // Brass rim / hub
      part(cyl, isHero ? goldBrass : whiteMat, g, [0.14, 0.08, 0.14], [0.45, 0.38, wz], [Math.PI / 2, 0, 0]);
      // Spokes
      for (let s = 0; s < 4; s++) {
        part(box, isHero ? goldBrass : darkIron, g, [0.65, 0.018, 0.018], [0.45, 0.38, wz], [0, 0, (s * Math.PI) / 4]);
      }
    });

    // Handle bar
    part(cyl, isHero ? goldBrass : darkIron, g, [0.03, 0.95, 0.03], [-1.28, 1.05, 0], [0, 0, Math.PI / 2]);

    // ─── Products & Details ───
    if (type === "coffee") {
      // Espresso machine
      part(box, chrome, g, [0.55, 0.42, 0.38], [-0.3, 1.48, -0.05]);
      part(cyl, goldBrass, g, [0.05, 0.12, 0.05], [-0.3, 1.72, 0.08], [Math.PI / 4, 0, 0]);
      // Coffee cups
      [-0.1, 0.1, 0.28].forEach((cx, idx) => {
        part(cyl, whiteMat, g, [0.065, 0.12, 0.065], [cx, 1.34, 0.2 - idx * 0.08]);
      });
      // Whole bean bags
      part(box, mat("#c29d59", { roughness: 0.7 }), g, [0.18, 0.26, 0.12], [0.52, 1.42, 0.1]);
      part(box, mat("#8b6838", { roughness: 0.7 }), g, [0.18, 0.26, 0.12], [0.72, 1.42, 0.06]);
    } else if (type === "popcorn") {
      part(box, glassMat, g, [0.65, 0.55, 0.5], [-0.25, 1.55, 0]);
      part(box, mat("#c23a2b"), g, [0.68, 0.08, 0.53], [-0.25, 1.84, 0]);
      for (let i = 0; i < 7; i++) {
        part(blob, mat("#ffea9f"), g, [0.1, 0.1, 0.1], [-0.25 + (rand() - 0.5) * 0.4, 1.42 + (rand() * 0.25), (rand() - 0.5) * 0.35]);
      }
    } else if (type === "taco") {
      part(box, chrome, g, [0.75, 0.1, 0.48], [-0.2, 1.32, 0.05]);
      part(cyl, mat("#eab308"), g, [0.24, 0.06, 0.24], [-0.3, 1.42, 0.08], [Math.PI / 2, 0, 0]);
      part(cyl, mat("#eab308"), g, [0.24, 0.06, 0.24], [0.15, 1.42, 0.08], [Math.PI / 2, 0, 0]);
    } else if (type === "icecream") {
      part(box, whiteMat, g, [0.85, 0.38, 0.55], [-0.15, 1.46, 0]);
      ["#f472b6", "#fde047", "#6ee7b7"].forEach((c, i) => {
        part(blob, mat(c), g, [0.12, 0.12, 0.12], [-0.45 + i * 0.28, 1.74, 0]);
      });
    }

    // Condiment bottles / jars on side counter
    ["#ef4444", "#eab308", "#22c55e"].forEach((c, i) => {
      part(cyl, mat(c, { roughness: 0.3 }), g, [0.045, 0.22, 0.045], [0.72 + i * 0.11, 1.38, -0.22]);
    });

    // Hanging under-canopy lantern
    part(cyl, darkIron, g, [0.012, 0.32, 0.012], [0, 2.1, 0]);
    part(blob, warmLight, g, [0.14, 0.18, 0.14], [0, 1.95, 0]);

    if (isHero) {
      // Local PointLight right under the hero cart canopy
      const cartSpot = new THREE.PointLight("#ffaa44", 0, 4.5, 2);
      cartSpot.position.set(0, 1.9, 0.2);
      g.add(cartSpot);
      lampLights.push(cartSpot);

      // A-frame Chalkboard Menu Sign standing next to the cart
      const aFrame = new THREE.Group();
      part(box, chalkboard, aFrame, [0.48, 0.72, 0.02], [0, 0.44, 0.14], [-0.22, 0, 0]);
      part(box, chalkboard, aFrame, [0.48, 0.72, 0.02], [0, 0.44, -0.14], [0.22, 0, 0]);
      part(box, chalkFrame, aFrame, [0.54, 0.04, 0.04], [0, 0.82, 0]);
      part(cyl, chalkFrame, aFrame, [0.025, 0.88, 0.025], [-0.25, 0.44, 0.14], [-0.22, 0, 0]);
      part(cyl, chalkFrame, aFrame, [0.025, 0.88, 0.025], [0.25, 0.44, 0.14], [-0.22, 0, 0]);
      aFrame.position.set(1.4, 0, 1.1);
      aFrame.rotation.y = -0.55;
      g.add(aFrame);
    }

    g.position.set(x, 0, z);
    g.rotation.y = ry;
    g.scale.setScalar(scale);
    scene.add(g);
    return g;
  };

  // ─── 4. Market Grid Placement ───
  const STEP = 4.8;
  const R = lite ? 3 : 5;
  const PRODUCTS = ["coffee", "popcorn", "taco", "icecream"];

  for (let i = -R; i <= R; i++) {
    for (let j = -R; j <= R; j++) {
      if (Math.abs(i) <= 1 && Math.abs(j) <= 1) continue;
      if (rand() < 0.24) continue;
      const x = i * STEP + (rand() - 0.5) * 1.3;
      const z = j * STEP + (rand() - 0.5) * 1.3;
      const ry = Math.floor(rand() * 4) * (Math.PI / 2) + (rand() - 0.5) * 0.45;
      const theme = THEMES[Math.floor(rand() * THEMES.length)];
      const type = PRODUCTS[Math.floor(rand() * PRODUCTS.length)];
      buildCart({ x, z, ry, theme, type, scale: 0.95 });
    }
  }

  // Neighboring featured carts around hero
  buildCart({ x: -4.3, z: -1.4, ry: 0.38, theme: THEMES[1], type: "popcorn", scale: 1.0 });
  buildCart({ x: 4.5, z: -1.7, ry: -0.42, theme: THEMES[2], type: "taco", scale: 1.0 });
  buildCart({ x: 0.5, z: -4.8, ry: 0.05, theme: THEMES[3], type: "icecream", scale: 1.0 });

  // Hero Cart: StreetVendr Signature Coffee & Artisan Cart
  buildCart({ x: 0, z: 0, ry: 0, theme: THEMES[0], type: "coffee", isHero: true, scale: 1.2 });

  // ─── 5. String Lights Above Aisles ───
  const bulbs = [];
  for (let j = -R; j <= R; j += 2) {
    const z = j * STEP + STEP / 2;
    for (let x = -R * STEP; x <= R * STEP; x += 0.85) {
      bulbs.push([x, 3.25 + Math.sin(x * 0.65) * 0.2, z]);
    }
  }
  // Cross strings near hero
  for (let x = -3.8; x <= 3.8; x += 0.55) {
    bulbs.push([x, 3.35 - Math.cos(x * 0.42) * 0.45, 2.4]);
  }
  for (let z = -3.8; z <= 3.8; z += 0.55) {
    bulbs.push([1.8, 3.35 - Math.cos(z * 0.42) * 0.45, z]);
  }

  const bulbMesh = (m, list) => {
    if (!list.length) return;
    const im = new THREE.InstancedMesh(blob, m, list.length);
    const d = new THREE.Object3D();
    list.forEach(([x, y, z], k) => {
      d.position.set(x, y, z);
      d.scale.setScalar(0.065);
      d.updateMatrix();
      im.setMatrixAt(k, d.matrix);
    });
    scene.add(im);
    disposables.push(im);
  };
  bulbMesh(warmLight, bulbs.filter((_, k) => k % 3 === 0));
  bulbMesh(lateLight, bulbs.filter((_, k) => k % 3 !== 0));

  // ─── 6. Floating Golden Twilight Firefly Motes ───
  const particleCount = lite ? 60 : 130;
  const particleGeo = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  const particleInitialY = new Float32Array(particleCount);
  const particleSpeeds = new Float32Array(particleCount);

  for (let p = 0; p < particleCount; p++) {
    const px = (rand() - 0.5) * 28;
    const py = 0.4 + rand() * 5.2;
    const pz = (rand() - 0.5) * 28;
    particlePositions[p * 3] = px;
    particlePositions[p * 3 + 1] = py;
    particlePositions[p * 3 + 2] = pz;
    particleInitialY[p] = py;
    particleSpeeds[p] = 0.4 + rand() * 0.8;
  }
  particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

  const particleMat = new THREE.PointsMaterial({
    color: "#ffca68",
    size: lite ? 0.08 : 0.11,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending,
  });
  const fireflies = new THREE.Points(particleGeo, particleMat);
  scene.add(fireflies);
  disposables.push(particleGeo, particleMat);

  // ─── 7. Lighting System ───
  // Cart warm spill
  const spill = new THREE.PointLight("#ffb85d", 0, 10, 2);
  spill.position.set(0, 2.7, 1.6);
  scene.add(spill);

  // Cool twilight hemisphere (indigo sky vs dark ground)
  const hemi = new THREE.HemisphereLight("#9bb5ff", "#08090d", 0.85);
  scene.add(hemi);

  // Warm key light
  const key = new THREE.DirectionalLight("#fff3e0", 2.4);
  key.position.set(-12, 18, 14);
  if (shadows) {
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    Object.assign(key.shadow.camera, { left: -19, right: 19, top: 19, bottom: -19, near: 1, far: 65 });
    key.shadow.bias = -0.00035;
    key.shadow.radius = 3.5;
  }
  scene.add(key);

  // Deep twilight cyan/blue rim light
  const rim = new THREE.DirectionalLight("#3b82f6", 0.95);
  rim.position.set(14, 8, -16);
  scene.add(rim);

  return {
    setIntro(k) {
      warmLight.emissiveIntensity = 2.2 * k;
      spill.intensity = 7.5 * k;
      lampLights.forEach((l) => {
        l.intensity = 4.2 * k;
      });
    },
    setReveal(v) {
      lateLight.emissiveIntensity = 0.15 + v * 2.4;
      spill.intensity = Math.min(10, spill.intensity + v * 1.5);
    },
    update(t) {
      // Animate floating fireflies
      const pos = particleGeo.attributes.position.array;
      for (let p = 0; p < particleCount; p++) {
        const idx = p * 3;
        pos[idx + 1] = particleInitialY[p] + Math.sin(t * particleSpeeds[p] + p) * 0.35;
        pos[idx] += Math.sin(t * 0.2 + p) * 0.003;
      }
      particleGeo.attributes.position.needsUpdate = true;
      // Gentle twinkle on warm fairy lights
      warmLight.emissiveIntensity = 2.0 + Math.sin(t * 2.2) * 0.25;
    },
    dispose() {
      disposables.forEach((d) => d.dispose());
    },
  };
}