import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeDBrain() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // --- RENDERER SETUP ---
    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // --- SCENE & CAMERA ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 6.5;

    // --- CREATE GLOW TEXTURE PROGRAMMATICALLY ---
    // This creates a premium smooth circular glow for particles without external images
    const createGlowTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");

      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.2, "rgba(74, 138, 245, 0.8)");
      gradient.addColorStop(0.5, "rgba(18, 94, 242, 0.2)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);

      const texture = new THREE.CanvasTexture(canvas);
      return texture;
    };

    const particleTexture = createGlowTexture();

    // --- BRAIN MODEL PARTICLE GENERATION ---
    const particleCount = 180;
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const initialPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    // Color definitions based on Blue Brain design system
    const colorPrimary = new THREE.Color("#125EF2"); // Blue
    const colorSecondary = new THREE.Color("#00c6ff"); // Neon Cyan
    const colorMixed = new THREE.Color();

    for (let i = 0; i < particleCount; i++) {
      // Determine hemisphere/lobe: Left (-1) or Right (1)
      const lobe = Math.random() > 0.5 ? 1 : -1;

      // Spherical coordinates
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);

      // Math shape resembling brain lobes with organic convolutions
      const baseRadius = 1.35;
      const convolutions =
        0.35 * Math.sin(theta * 4) * Math.cos(phi * 4) +
        0.12 * Math.sin(theta * 10) * Math.sin(phi * 8);

      const r = (baseRadius + convolutions) * (0.6 + 0.4 * Math.random());

      // Cartesian coordinates
      let x = r * Math.sin(phi) * Math.cos(theta);
      let y = r * Math.cos(phi);
      let z = r * Math.sin(phi) * Math.sin(theta);

      // Morph to separate the two hemispheres and stretch along Z (front-back)
      x = x * 0.95 + lobe * 0.35;
      y = y * 0.9;
      z = z * 1.25;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      initialPositions[i * 3] = x;
      initialPositions[i * 3 + 1] = y;
      initialPositions[i * 3 + 2] = z;

      // Gentle movement speeds (wave frequencies)
      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;

      // Interpolate colors based on hemisphere and depth
      const mixRatio = Math.random();
      colorMixed.copy(colorPrimary).lerp(colorSecondary, mixRatio);

      colors[i * 3] = colorMixed.r;
      colors[i * 3 + 1] = colorMixed.g;
      colors[i * 3 + 2] = colorMixed.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Particle material
    const pointsMaterial = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const brainParticles = new THREE.Points(geometry, pointsMaterial);
    scene.add(brainParticles);

    // --- DYNAMIC NEURAL CONNECTIONS (LINES) ---
    const maxConnections = 450;
    const linePositions = new Float32Array(maxConnections * 2 * 3);
    const lineColors = new Float32Array(maxConnections * 2 * 3);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      linewidth: 1, // Only works on some platforms, standard is 1px
    });

    const brainLines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(brainLines);

    // --- INTERACTIVE SYSTEM CONTROLS ---
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      // Normalize mouse positions between -1 and 1
      mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const handleTouchMove = (event) => {
      if (event.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouseX = ((event.touches[0].clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -((event.touches[0].clientY - rect.top) / rect.height) * 2 + 1;
      }
    };

    const handleMouseLeave = () => {
      mouseX = 0;
      mouseY = 0;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("touchmove", handleTouchMove, { passive: true });
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("touchend", handleMouseLeave);

    // --- ANIMATION LOOP ---
    const clock = new THREE.Clock();

    const animate = () => {
      const requestID = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera interpolation towards mouse position (Parallax)
      targetX += (mouseX * 0.45 - targetX) * 0.05;
      targetY += (mouseY * 0.45 - targetY) * 0.05;

      brainParticles.rotation.y = elapsedTime * 0.12 + targetX;
      brainParticles.rotation.x = targetY;
      brainLines.rotation.y = elapsedTime * 0.12 + targetX;
      brainLines.rotation.x = targetY;

      // Update particle positions with dynamic waves
      const positionAttr = geometry.attributes.position;
      const posArray = positionAttr.array;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // Base coordinates
        const ix = initialPositions[i3];
        const iy = initialPositions[i3 + 1];
        const iz = initialPositions[i3 + 2];

        // Apply a multi-frequency wave morph (simulating active synapses)
        const waveX = Math.sin(elapsedTime * 1.5 + iy * 2) * 0.035;
        const waveY = Math.cos(elapsedTime * 1.2 + ix * 2) * 0.035;
        const waveZ = Math.sin(elapsedTime * 1.8 + iz * 2) * 0.035;

        // Subtle mouse pull effect if cursor is active
        let pullX = 0;
        let pullY = 0;
        let pullZ = 0;

        if (mouseX !== 0 || mouseY !== 0) {
          // Approximate mouse ray vector mapping
          const dx = posArray[i3] - targetX * 1.2;
          const dy = posArray[i3 + 1] - targetY * 1.2;
          const distSq = dx * dx + dy * dy;
          if (distSq < 1.5) {
            const pullFactor = (1.5 - distSq) * 0.04;
            pullX = dx * pullFactor;
            pullY = dy * pullFactor;
          }
        }

        posArray[i3] = ix + waveX + pullX;
        posArray[i3 + 1] = iy + waveY + pullY;
        posArray[i3 + 2] = iz + waveZ + pullZ;
      }
      positionAttr.needsUpdate = true;

      // DYNAMIC CONNECTIONS UPDATER
      // Recalculate synapses distance and rebuild line vertex buffer
      let lineIndex = 0;
      const maxDistance = 0.95; // Threshold radius for connection
      const linePosArray = lineGeometry.attributes.position.array;
      const lineColArray = lineGeometry.attributes.color.array;

      // Colors for connections (gradient blending)
      const colorLineStart = new THREE.Color("rgba(74, 138, 245, 0.4)");
      const colorLineEnd = new THREE.Color("rgba(0, 198, 255, 0.7)");

      for (let i = 0; i < particleCount; i++) {
        if (lineIndex >= maxConnections) break;

        const i3 = i * 3;
        const x1 = posArray[i3];
        const y1 = posArray[i3 + 1];
        const z1 = posArray[i3 + 2];

        // Compare against other particles (semi-dense grid check)
        for (let j = i + 1; j < particleCount; j++) {
          if (lineIndex >= maxConnections) break;

          const j3 = j * 3;
          const x2 = posArray[j3];
          const y2 = posArray[j3 + 1];
          const z2 = posArray[j3 + 2];

          const dx = x2 - x1;
          const dy = y2 - y1;
          const dz = z2 - z1;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxDistance) {
            const lIdx = lineIndex * 6;

            // Set positions for connection
            linePosArray[lIdx] = x1;
            linePosArray[lIdx + 1] = y1;
            linePosArray[lIdx + 2] = z1;
            linePosArray[lIdx + 3] = x2;
            linePosArray[lIdx + 4] = y2;
            linePosArray[lIdx + 5] = z2;

            // Dynamic fading colors based on distance
            const alpha = 1.0 - dist / maxDistance;
            const tempColor1 = colorLineStart.clone().lerp(colorLineEnd, alpha);

            lineColArray[lIdx] = tempColor1.r;
            lineColArray[lIdx + 1] = tempColor1.g;
            lineColArray[lIdx + 2] = tempColor1.b;
            lineColArray[lIdx + 3] = tempColor1.r;
            lineColArray[lIdx + 4] = tempColor1.g;
            lineColArray[lIdx + 5] = tempColor1.b;

            lineIndex++;
          }
        }
      }

      // Fill remaining line buffers with zero coordinates to hide them
      for (let k = lineIndex; k < maxConnections; k++) {
        const lIdx = k * 6;
        linePosArray[lIdx] = 0;
        linePosArray[lIdx + 1] = 0;
        linePosArray[lIdx + 2] = 0;
        linePosArray[lIdx + 3] = 0;
        linePosArray[lIdx + 4] = 0;
        linePosArray[lIdx + 5] = 0;
      }

      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;

      renderer.render(scene, camera);
    };

    let animationFrameID = requestAnimationFrame(animate);

    // --- RESIZE HANDLER ---
    const handleResize = () => {
      const newWidth = container.clientWidth || 360;
      const newHeight = container.clientHeight || 360;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    // --- CLEANUP ---
    return () => {
      cancelAnimationFrame(animationFrameID);
      resizeObserver.disconnect();
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("touchend", handleMouseLeave);
      
      // Clean up WebGL resources
      geometry.dispose();
      pointsMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      particleTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
    >
      <canvas ref={canvasRef} className="block w-full h-full outline-none" />
    </div>
  );
}
