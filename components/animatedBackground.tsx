"use client";

import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const nodes: { x: number; y: number; vx: number; vy: number }[] = [];
    const connections: { from: number; to: number; progress: number }[] = [];

    // Create nodes
    for (let i = 0; i < 50; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    // Create connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (Math.random() < 0.1) {
          connections.push({ from: i, to: j, progress: Math.random() });
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update nodes
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      });

      // Draw connections
      connections.forEach((conn) => {
        const from = nodes[conn.from];
        const to = nodes[conn.to];

        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          conn.progress += 0.01;
          if (conn.progress > 1) conn.progress = 0;

          const x = from.x + dx * conn.progress;
          const y = from.y + dy * conn.progress;

          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 255, 255, ${1 - conn.progress})`;
          ctx.fill();

          ctx.beginPath();
          ctx.moveTo(from.x, from.y);
          ctx.lineTo(x, y);
          ctx.strokeStyle = `rgba(0, 255, 255, ${0.3 * (1 - conn.progress)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      // Draw nodes
      nodes.forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 255, 255, 0.8)";
        ctx.fill();
        ctx.shadowColor = "cyan";
        ctx.shadowBlur = 10;
      });

      requestAnimationFrame(animate);
    };

    animate();

    let resizeTimeout: NodeJS.Timeout;

    const handleResize = () => {
      // Clear previous timeout
      clearTimeout(resizeTimeout);

      // Update canvas size immediately
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Wait for user to stop resizing before redistributing nodes
      resizeTimeout = setTimeout(() => {
        // Redistribute nodes evenly across new canvas size
        nodes.forEach((node) => {
          node.x = Math.random() * canvas.width;
          node.y = Math.random() * canvas.height;
        });
      }, 100); // Wait 300ms after resize stops
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background:
          "linear-gradient(135deg, #000000 0%, #0a0a1e 50%, #0a0a2e 100%)",
      }}
    />
  );
}
