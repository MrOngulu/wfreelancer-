import { useEffect, useRef } from 'react';

/**
 * WFreelancers — Scroll-driven Three.js background
 *
 * The canvas is fixed, full-screen, behind everything.
 * It listens to window.scrollY and morphs through 5 states:
 *
 *  0  (Hero)          — Scattered geometric fragments orbiting loosely
 *  1  (Narrative)     — Fragments begin converging into a neural network lattice
 *  2  (Products)      — Lattice pulses with data-flow lines (circuit board energy)
 *  3  (Services)      — Network explodes outward into a particle field
 *  4  (Contact/End)   — Particles collapse into a single glowing core
 *
 * Each state transition is lerped smoothly so the change feels
 * continuous as the user scrolls, not discrete.
 */
export default function ScrollCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let THREE, renderer, scene, camera, animId;
    let scrollProgress = 0; // 0–1 across full page height
    let targetProgress = 0;

    // ── Shared geometry pools ──────────────────────────────────────────────
    let nodes = [];          // small sphere nodes
    let edges = [];          // line segments between nodes
    let particles = [];      // tiny dust particles
    let core;                // central glowing sphere
    let dataFlowLines = [];  // animated flow lines

    // ── Mouse parallax ─────────────────────────────────────────────────────
    let mouse = { x: 0, y: 0 };
    let targetMouse = { x: 0, y: 0 };
    const onMouseMove = (e) => {
      targetMouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    // ── Scroll tracking ─────────────────────────────────────────────────────
    const updateScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      targetProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };
    window.addEventListener('scroll', updateScroll, { passive: true });

    import('three').then((mod) => {
      THREE = mod;

      // ── Renderer ───────────────────────────────────────────────────────
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
      camera.position.z = 7;

      // ── Lights ─────────────────────────────────────────────────────────
      const ambient = new THREE.AmbientLight(0xffffff, 0.15);
      scene.add(ambient);

      const purpleLight = new THREE.PointLight(0x7b68ee, 4, 25);
      purpleLight.position.set(3, 3, 3);
      scene.add(purpleLight);

      const tealLight = new THREE.PointLight(0x1de9b6, 2.5, 20);
      tealLight.position.set(-3, -2, 2);
      scene.add(tealLight);

      const coreLight = new THREE.PointLight(0x9c8ff5, 0, 15);
      coreLight.position.set(0, 0, 0);
      scene.add(coreLight);

      // ── Build NODE network (neural lattice) ────────────────────────────
      const NODE_COUNT = 42;
      const nodeMat = new THREE.MeshPhongMaterial({
        color: 0x7b68ee, emissive: 0x3a2f88,
        shininess: 90, transparent: true, opacity: 0.75,
      });

      for (let i = 0; i < NODE_COUNT; i++) {
        const size = 0.04 + Math.random() * 0.1;
        const geo = new THREE.SphereGeometry(size, 6, 6);
        const mesh = new THREE.Mesh(geo, nodeMat.clone());

        // Scattered start position (state 0)
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const r = 2.5 + Math.random() * 3.5;
        mesh.position.set(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi) - 1
        );

        // Target position (state 2 — lattice)
        const lTheta = (i / NODE_COUNT) * Math.PI * 2;
        const lPhi = (Math.floor(i / 7) / 6) * Math.PI;
        const lR = 1.4 + (i % 3) * 0.6;
        const latticePos = new THREE.Vector3(
          lR * Math.sin(lPhi) * Math.cos(lTheta),
          lR * Math.sin(lPhi) * Math.sin(lTheta),
          lR * Math.cos(lPhi) - 0.5
        );

        // Target for collapse (state 4)
        const collapsePos = new THREE.Vector3(
          (Math.random() - 0.5) * 0.3,
          (Math.random() - 0.5) * 0.3,
          (Math.random() - 0.5) * 0.3
        );

        nodes.push({
          mesh,
          scatterPos: mesh.position.clone(),
          latticePos,
          collapsePos,
          speed: 0.003 + Math.random() * 0.005,
          floatPhase: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.02,
        });
        scene.add(mesh);
      }

      // ── Build EDGES (connections between nearby nodes) ─────────────────
      const edgeMat = new THREE.LineBasicMaterial({
        color: 0x7b68ee, transparent: true, opacity: 0,
      });

      for (let i = 0; i < NODE_COUNT; i++) {
        for (let j = i + 1; j < NODE_COUNT; j++) {
          if (Math.random() < 0.09) {
            const geo = new THREE.BufferGeometry().setFromPoints([
              nodes[i].mesh.position.clone(),
              nodes[j].mesh.position.clone(),
            ]);
            const line = new THREE.Line(geo, edgeMat.clone());
            edges.push({ line, a: i, b: j });
            scene.add(line);
          }
        }
      }

      // ── Data flow lines (animated dashes, circuit energy) ─────────────
      for (let i = 0; i < 12; i++) {
        const points = [];
        for (let p = 0; p < 8; p++) {
          points.push(new THREE.Vector3(
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 6,
            -1 + Math.random() * 2
          ));
        }
        const curve = new THREE.CatmullRomCurve3(points);
        const tubeGeo = new THREE.TubeGeometry(curve, 40, 0.008, 4, false);
        const tubeMat = new THREE.MeshBasicMaterial({
          color: i % 2 === 0 ? 0x1de9b6 : 0x7b68ee,
          transparent: true, opacity: 0,
        });
        const tube = new THREE.Mesh(tubeGeo, tubeMat);
        dataFlowLines.push({ mesh: tube, speed: 0.4 + Math.random() * 0.8, phase: Math.random() * Math.PI * 2 });
        scene.add(tube);
      }

      // ── Particle field ──────────────────────────────────────────────────
      const PARTICLE_COUNT = 200;
      const pPositions = new Float32Array(PARTICLE_COUNT * 3);
      const pBasePos = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const x = (Math.random() - 0.5) * 16;
        const y = (Math.random() - 0.5) * 12;
        const z = -3 + Math.random() * 4;
        pPositions[i * 3] = x;
        pPositions[i * 3 + 1] = y;
        pPositions[i * 3 + 2] = z;
        pBasePos.push(new THREE.Vector3(x, y, z));
      }
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
      const pMat = new THREE.PointsMaterial({
        color: 0x7b68ee, size: 0.03, transparent: true, opacity: 0,
      });
      const particleMesh = new THREE.Points(pGeo, pMat);
      scene.add(particleMesh);

      // ── Central core sphere ─────────────────────────────────────────────
      const coreGeo = new THREE.SphereGeometry(0.18, 32, 32);
      const coreMat = new THREE.MeshPhongMaterial({
        color: 0x9c8ff5, emissive: 0x7b68ee, shininess: 120,
        transparent: true, opacity: 0,
      });
      core = new THREE.Mesh(coreGeo, coreMat);
      scene.add(core);

      // ── Orbit rings (become visible on collapse) ───────────────────────
      const ringMats = [];
      for (let r = 0; r < 3; r++) {
        const rGeo = new THREE.TorusGeometry(0.35 + r * 0.28, 0.006, 8, 64);
        const rMat = new THREE.MeshBasicMaterial({
          color: r % 2 === 0 ? 0x7b68ee : 0x1de9b6,
          transparent: true, opacity: 0,
        });
        const ring = new THREE.Mesh(rGeo, rMat);
        ring.rotation.x = (r * Math.PI) / 3;
        ring.rotation.y = (r * Math.PI) / 5;
        ringMats.push({ mesh: ring, rotX: 0.004 + r * 0.003, rotY: 0.003 + r * 0.002 });
        scene.add(ring);
      }

      // ── Helper: lerp ───────────────────────────────────────────────────
      const lerp = (a, b, t) => a + (b - a) * t;
      const clamp01 = (v) => Math.max(0, Math.min(1, v));

      // ── Zone remapping ─────────────────────────────────────────────────
      // Break 0–1 scroll into 4 zones
      const zone = (progress, start, end) =>
        clamp01((progress - start) / (end - start));

      // ── Animate ────────────────────────────────────────────────────────
      let t = 0;
      const animate = () => {
        animId = requestAnimationFrame(animate);
        t += 0.01;

        // Smooth scroll progress
        scrollProgress += (targetProgress - scrollProgress) * 0.04;
        const p = scrollProgress;

        // Smooth mouse
        mouse.x += (targetMouse.x - mouse.x) * 0.05;
        mouse.y += (targetMouse.y - mouse.y) * 0.05;

        // ── Camera parallax ──────────────────────────────────────────────
        camera.position.x += (mouse.x * 0.4 - camera.position.x) * 0.05;
        camera.position.y += (mouse.y * 0.3 - camera.position.y) * 0.05;
        camera.lookAt(0, 0, 0);

        // ── Zone transitions ─────────────────────────────────────────────
        // Zone 0→1: scattered → converging (0 – 0.25)
        const z0 = zone(p, 0, 0.25);
        // Zone 1→2: converging → circuit pulse (0.25 – 0.5)
        const z1 = zone(p, 0.25, 0.5);
        // Zone 2→3: circuit → explosion (0.5 – 0.75)
        const z2 = zone(p, 0.5, 0.75);
        // Zone 3→4: explosion → collapse (0.75 – 1.0)
        const z3 = zone(p, 0.75, 1.0);

        // ── Update NODE positions ────────────────────────────────────────
        nodes.forEach((node, i) => {
          const m = node.mesh;
          const sp = node.scatterPos;
          const lp = node.latticePos;
          const cp = node.collapsePos;

          let tx, ty, tz;

          if (p < 0.5) {
            // Phase 1: scatter → lattice
            const blend = clamp01(z0 + z1);
            tx = lerp(sp.x, lp.x, blend);
            ty = lerp(sp.y, lp.y, blend) + Math.sin(t * 0.8 + node.floatPhase) * (0.06 * (1 - blend));
            tz = lerp(sp.z, lp.z, blend);
          } else if (p < 0.75) {
            // Phase 2: lattice held, pulse
            const pulse = Math.sin(t * 2 + i * 0.3) * 0.04 * z2;
            tx = lp.x + pulse;
            ty = lp.y + Math.sin(t * 1.5 + node.floatPhase) * 0.04;
            tz = lp.z + pulse * 0.5;
          } else {
            // Phase 3: explode outward then collapse
            const explodeOut = new THREE.Vector3(
              lp.x * (1 + z3 * 2.5) + (Math.random() - 0.5) * 0.02,
              lp.y * (1 + z3 * 2.5),
              lp.z * (1 + z3 * 2)
            );
            tx = lerp(explodeOut.x, cp.x, z3 * z3);
            ty = lerp(explodeOut.y, cp.y, z3 * z3);
            tz = lerp(explodeOut.z, cp.z, z3 * z3);
          }

          m.position.x += (tx - m.position.x) * 0.07;
          m.position.y += (ty - m.position.y) * 0.07;
          m.position.z += (tz - m.position.z) * 0.07;

          // Scale based on phase
          const targetScale = p > 0.75
            ? lerp(1, 0.1, z3 * z3)  // collapse → tiny
            : lerp(0.7, 1.2, clamp01(z0 + z1 * 0.5));
          m.scale.setScalar(m.scale.x + (targetScale - m.scale.x) * 0.06);

          // Color shift: purple → teal → amber
          if (p > 0.4 && p < 0.65) {
            m.material.color.setHex(0x1de9b6);
            m.material.emissive.setHex(0x0a6b50);
          } else if (p > 0.65) {
            m.material.color.setHex(0xffa040);
            m.material.emissive.setHex(0x7a3a00);
          } else {
            m.material.color.setHex(0x7b68ee);
            m.material.emissive.setHex(0x3a2f88);
          }

          m.rotation.x += node.rotSpeed;
          m.rotation.y += node.rotSpeed * 0.7;
        });

        // ── Update EDGES ─────────────────────────────────────────────────
        const edgeOpacity = clamp01(z0 * 2) * (1 - z2 * 0.7) * (1 - z3);
        edges.forEach(({ line, a, b }) => {
          const pa = nodes[a].mesh.position;
          const pb = nodes[b].mesh.position;
          const positions = line.geometry.attributes.position;
          positions.setXYZ(0, pa.x, pa.y, pa.z);
          positions.setXYZ(1, pb.x, pb.y, pb.z);
          positions.needsUpdate = true;
          line.material.opacity = edgeOpacity * 0.55;

          // Color edges in circuit phase
          if (p > 0.35 && p < 0.6) {
            line.material.color.setHex(0x1de9b6);
          } else {
            line.material.color.setHex(0x7b68ee);
          }
        });

        // ── Data flow tubes ──────────────────────────────────────────────
        const flowOpacity = clamp01(z1 * 2.5) * clamp01(1 - z2 * 2);
        dataFlowLines.forEach((fl, i) => {
          fl.mesh.material.opacity = flowOpacity * (0.3 + 0.3 * Math.sin(t * fl.speed + fl.phase));
          fl.mesh.rotation.z = t * 0.02 * (i % 2 === 0 ? 1 : -1);
        });

        // ── Particle field ────────────────────────────────────────────────
        const particleOpacity = z2 * (1 - z3 * 0.6);
        pMat.opacity = particleOpacity * 0.5;
        const pos = pGeo.attributes.position;
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const base = pBasePos[i];
          pos.setX(i, base.x + Math.sin(t * 0.3 + i) * 0.08 * z2);
          pos.setY(i, base.y + Math.cos(t * 0.4 + i * 0.5) * 0.06 * z2);
        }
        pos.needsUpdate = true;

        // ── Core + rings ──────────────────────────────────────────────────
        const coreOpacity = z3 * z3;
        core.material.opacity = coreOpacity;
        core.scale.setScalar(1 + Math.sin(t * 3) * 0.08 * z3);
        coreLight.intensity = z3 * 5;

        ringMats.forEach((r, i) => {
          r.mesh.material.opacity = coreOpacity * (0.6 + 0.3 * Math.sin(t + i));
          r.mesh.rotation.x += r.rotX;
          r.mesh.rotation.y += r.rotY;
        });

        // ── Global scene rotation (gentle drift) ─────────────────────────
        scene.rotation.y = mouse.x * 0.06 + t * 0.003;
        scene.rotation.x = mouse.y * 0.04;

        // ── Purple light breathe ──────────────────────────────────────────
        purpleLight.intensity = 3 + Math.sin(t * 1.2) * 1;
        tealLight.intensity = 2 + Math.sin(t * 0.8 + 1) * 0.8;

        renderer.render(scene, camera);
      };
      animate();

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }).catch(console.error);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', updateScroll);
      if (animId) cancelAnimationFrame(animId);
      if (renderer) renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
