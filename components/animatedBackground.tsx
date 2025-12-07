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
    const connections: {
      path: number[];
      progress: number;
      speed: number;
      color: string;
    }[] = [];

    // Create nodes
    for (let i = 0; i < 50; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    // Create multi-node connections

    for (let i = 0; i < 20; i++) {
      const pathLength = Math.floor(Math.random() * 3) + 2; // 2-4 nodes per path
      const path: number[] = [];
      let currentNode = Math.floor(Math.random() * nodes.length);

      for (let j = 0; j < pathLength; j++) {
        path.push(currentNode);
        // Find nearest node that's not already in path
        let nearestNode = -1;
        let minDistance = Infinity;

        for (let k = 0; k < nodes.length; k++) {
          if (!path.includes(k)) {
            const dx = nodes[k].x - nodes[currentNode].x;
            const dy = nodes[k].y - nodes[currentNode].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < minDistance && distance < 200) {
              minDistance = distance;
              nearestNode = k;
            }
          }
        }

        if (nearestNode === -1) break;
        currentNode = nearestNode;
      }

      if (path.length > 1) {
        connections.push({
          path,
          progress: 0,
          speed: 0.001 + Math.random() * 0.002,
          color: "rgba(100, 200, 255, ",
        });
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

      // Draw multi-node connections
      connections.forEach((conn) => {
        conn.progress += conn.speed;
        if (conn.progress > 1) conn.progress = 0;

        // Calculate position along the path
        const totalSegments = conn.path.length - 1;
        const currentSegment = Math.floor(conn.progress * totalSegments);
        const segmentProgress = (conn.progress * totalSegments) % 1;

        if (currentSegment < totalSegments) {
          const fromNode = nodes[conn.path[currentSegment]];
          const toNode = nodes[conn.path[currentSegment + 1]];

          const x = fromNode.x + (toNode.x - fromNode.x) * segmentProgress;
          const y = fromNode.y + (toNode.y - fromNode.y) * segmentProgress;

          // Draw traveling particle
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fillStyle = conn.color + (1 - conn.progress) + ")";
          ctx.fill();
          ctx.shadowColor = conn.color + "1)";
          ctx.shadowBlur = 10;

          // Draw trail behind particle
          ctx.beginPath();
          ctx.moveTo(fromNode.x, fromNode.y);
          ctx.lineTo(x, y);
          ctx.strokeStyle = conn.color + 0.3 * (1 - conn.progress) + ")";
          ctx.lineWidth = 2;
          ctx.stroke();

          // Draw faint connection lines between all nodes in path
          for (let i = 0; i < conn.path.length - 1; i++) {
            const nodeA = nodes[conn.path[i]];
            const nodeB = nodes[conn.path[i + 1]];
            const dx = nodeB.x - nodeA.x;
            const dy = nodeB.y - nodeA.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 200) {
              ctx.beginPath();
              ctx.moveTo(nodeA.x, nodeA.y);
              ctx.lineTo(nodeB.x, nodeB.y);
              ctx.strokeStyle = conn.color + "0.1)";
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
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
