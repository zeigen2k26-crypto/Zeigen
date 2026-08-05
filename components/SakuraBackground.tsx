"use client";

import React, { useEffect, useRef } from "react";

interface SakuraPetal {
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  speedX: number;
  speedY: number;
  opacity: number;
  wobble: number;
  wobbleSpeed: number;
  wobbleAmt: number;
  color: string;
}

const PETAL_COLORS = [
  "#F5B7C4", // sakura pink
  "#FDEEF3", // pale blush
  "#F8D7DA", // rose
  "#EDD5E5", // lavender pink
  "#FAC8D4", // warm pink
];

function drawPetal(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  rotation: number,
  color: string,
  alpha: number
) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.translate(x, y);
  ctx.rotate(rotation);

  // Draw 5-petal flower
  for (let i = 0; i < 5; i++) {
    ctx.save();
    ctx.rotate((i * 2 * Math.PI) / 5);
    ctx.beginPath();
    ctx.ellipse(0, -size * 0.55, size * 0.28, size * 0.52, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Soft center
  ctx.beginPath();
  ctx.arc(0, 0, size * 0.18, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255,240,245,0.8)";
  ctx.fill();

  ctx.restore();
}

export default function SakuraBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = width < 768;
    const petalCount = isMobile ? 28 : 55;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Mouse influence
    const mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Initialize petals
    const petals: SakuraPetal[] = Array.from({ length: petalCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height - height, // start above viewport
      size: Math.random() * 6 + 4,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.018,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: Math.random() * 0.8 + 0.4,
      opacity: Math.random() * 0.55 + 0.25,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.012 + 0.005,
      wobbleAmt: Math.random() * 0.6 + 0.2,
      color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
    }));

    let step = 0;
    const render = () => {
      step += 1;
      ctx.clearRect(0, 0, width, height);

      for (const p of petals) {
        // Wind oscillation
        p.wobble += p.wobbleSpeed;
        const windX = Math.sin(p.wobble) * p.wobbleAmt;

        // Gentle mouse repulsion
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const force = (100 - dist) / 100;
          p.x -= (dx / dist) * force * 1.2;
          p.y -= (dy / dist) * force * 0.6;
        }

        p.x += p.speedX + windX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        // Wrap when off screen
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 10;
        if (p.x > width + 20) p.x = -10;

        // Gentle opacity pulse
        const opacityVariation = Math.sin(step * 0.008 + p.wobble) * 0.08;
        drawPetal(ctx, p.x, p.y, p.size, p.rotation, p.color, Math.max(0.08, Math.min(0.85, p.opacity + opacityVariation)));
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
