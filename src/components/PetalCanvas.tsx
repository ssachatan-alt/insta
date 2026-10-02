import React, { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  angle: number;
  spinSpeed: number;
  tumbleAngle: number;
  tumbleSpeed: number;
  oscillationSpeed: number;
  oscillationDistance: number;
  timeOffset: number;
  opacity: number;
  depth: number; // 0: far (blurred), 1: mid (sharp), 2: close (bokeh blurred)
  blur: number;
  colorGrade: number; // slight variation in ruby hue
}

interface PetalCanvasProps {
  burstTrigger?: number;
}

export const PetalCanvas: React.FC<PetalCanvasProps> = ({ burstTrigger }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const petalsRef = useRef<Petal[]>([]);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse / Touch interaction for petal breeze
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, active: true };
      }
    };

    const handlePointerLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('mouseleave', handlePointerLeave);

    // Initialize 24-30 high quality petals
    const createPetal = (startY?: number): Petal => {
      const depth = Math.random() < 0.35 ? 0 : Math.random() < 0.75 ? 1 : 2;
      let size = 12 + Math.random() * 14;
      let blur = 0;
      let opacity = 0.85;

      if (depth === 0) {
        // Far away: small, slow, soft blur
        size = 7 + Math.random() * 8;
        blur = 2.5;
        opacity = 0.45;
      } else if (depth === 2) {
        // Foreground bokeh: large, fast, cinematic lens blur
        size = 22 + Math.random() * 18;
        blur = 4;
        opacity = 0.65;
      }

      return {
        x: Math.random() * width,
        y: startY !== undefined ? startY : Math.random() * height - 50,
        size,
        speedY: (0.6 + Math.random() * 1.2) * (depth === 0 ? 0.6 : depth === 2 ? 1.4 : 1),
        speedX: -0.3 + Math.random() * 0.6,
        angle: Math.random() * Math.PI * 2,
        spinSpeed: (Math.random() - 0.5) * 0.03,
        tumbleAngle: Math.random() * Math.PI * 2,
        tumbleSpeed: 0.015 + Math.random() * 0.03,
        oscillationSpeed: 0.02 + Math.random() * 0.02,
        oscillationDistance: 0.8 + Math.random() * 1.5,
        timeOffset: Math.random() * 100,
        opacity,
        depth,
        blur,
        colorGrade: Math.random(),
      };
    };

    const petalCount = window.innerWidth < 640 ? 18 : 28;
    petalsRef.current = Array.from({ length: petalCount }, () => createPetal());

    // Draw single stylized organic rose petal
    const drawPetal = (
      context: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      angle: number,
      tumbleScale: number,
      opacity: number,
      blur: number,
      colorGrade: number
    ) => {
      context.save();
      context.translate(x, y);
      context.rotate(angle);
      context.scale(1, Math.max(0.12, Math.abs(tumbleScale)));

      if (blur > 0) {
        context.filter = `blur(${blur}px)`;
      }

      // Organic curved petal path
      context.beginPath();
      context.moveTo(0, -size);
      context.bezierCurveTo(size * 0.8, -size * 0.7, size * 0.9, size * 0.4, 0, size);
      context.bezierCurveTo(-size * 0.9, size * 0.4, -size * 0.8, -size * 0.7, 0, -size);
      context.closePath();

      // Velvet gradient
      const grad = context.createLinearGradient(-size * 0.5, -size, size * 0.5, size);
      if (colorGrade > 0.6) {
        grad.addColorStop(0, `rgba(255, 36, 75, ${opacity})`); // vivid crimson
        grad.addColorStop(0.5, `rgba(180, 14, 45, ${opacity * 0.95})`); // deep ruby
        grad.addColorStop(1, `rgba(80, 5, 20, ${opacity * 0.9})`); // obsidian velvet
      } else {
        grad.addColorStop(0, `rgba(225, 29, 72, ${opacity})`);
        grad.addColorStop(0.6, `rgba(136, 19, 55, ${opacity * 0.95})`);
        grad.addColorStop(1, `rgba(60, 4, 15, ${opacity * 0.9})`);
      }

      context.fillStyle = grad;
      context.fill();

      // Subtle velvety specular sheen on folded edge
      context.beginPath();
      context.moveTo(0, -size * 0.85);
      context.quadraticCurveTo(size * 0.4, 0, 0, size * 0.85);
      context.strokeStyle = `rgba(255, 180, 195, ${opacity * 0.25})`;
      context.lineWidth = 1;
      context.stroke();

      context.restore();
    };

    let tick = 0;

    const render = () => {
      tick += 0.016;
      ctx.clearRect(0, 0, width, height);

      // Global soft wind breeze oscillation
      const wind = Math.sin(tick * 0.7) * 0.6;

      const petals = petalsRef.current;
      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];

        // Motion physics
        p.timeOffset += p.oscillationSpeed;
        const sway = Math.sin(p.timeOffset) * p.oscillationDistance;

        p.y += p.speedY;
        p.x += p.speedX + wind + sway;
        p.angle += p.spinSpeed;
        p.tumbleAngle += p.tumbleSpeed;

        // Interactive mouse / touch deflection
        if (mouseRef.current.active) {
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const force = (1 - dist / 140) * 2.2;
            p.x += (dx / dist) * force * 3;
            p.y += (dy / dist) * force * 2;
          }
        }

        // Tumble scale simulates 3D turning
        const tumbleScale = Math.cos(p.tumbleAngle);

        drawPetal(
          ctx,
          p.x,
          p.y,
          p.size,
          p.angle,
          tumbleScale,
          p.opacity,
          p.blur,
          p.colorGrade
        );

        // Respawn when falling past bottom or side
        if (p.y > height + 60 || p.x < -80 || p.x > width + 80) {
          petals[i] = createPetal(-40);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, []);

  // Burst effect when burstTrigger updates
  useEffect(() => {
    if (!burstTrigger) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height * 0.45;

    // Spawn 14 burst petals radiating from the rose
    const burstPetals: Petal[] = Array.from({ length: 14 }, (_, idx) => {
      const angle = (idx / 14) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const speed = 2.5 + Math.random() * 4;
      return {
        x: centerX + Math.cos(angle) * 20,
        y: centerY + Math.sin(angle) * 20,
        size: 14 + Math.random() * 12,
        speedY: Math.sin(angle) * speed + 1,
        speedX: Math.cos(angle) * speed,
        angle: Math.random() * Math.PI * 2,
        spinSpeed: (Math.random() - 0.5) * 0.08,
        tumbleAngle: Math.random() * Math.PI * 2,
        tumbleSpeed: 0.04 + Math.random() * 0.04,
        oscillationSpeed: 0.03,
        oscillationDistance: 1.2,
        timeOffset: Math.random() * 100,
        opacity: 0.95,
        depth: 1,
        blur: Math.random() < 0.3 ? 1.5 : 0,
        colorGrade: Math.random(),
      };
    });

    petalsRef.current.push(...burstPetals);

    // Keep array bounded
    if (petalsRef.current.length > 50) {
      petalsRef.current = petalsRef.current.slice(-40);
    }
  }, [burstTrigger]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10 w-full h-full"
      style={{ touchAction: 'none' }}
    />
  );
};
