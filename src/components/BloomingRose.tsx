import React, { useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { sound } from '../utils/audio';

interface BloomingRoseProps {
  onBloomTrigger?: () => void;
}

export const BloomingRose: React.FC<BloomingRoseProps> = ({ onBloomTrigger }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isBlooming, setIsBlooming] = useState(false);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);

  // Parallax motion tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 28, stiffness: 100 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-16, 16]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [14, -14]);
  const translateX = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);
  const translateY = useTransform(smoothY, [-0.5, 0.5], [-14, 14]);

  // Dynamic light sheen position
  const lightSheenX = useTransform(smoothX, [-0.5, 0.5], [20, 80]);
  const lightSheenY = useTransform(smoothY, [-0.5, 0.5], [15, 75]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    mouseX.set(e.clientX / innerWidth - 0.5);
    mouseY.set(e.clientY / innerHeight - 0.5);
  }, [mouseX, mouseY]);

  const handleDeviceOrientation = useCallback((e: DeviceOrientationEvent) => {
    if (e.gamma !== null && e.beta !== null) {
      const clampedGamma = Math.max(-30, Math.min(30, e.gamma)) / 30;
      const clampedBeta = Math.max(15, Math.min(65, e.beta) - 40) / 25;
      mouseX.set(clampedGamma * 0.6);
      mouseY.set(clampedBeta * 0.6);
    }
  }, [mouseX, mouseY]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleDeviceOrientation);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, [handleMouseMove, handleDeviceOrientation]);

  // Click / tap interaction to bloom
  const handleClick = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    sound.playChime(783.99); // G5 crystal note
    setIsBlooming(true);
    setTimeout(() => setIsBlooming(false), 1200);

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = 'clientX' in e ? e.clientX - rect.left : rect.width / 2;
    const clickY = 'clientY' in e ? e.clientY - rect.top : rect.height * 0.4;

    const newSparkles = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: clickX + (Math.random() - 0.5) * 100,
      y: clickY + (Math.random() - 0.5) * 100,
    }));

    setSparkles((prev) => [...prev.slice(-12), ...newSparkles]);
    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => !newSparkles.some((ns) => ns.id === s.id)));
    }, 1400);

    if (onBloomTrigger) {
      onBloomTrigger();
    }
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center select-none"
      style={{ perspective: 1200 }}
    >
      {/* Dynamic Velvet Red & Ruby Glow Aura behind the rose */}
      <motion.div
        animate={{
          scale: isBlooming ? [1, 1.3, 1.1] : [1, 1.14, 1],
          opacity: isBlooming ? [0.45, 0.75, 0.45] : [0.35, 0.5, 0.35],
        }}
        transition={{
          repeat: isBlooming ? 0 : Infinity,
          duration: isBlooming ? 1.2 : 7,
          ease: 'easeInOut',
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] h-[380px] sm:w-[500px] sm:h-[500px] rounded-full pointer-events-none -z-10"
        style={{
          background:
            'radial-gradient(circle, rgba(255, 26, 64, 0.4) 0%, rgba(180, 14, 45, 0.22) 40%, rgba(139, 0, 0, 0.1) 65%, transparent 75%)',
          filter: 'blur(55px)',
        }}
      />

      {/* Floating 3D Parallax Stage */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          rotateX,
          rotateY,
          x: translateX,
          y: translateY,
          transformStyle: 'preserve-3d',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        className="relative cursor-pointer group touch-manipulation"
      >
        {/* Soft Organic Idle Sway & Floating Wave */}
        <motion.div
          animate={{
            y: [-9, 9, -9],
            rotate: [-1.8, 1.8, -1.8],
          }}
          transition={{
            repeat: Infinity,
            duration: 6.5,
            ease: 'easeInOut',
          }}
          className="relative flex items-center justify-center w-[300px] h-[380px] sm:w-[360px] sm:h-[440px]"
        >
          {/* Main Procedural Blooming Rose Vector Artwork */}
          <motion.svg
            viewBox="0 0 400 480"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            animate={{
              scale: isBlooming ? 1.07 : isHovered ? 1.03 : 1,
            }}
            transition={{
              type: 'spring',
              stiffness: 220,
              damping: 18,
            }}
            className="w-full h-full filter drop-shadow-[0_20px_45px_rgba(255,26,64,0.4)]"
          >
            <defs>
              {/* Velvet Shading Gradients */}
              <radialGradient id="heartCoreGlow" cx="50%" cy="45%" r="55%">
                <stop offset="0%" stopColor="#ff4d73" stopOpacity="1" />
                <stop offset="35%" stopColor="#e11d48" stopOpacity="0.95" />
                <stop offset="70%" stopColor="#881337" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#30020a" stopOpacity="1" />
              </radialGradient>

              <radialGradient id="deepShadow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#1a0206" />
                <stop offset="70%" stopColor="#45030f" />
                <stop offset="100%" stopColor="#800a20" />
              </radialGradient>

              <linearGradient id="outerPetal1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff3360" />
                <stop offset="40%" stopColor="#be123c" />
                <stop offset="85%" stopColor="#500713" />
                <stop offset="100%" stopColor="#250208" />
              </linearGradient>

              <linearGradient id="outerPetal2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ff2a55" />
                <stop offset="45%" stopColor="#9f1239" />
                <stop offset="90%" stopColor="#40040f" />
              </linearGradient>

              <linearGradient id="midPetalGrad" x1="30%" y1="0%" x2="70%" y2="100%">
                <stop offset="0%" stopColor="#ff5277" />
                <stop offset="40%" stopColor="#d9123c" />
                <stop offset="80%" stopColor="#70061b" />
                <stop offset="100%" stopColor="#35030c" />
              </linearGradient>

              <linearGradient id="stemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0d2414" />
                <stop offset="45%" stopColor="#1e4428" />
                <stop offset="75%" stopColor="#285a35" />
                <stop offset="100%" stopColor="#0a1a0e" />
              </linearGradient>

              <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2d6a3f" />
                <stop offset="50%" stopColor="#1b4327" />
                <stop offset="100%" stopColor="#091a0f" />
              </linearGradient>

              {/* Specular Dewdrop Filter */}
              <filter id="dewFilter" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Velvet Texture Soft Glow */}
              <filter id="velvetGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="8" />
                <feOffset dx="0" dy="4" result="offsetblur" />
                <feFlood floodColor="#ff1a40" floodOpacity="0.35" />
                <feComposite in2="offsetblur" operator="in" />
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* 1. Stem and Botanical Calyx (with smooth fade-out into bottom obsidian) */}
            <g id="botanical-stem">
              {/* Deep Shadow Stem Silhouette */}
              <path
                d="M200 240 C198 290, 204 360, 200 480"
                stroke="url(#stemGrad)"
                strokeWidth="8"
                strokeLinecap="round"
              />

              {/* Subtle Stem Highlight Spine */}
              <path
                d="M202 245 C200 295, 206 365, 202 480"
                stroke="rgba(74, 222, 128, 0.15)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />

              {/* Organic Thorns */}
              <path d="M197 310 C186 304 180 316 182 318 C188 318 195 315 197 314 Z" fill="#1b4327" />
              <path d="M204 360 C215 354 221 366 219 368 C213 368 206 365 204 364 Z" fill="#1b4327" />

              {/* Elegant Velvet Leaves */}
              <motion.path
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.95 }}
                transition={{ duration: 1.6, delay: 0.4 }}
                d="M198 275 C160 260 130 280 115 270 C130 300 165 305 198 288 Z"
                fill="url(#leafGrad)"
              />
              <path
                d="M198 275 C160 260 130 280 115 270"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="1"
              />

              <motion.path
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.95 }}
                transition={{ duration: 1.6, delay: 0.6 }}
                d="M202 290 C240 278 270 295 285 285 C270 315 235 320 202 302 Z"
                fill="url(#leafGrad)"
              />
              <path
                d="M202 290 C240 278 270 295 285 285"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="1"
              />

              {/* Calyx Sepals cradling the rose head */}
              <path d="M194 235 C180 250 165 245 158 240 C170 255 188 252 196 242 Z" fill="#1b4327" />
              <path d="M206 235 C220 250 235 245 242 240 C230 255 212 252 204 242 Z" fill="#1b4327" />
            </g>

            {/* 2. The Royal Crimson Rose Head with Layered Blooming Petals */}
            <g id="rose-head" transform="translate(200, 160)" filter="url(#velvetGlow)">
              {/* Outer Deep Foundation Petals (Layer 1 - Outermost) */}
              <motion.path
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.4, delay: 0.2 }}
                d="M-85 10 C-115 -35, -80 -95, 0 -85 C80 -95, 115 -35, 85 10 C100 65, 35 95, 0 90 C-35 95, -100 65, -85 10 Z"
                fill="url(#outerPetal1)"
              />

              {/* Outer Left Grand Petal */}
              <motion.path
                initial={{ scale: 0.75, rotate: -8 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1.5, delay: 0.3 }}
                d="M-90 -10 C-110 -50, -70 -95, -20 -90 C-45 -50, -40 -10, -75 25 C-85 15, -90 5, -90 -10 Z"
                fill="url(#outerPetal2)"
              />

              {/* Outer Right Grand Petal */}
              <motion.path
                initial={{ scale: 0.75, rotate: 8 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1.5, delay: 0.35 }}
                d="M90 -10 C110 -50, 70 -95, 20 -90 C45 -50, 40 -10, 75 25 C85 15, 90 5, 90 -10 Z"
                fill="url(#outerPetal2)"
              />

              {/* Bottom Cupping Petal (Velvety Lip) */}
              <motion.path
                initial={{ scale: 0.8, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ duration: 1.4, delay: 0.4 }}
                d="M-65 30 C-40 85, 40 85, 65 30 C45 55, -45 55, -65 30 Z"
                fill="url(#midPetalGrad)"
              />
              {/* Petal Lip Fold Sheen */}
              <path
                d="M-58 35 C-35 70, 35 70, 58 35"
                stroke="rgba(255, 180, 200, 0.4)"
                strokeWidth="1.5"
                strokeLinecap="round"
              />

              {/* Mid Layer Swirling Petals (Layer 2) */}
              <motion.path
                initial={{ scale: 0.8, rotate: -5 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1.3, delay: 0.5 }}
                d="M-60 -40 C-85 -75, -20 -95, 20 -70 C-15 -75, -45 -60, -50 -40 Z"
                fill="#ff1a40"
              />

              <motion.path
                initial={{ scale: 0.8, rotate: 5 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1.3, delay: 0.55 }}
                d="M60 -40 C85 -75, 20 -95, -20 -70 C15 -75, 45 -60, 50 -40 Z"
                fill="#c8133b"
              />

              {/* Inner Swirl Petals (Layer 3) */}
              <motion.path
                initial={{ scale: 0.85 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2, delay: 0.65 }}
                d="M-45 -20 C-60 -55, 5 -65, 35 -40 C5 -50, -30 -40, -40 -20 Z"
                fill="#ff3360"
              />

              <motion.path
                initial={{ scale: 0.85 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2, delay: 0.7 }}
                d="M45 -20 C60 -55, -5 -65, -35 -40 C-5 -50, 30 -40, 40 -20 Z"
                fill="#a00c2a"
              />

              {/* Inner Heart Center (Velvet Core) */}
              <motion.ellipse
                initial={{ scale: 0.6 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2, delay: 0.75 }}
                cx="0"
                cy="-22"
                rx="42"
                ry="36"
                fill="url(#heartCoreGlow)"
              />

              {/* Concentric Tight Spiral Petals in Core */}
              <path
                d="M-22 -35 C-10 -55, 20 -50, 24 -30 C28 -12, -5 -8, -12 -22 C-16 -32, 12 -34, 12 -22"
                stroke="#ffe4e9"
                strokeWidth="2.8"
                strokeLinecap="round"
                opacity="0.9"
              />
              <path
                d="M-12 -22 C-20 -10, 15 -6, 12 -20"
                stroke="#ff8ca3"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.95"
              />
              <path
                d="M-5 -26 C0 -36, 10 -32, 8 -24"
                stroke="#ffffff"
                strokeWidth="1.8"
                strokeLinecap="round"
                opacity="0.9"
              />

              {/* Dynamic Specular Sheen (Reacts to cursor coordinates) */}
              <motion.circle
                cx={lightSheenX.get() - 50}
                cy={lightSheenY.get() - 50}
                r="35"
                fill="rgba(255, 255, 255, 0.12)"
                filter="url(#dewFilter)"
                className="pointer-events-none mix-blend-overlay"
              />

              {/* Glistening Crystal Dewdrops */}
              <g filter="url(#dewFilter)">
                {/* Dewdrop 1 - Left Outer */}
                <ellipse cx="-42" cy="12" rx="3.5" ry="4.5" fill="#ffffff" opacity="0.95" />
                <circle cx="-41" cy="10.5" r="1.2" fill="#ffffff" />
                <ellipse cx="-42" cy="13" rx="2" ry="1" fill="rgba(0,0,0,0.3)" />

                {/* Dewdrop 2 - Right Fold */}
                <ellipse cx="38" cy="-5" rx="3" ry="4" fill="#ffffff" opacity="0.9" />
                <circle cx="39" cy="-6" r="1" fill="#ffffff" />

                {/* Dewdrop 3 - Bottom Lip */}
                <ellipse cx="6" cy="48" rx="3" ry="3.5" fill="#ffffff" opacity="0.92" />
                <circle cx="7" cy="47" r="1" fill="#ffffff" />

                {/* Micro Dewdrop pinpoints */}
                <circle cx="-18" cy="-42" r="1.2" fill="#ffffff" opacity="0.85" />
                <circle cx="22" cy="-35" r="1.5" fill="#ffffff" opacity="0.9" />
                <circle cx="-8" cy="28" r="1" fill="#ffffff" opacity="0.8" />
              </g>

              {/* Glimmer Twinkles */}
              <circle cx="-42" cy="10.5" r="1.5" fill="#ffffff" className="animate-ping" style={{ animationDuration: '3s' }} />
              <circle cx="39" cy="-6" r="1.5" fill="#ffffff" className="animate-pulse" style={{ animationDuration: '2.2s' }} />
            </g>
          </motion.svg>
        </motion.div>
      </motion.div>

      {/* Floating Sparkle Stars on Tap */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          initial={{ opacity: 1, scale: 0, x: sparkle.x - 150, y: sparkle.y - 190 }}
          animate={{
            opacity: 0,
            scale: [0, 1.5, 0.3],
            y: sparkle.y - 250 - Math.random() * 50,
            x: sparkle.x - 150 + (Math.random() - 0.5) * 80,
          }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          className="absolute pointer-events-none z-30"
        >
          <div className="w-3.5 h-3.5 text-[#ff1a40] drop-shadow-[0_0_10px_#ff1a40]">
            ✦
          </div>
        </motion.div>
      ))}
    </div>
  );
};
