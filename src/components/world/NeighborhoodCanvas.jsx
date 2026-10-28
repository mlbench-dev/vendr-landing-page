import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { buildWorld } from "./buildWorld";
import { SHOTS, LABELS, readAnchors, sample } from "./cameraPath";

const smooth = (a, b, v) => { const t = Math.min(1, Math.max(0, (v - a) / (b - a))); return t * t * (3 - 2 * t); };

export default function NeighborhoodCanvas() {
  const mount = useRef(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [chapter, setChapter] = useState("hero");

  useEffect(() => {
    const el = mount.current;
    const lite = window.innerWidth < 768;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: !lite, powerPreference: "high-performance" });
    } catch {
      setFailed(true);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, lite ? 1.25 : 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = !lite;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#08090a");
    scene.fog = new THREE.Fog("#08090a", 16, lite ? 44 : 62);
    const world = buildWorld(scene, { lite });
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 200);

    let anchors = [];
    const cur = { pos: new THREE.Vector3(...SHOTS.hero.pos), target: new THREE.Vector3(...SHOTS.hero.target) };
    const gp = new THREE.Vector3();
    const gt = new THREE.Vector3();
    const mouse = { x: 0, y: 0 };

    const resize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.fov = w / h < 1 ? 50 : 38;
      camera.updateProjectionMatrix();
      anchors = readAnchors();
    };
    const onMove = (e) => { mouse.x = e.clientX / window.innerWidth - 0.5; mouse.y = e.clientY / window.innerHeight - 0.5; };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    const ro = new ResizeObserver(() => { anchors = readAnchors(); });
    ro.observe(document.body);

    const clock = new THREE.Clock();
    let raf;
    let last = "";
    const tick = () => {
      const t = clock.getElapsedTime();
      const y = window.scrollY;
      const s = sample(anchors, y, reduced);
      gp.fromArray(s.pos);
      gt.fromArray(s.target);
      if (camera.aspect < 1) gp.sub(gt).multiplyScalar(1.5).add(gt);
      if (!reduced) {
        gp.x += Math.sin(t * 0.15) * 0.25 + mouse.x * 0.35;
        gp.y += Math.sin(t * 0.11) * 0.12 - mouse.y * 0.2;
      }
      const k = reduced ? 1 : 0.065;
      cur.pos.lerp(gp, k);
      cur.target.lerp(gt, k);
      camera.position.copy(cur.pos);
      camera.lookAt(cur.target);
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      world.setIntro(reduced ? 1 : smooth(0.2, 2.6, t));
      world.setReveal(smooth(0.6, 0.93, y / max));
      world.update?.(t);
      renderer.render(scene, camera);
      if (s.name !== last) { last = s.name; setChapter(s.name); }
      raf = requestAnimationFrame(tick);
    };
    tick();
    setReady(true);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      ro.disconnect();
      world.dispose();
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#08090a]" aria-hidden={false}>
      <div
        ref={mount}
        className={`absolute inset-0 transition-opacity duration-700 ${ready && !failed ? "opacity-100" : "opacity-0"}`}
      />
      <p className="sr-only" aria-live="polite">{LABELS[chapter]}</p>
    </div>
  );
}