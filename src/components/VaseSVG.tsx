import styles from './VaseSVG.module.css'

const VaseSVG = () => (
  <div className={styles.scene}>
    <svg
      className={styles.vase}
      viewBox="0 0 260 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Shadow */}
      <ellipse cx="130" cy="365" rx="70" ry="10" fill="rgba(44,44,44,0.08)" />

      {/* Vase body */}
      <path
        className={styles.body}
        d="M85 310 C60 305 45 285 42 260 C38 230 42 200 50 175 C40 160 38 140 42 125 C46 108 58 95 70 88 C78 84 90 80 100 78 L100 60 C100 55 115 48 130 48 C145 48 160 55 160 60 L160 78 C170 80 182 84 190 88 C202 95 214 108 218 125 C222 140 220 160 210 175 C218 200 222 230 218 260 C215 285 200 305 175 310 Z"
        fill="url(#vaseGradient)"
        stroke="rgba(139,111,71,0.15)"
        strokeWidth="1"
      />

      {/* Vase neck highlight */}
      <path
        d="M108 78 C108 78 108 65 110 62 C115 57 120 54 130 54 C140 54 145 57 150 62 C152 65 152 78 152 78"
        fill="url(#neckGradient)"
        opacity="0.6"
      />

      {/* Vase rim */}
      <ellipse cx="130" cy="58" rx="32" ry="12" fill="url(#rimGradient)" />
      <ellipse cx="130" cy="56" rx="28" ry="8" fill="url(#rimTopGradient)" />

      {/* Organic pattern on vase */}
      <path
        className={styles.pattern}
        d="M80 180 Q95 160 110 180 Q125 200 140 180 Q155 160 170 180"
        stroke="rgba(139,111,71,0.25)"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        className={styles.pattern}
        d="M75 210 Q90 190 105 210 Q120 230 135 210 Q150 190 165 210 Q175 225 178 230"
        stroke="rgba(139,111,71,0.2)"
        strokeWidth="1.5"
        fill="none"
      />
      <circle cx="105" cy="235" r="3" fill="rgba(196,112,74,0.3)" />
      <circle cx="130" cy="250" r="2" fill="rgba(196,112,74,0.3)" />
      <circle cx="155" cy="235" r="3" fill="rgba(196,112,74,0.3)" />

      {/* Gloss highlight */}
      <path
        d="M70 140 C68 155 68 170 72 185 C72 185 65 168 66 148 Z"
        fill="rgba(255,255,255,0.25)"
      />

      {/* Stems */}
      <g className={styles.stems}>
        <path d="M118 55 C116 35 108 15 100 -5" stroke="#5a7a5e" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M128 52 C128 30 128 10 126 -10" stroke="#5a7a5e" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M138 55 C140 32 148 12 152 -8" stroke="#5a7a5e" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M122 54 C118 38 110 28 98 20" stroke="#6b8f6f" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M134 53 C138 36 148 28 160 22" stroke="#6b8f6f" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </g>

      {/* Leaves */}
      <g className={styles.leaf1}>
        <path d="M100 -5 C100 -5 78 -20 72 -38 C68 -50 80 -60 96 -50 C108 -42 108 -20 100 -5Z"
          fill="#7a9e7e" />
        <path d="M100 -5 L80 -48" stroke="#5a7a5e" strokeWidth="1" opacity="0.5" />
      </g>

      <g className={styles.leaf2}>
        <path d="M126 -10 C126 -10 126 -36 130 -50 C133 -60 148 -62 150 -48 C152 -36 140 -18 126 -10Z"
          fill="#6b9e70" />
        <path d="M126 -10 L140 -50" stroke="#4a7a50" strokeWidth="1" opacity="0.5" />
      </g>

      <g className={styles.leaf3}>
        <path d="M152 -8 C152 -8 170 -22 178 -40 C183 -52 172 -62 158 -54 C146 -46 144 -24 152 -8Z"
          fill="#8aae8e" />
        <path d="M152 -8 L170 -46" stroke="#5a7a5e" strokeWidth="1" opacity="0.5" />
      </g>

      {/* Flowers */}
      <g className={styles.flower1}>
        <circle cx="98" cy="-55" r="10" fill="#e8c4a0" opacity="0.9" />
        {[0,60,120,180,240,300].map((deg, i) => (
          <ellipse
            key={i}
            cx={98 + 12 * Math.cos((deg * Math.PI) / 180)}
            cy={-55 + 12 * Math.sin((deg * Math.PI) / 180)}
            rx="6" ry="9"
            transform={`rotate(${deg} ${98 + 12 * Math.cos((deg * Math.PI) / 180)} ${-55 + 12 * Math.sin((deg * Math.PI) / 180)})`}
            fill="#f0d4b4"
            opacity="0.85"
          />
        ))}
        <circle cx="98" cy="-55" r="7" fill="#c4704a" />
        <circle cx="98" cy="-55" r="4" fill="#e8a078" />
      </g>

      <g className={styles.flower2}>
        <circle cx="130" cy="-68" r="9" fill="#d4b8e0" opacity="0.9" />
        {[0,72,144,216,288].map((deg, i) => (
          <ellipse
            key={i}
            cx={130 + 11 * Math.cos((deg * Math.PI) / 180)}
            cy={-68 + 11 * Math.sin((deg * Math.PI) / 180)}
            rx="5" ry="8"
            transform={`rotate(${deg} ${130 + 11 * Math.cos((deg * Math.PI) / 180)} ${-68 + 11 * Math.sin((deg * Math.PI) / 180)})`}
            fill="#e8ccf0"
            opacity="0.8"
          />
        ))}
        <circle cx="130" cy="-68" r="6" fill="#9a7ab0" />
        <circle cx="130" cy="-68" r="3" fill="#c4a0d8" />
      </g>

      <g className={styles.flower3}>
        <circle cx="160" cy="-52" r="8" fill="#f4e0b0" opacity="0.9" />
        {[0,60,120,180,240,300].map((deg, i) => (
          <ellipse
            key={i}
            cx={160 + 10 * Math.cos((deg * Math.PI) / 180)}
            cy={-52 + 10 * Math.sin((deg * Math.PI) / 180)}
            rx="5" ry="8"
            transform={`rotate(${deg} ${160 + 10 * Math.cos((deg * Math.PI) / 180)} ${-52 + 10 * Math.sin((deg * Math.PI) / 180)})`}
            fill="#faeec4"
            opacity="0.85"
          />
        ))}
        <circle cx="160" cy="-52" r="5" fill="#d4943c" />
        <circle cx="160" cy="-52" r="3" fill="#e8b86c" />
      </g>

      {/* Small buds */}
      <ellipse cx="112" cy="-28" rx="5" ry="8" fill="#a8c4aa" transform="rotate(-20 112 -28)" />
      <ellipse cx="148" cy="-30" rx="5" ry="8" fill="#b4d0b8" transform="rotate(20 148 -30)" />

      {/* Gradient definitions */}
      <defs>
        <linearGradient id="vaseGradient" x1="42" y1="180" x2="218" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#c4a882" />
          <stop offset="30%" stopColor="#d4b890" />
          <stop offset="60%" stopColor="#c8a870" />
          <stop offset="100%" stopColor="#a88a58" />
        </linearGradient>
        <linearGradient id="neckGradient" x1="108" y1="68" x2="152" y2="68" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#b89468" />
          <stop offset="50%" stopColor="#e8d4b4" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#b89468" />
        </linearGradient>
        <linearGradient id="rimGradient" x1="98" y1="58" x2="162" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#a88050" />
          <stop offset="50%" stopColor="#d4b880" />
          <stop offset="100%" stopColor="#a88050" />
        </linearGradient>
        <linearGradient id="rimTopGradient" x1="102" y1="56" x2="158" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#b89060" />
          <stop offset="50%" stopColor="#ecd8a8" />
          <stop offset="100%" stopColor="#b89060" />
        </linearGradient>
      </defs>
    </svg>
  </div>
)

export default VaseSVG
