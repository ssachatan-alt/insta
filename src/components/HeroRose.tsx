import React, { useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Sparkles, Layers } from 'lucide-react';
import { sound } from '../utils/audio';
import { SvgHeroRose } from './SvgHeroRose';

interface HeroRoseProps {
  onRoseTap?: () => void;
}

export const HeroRose: React.FC<HeroRoseProps> = ({ onRoseTap }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isBlooming, setIsBlooming] = useState(false);
  const [artMode, setArtMode] = useState<'editorial' | 'vector'>('editorial');
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);

  // Parallax motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for high-end organic feel
  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3D Parallax rotation
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const translateX = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);
  const translateY = useTransform(smoothY, [-0.5, 0.5], [-10, 10]);

  // Dynamic specular sheen coordinates
  const sheenX = useTransform(smoothX, [-0.5, 0.5], ['20%', '80%']);
  const sheenY = useTransform(smoothY, [-0.5, 0.5], ['20%', '80%']);

  // Handle desktop mouse movement
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    const x = e.clientX / innerWidth - 0.5;
    const y = e.clientY / innerHeight - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  // Handle mobile gyroscope tilt
  const handleDeviceOrientation = useCallback((e: DeviceOrientationEvent) => {
    if (e.gamma !== null && e.beta !== null) {
      const clampedGamma = Math.max(-30, Math.min(30, e.gamma)) / 30;
      const clampedBeta = Math.max(10, Math.min(60, e.beta) - 35) / 25;
      mouseX.set(clampedGamma * 0.5);
      mouseY.set(clampedBeta * 0.5);
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

  // Interactive tap / click on the rose
  const handleRoseClick = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    sound.playChime(783.99); // G5 crystal note
    setIsBlooming(true);
    setTimeout(() => setIsBlooming(false), 900);

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = 'clientX' in e ? e.clientX - rect.left : rect.width / 2;
    const clickY = 'clientY' in e ? e.clientY - rect.top : rect.height * 0.3;

    const newSparkles = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      x: clickX + (Math.random() - 0.5) * 80,
      y: clickY + (Math.random() - 0.5) * 80,
    }));

    setSparkles((prev) => [...prev.slice(-10), ...newSparkles]);
    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => !newSparkles.some((ns) => ns.id === s.id)));
    }, 1200);

    if (onRoseTap) {
      onRoseTap();
    }
  };

  const toggleArtMode = (e: React.MouseEvent) => {
    e.stopPropagation();
    sound.playChime(880);
    setArtMode((prev) => (prev === 'editorial' ? 'vector' : 'editorial'));
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center select-none"
      style={{ perspective: 1200 }}
    >
      {/* Dynamic Red Velvet Ambient Halo */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{
          repeat: Infinity,
          duration: 7,
          ease: 'easeInOut',
        }}
        className="absolute -top-12 w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] rounded-full pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(circle, rgba(225, 29, 72, 0.45) 0%, rgba(139, 0, 0, 0.22) 45%, transparent 70%)',
          filter: 'blur(45px)',
        }}
      />

      {/* Main 3D Interactive Parallax Container */}
      <motion.div
        initial={{ y: 70, opacity: 0, scale: 0.94 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          rotateX,
          rotateY,
          x: translateX,
          y: translateY,
          transformStyle: 'preserve-3d',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleRoseClick}
        className="relative cursor-pointer group touch-manipulation"
      >
        {/* Breathing idle float container */}
        <motion.div
          animate={{
            y: [-7, 7, -7],
            rotate: [-1.4, 1.4, -1.4],
          }}
          transition={{
            repeat: Infinity,
            duration: 6,
            ease: 'easeInOut',
          }}
          className="relative flex items-center justify-center"
        >
          {/* Hero Masking Card */}
          <div className="relative w-[280px] h-[360px] sm:w-[330px] sm:h-[430px] overflow-hidden rounded-[2.5rem] p-1">
            {/* Ambient Border Glow on hover */}
            <div
              className={`absolute inset-0 rounded-[2.5rem] transition-opacity duration-700 pointer-events-none ${
                isHovered ? 'opacity-100' : 'opacity-30'
              }`}
              style={{
                background: 'linear-gradient(145deg, rgba(255,26,64,0.3) 0%, rgba(223,186,115,0.2) 50%, rgba(139,0,0,0.1) 100%)',
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
                padding: '1px',
              }}
            />

            {/* Inner Content with AnimatePresence for Mode Switch */}
            <motion.div
              animate={{
                scale: isBlooming ? 1.045 : isHovered ? 1.025 : 1,
              }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
              }}
              className="relative w-full h-full rounded-[2.3rem] overflow-hidden bg-[#080808] flex items-center justify-center"
            >
              <AnimatePresence mode="wait">
                {artMode === 'editorial' ? (
                  <motion.div
                    key="editorial"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-full h-full"
                  >
                    <img
                      src="/rose-hero.jpg"
                      alt="Editorial Hand Holding Crimson Velvet Rose"
                      className="w-full h-full object-cover object-center filter contrast-[1.08] brightness-[0.98] transition-transform duration-700 ease-out"
                      draggable={false}
                      loading="eager"
                    />

                    {/* Edge Vignette to blend into deep obsidian */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          'radial-gradient(ellipse at 50% 45%, transparent 48%, rgba(8, 8, 8, 0.75) 82%, #080808 98%), linear-gradient(to bottom, rgba(8,8,8,0.2) 0%, transparent 20%, transparent 80%, #080808 100%)',
                      }}
                    />

                    {/* Dynamic Specular Light Flare tracking cursor / tilt */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none mix-blend-screen opacity-40 transition-opacity duration-500"
                      style={{
                        background: `radial-gradient(circle 180px at ${sheenX.get()} ${sheenY.get()}, rgba(255, 230, 235, 0.45) 0%, rgba(255, 26, 64, 0.2) 40%, transparent 70%)`,
                      }}
                    />

                    {/* Velvet Rose Heart Pulsing Glow */}
                    <motion.div
                      animate={{
                        opacity: [0.35, 0.7, 0.35],
                        scale: [0.95, 1.08, 0.95],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 4.5,
                        ease: 'easeInOut',
                      }}
                      className="absolute top-[18%] left-[28%] w-[130px] h-[130px] rounded-full pointer-events-none mix-blend-screen"
                      style={{
                        background: 'radial-gradient(circle, rgba(255, 36, 75, 0.5) 0%, rgba(139, 0, 0, 0.2) 50%, transparent 75%)',
                        filter: 'blur(20px)',
                      }}
                    />

                    {/* Dewdrop Glimmer Pinpoints */}
                    <div className="absolute top-[26%] left-[45%] w-1.5 h-1.5 rounded-full bg-white/90 shadow-[0_0_8px_#ffffff] animate-ping" style={{ animationDuration: '3.2s' }} />
                    <div className="absolute top-[32%] left-[38%] w-1 h-1 rounded-full bg-white/80 shadow-[0_0_6px_#ffffff] animate-pulse" style={{ animationDuration: '2.4s' }} />
                    <div className="absolute top-[22%] left-[54%] w-1 h-1 rounded-full bg-amber-100/90 shadow-[0_0_6px_#dfba73] animate-pulse" style={{ animationDuration: '4s' }} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="vector"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-full h-full p-4 flex items-center justify-center bg-radial from-[#1e070c] to-[#080808]"
                  >
                    <SvgHeroRose />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Interactive Badges at bottom of hero */}
          <div className="absolute -bottom-3 flex items-center gap-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.8 }}
              className="glass-pill px-3 py-1 rounded-full flex items-center gap-1.5 text-[10px] tracking-[0.22em] uppercase font-sans-clean text-[#dfba73]/85 pointer-events-none shadow-lg"
            >
              <Sparkles className="w-2.5 h-2.5 text-[#ff1a40] animate-spin" style={{ animationDuration: '8s' }} />
              <span>Touch to Bloom</span>
            </motion.div>

            {/* Discreet Art Mode Switcher */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleArtMode}
              title={`Switch to ${artMode === 'editorial' ? 'Vector SVG' : 'Editorial Film'} visual`}
              className="glass-pill px-2.5 py-1 rounded-full flex items-center gap-1 text-[10px] tracking-wider uppercase font-sans-clean text-slate-400 hover:text-white transition-colors"
            >
              <Layers className="w-2.5 h-2.5 text-rose-400" />
              <span>{artMode === 'editorial' ? 'Editorial' : 'Vector'}</span>
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* Sparkle Particle Bursts on Rose Tap */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          initial={{ opacity: 1, scale: 0, x: sparkle.x - 140, y: sparkle.y - 180 }}
          animate={{
            opacity: 0,
            scale: [0, 1.4, 0.2],
            y: sparkle.y - 230 - Math.random() * 40,
            x: sparkle.x - 140 + (Math.random() - 0.5) * 60,
          }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="absolute pointer-events-none z-30"
        >
          <div className="w-3 h-3 text-[#ff1a40] drop-shadow-[0_0_8px_#ff1a40]">
            ✦
          </div>
        </motion.div>
      ))}
    </div>
  );
};
