import React from 'react';
import { motion } from 'framer-motion';

export const SvgHeroRose: React.FC = () => {
  return (
    <svg
      viewBox="0 0 320 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full filter drop-shadow-[0_15px_35px_rgba(255,26,64,0.35)]"
    >
      <defs>
        {/* Gradients */}
        <radialGradient id="roseCoreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff2a55" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#c00a2f" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#4c0011" stopOpacity="0.95" />
        </radialGradient>

        <linearGradient id="petalGradOuter" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff3360" />
          <stop offset="45%" stopColor="#b50e32" />
          <stop offset="100%" stopColor="#570417" />
        </linearGradient>

        <linearGradient id="petalGradMid" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#ff4d73" />
          <stop offset="50%" stopColor="#c8133b" />
          <stop offset="100%" stopColor="#6e051d" />
        </linearGradient>

        <linearGradient id="stemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1a3320" />
          <stop offset="40%" stopColor="#2d5236" />
          <stop offset="80%" stopColor="#122417" />
        </linearGradient>

        <linearGradient id="handGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f3d5c8" />
          <stop offset="40%" stopColor="#d8ab9a" />
          <stop offset="80%" stopColor="#966d5f" />
          <stop offset="100%" stopColor="#5a382d" />
        </linearGradient>

        <linearGradient id="goldRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff2cf" />
          <stop offset="40%" stopColor="#dfba73" />
          <stop offset="80%" stopColor="#9a752e" />
          <stop offset="100%" stopColor="#dfba73" />
        </linearGradient>

        <filter id="dewGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Stem */}
      <path
        d="M160 180 C159 230, 163 290, 166 380"
        stroke="url(#stemGrad)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* Rose Thorns */}
      <path d="M161 240 Q152 236 148 244 Q157 246 161 245 Z" fill="#2d5236" />
      <path d="M163 275 Q172 272 176 279 Q167 281 163 280 Z" fill="#2d5236" />
      {/* Leaves */}
      <path
        d="M162 205 C185 195 205 210 215 200 C205 220 185 225 162 215 Z"
        fill="url(#stemGrad)"
        opacity="0.9"
      />

      {/* Couture Hand gently holding stem */}
      <g>
        {/* Forearm & Wrist entering from bottom right */}
        <path
          d="M230 400 C220 350 205 320 185 305 C175 298 168 300 162 308 C158 314 156 325 158 340 C162 365 175 390 190 400 Z"
          fill="url(#handGrad)"
          opacity="0.85"
        />

        {/* Fingers curling around stem */}
        {/* Index Finger */}
        <path
          d="M182 290 C175 285 158 285 152 292 C148 297 150 304 158 305 C168 306 182 300 185 295 Z"
          fill="url(#handGrad)"
        />
        {/* Middle Finger with Golden Ring */}
        <path
          d="M185 302 C176 298 156 298 150 306 C146 312 149 318 156 319 C168 320 182 314 186 308 Z"
          fill="url(#handGrad)"
        />
        {/* Luxury Gold Ring */}
        <rect
          x="158"
          y="302"
          width="5"
          height="14"
          rx="2"
          fill="url(#goldRingGrad)"
          filter="url(#dewGlow)"
        />
        {/* Ring Finger */}
        <path
          d="M185 315 C176 312 158 312 153 320 C149 325 152 331 160 331 C170 331 183 326 186 321 Z"
          fill="url(#handGrad)"
          opacity="0.9"
        />
        {/* Thumb touching front */}
        <path
          d="M165 275 C162 268 155 268 152 276 C150 285 156 295 163 293 C168 291 167 282 165 275 Z"
          fill="url(#handGrad)"
        />
        {/* Ruby Red Stiletto Nails */}
        <path d="M148 293 Q144 293 145 297 Q148 298 150 295 Z" fill="#ff1a40" />
        <path d="M146 307 Q142 307 143 311 Q146 312 148 309 Z" fill="#ff1a40" />
      </g>

      {/* The Crimson Velvet Rose Head */}
      <g transform="translate(160, 140)">
        {/* Outer Back Petals */}
        <motion.path
          d="M-50 -20 C-65 -45, -30 -85, 0 -75 C30 -85, 65 -45, 50 -20 C60 15, 20 40, 0 35 C-20 40, -60 15, -50 -20 Z"
          fill="url(#petalGradOuter)"
        />

        {/* Outer Side Petals */}
        <path
          d="M-45 -10 C-70 -20, -55 -60, -20 -60 C-35 -35, -25 -10, -45 -10 Z"
          fill="url(#petalGradMid)"
        />
        <path
          d="M45 -10 C70 -20, 55 -60, 20 -60 C35 -35, 25 -10, 45 -10 Z"
          fill="url(#petalGradMid)"
        />

        {/* Lower Petal Cup */}
        <path
          d="M-35 5 C-25 35, 25 35, 35 5 C20 18, -20 18, -35 5 Z"
          fill="#ff244f"
        />

        {/* Mid Swirl Petals */}
        <path
          d="M-30 -35 C-45 -55, 0 -65, 25 -50 C-10 -55, -25 -45, -30 -35 Z"
          fill="#ff3b65"
        />
        <path
          d="M30 -35 C45 -55, 0 -65, -25 -50 C10 -55, 25 -45, 30 -35 Z"
          fill="#d9123c"
        />

        {/* Center Blooming Heart */}
        <circle cx="0" cy="-25" r="28" fill="url(#roseCoreGlow)" filter="url(#dewGlow)" />

        {/* Delicate Swirling Core Spirals */}
        <path
          d="M-15 -35 C-5 -50, 15 -45, 12 -30 C10 -18, -8 -20, -5 -30 C-3 -36, 6 -35, 5 -28"
          stroke="#ffe4e9"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.85"
        />
        <path
          d="M-8 -22 C-14 -12, 10 -8, 8 -20"
          stroke="#ff8ca3"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.9"
        />

        {/* Crystal Dewdrops with specular pinpoints */}
        <ellipse cx="-18" cy="-8" rx="2.5" ry="3.5" fill="#ffffff" opacity="0.9" />
        <circle cx="-17" cy="-9" r="1" fill="#ffffff" />
        <ellipse cx="22" cy="-15" rx="2" ry="3" fill="#ffffff" opacity="0.85" />
      </g>
    </svg>
  );
};
