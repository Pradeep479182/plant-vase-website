import { useState, useRef, useEffect } from 'react'
import styles from './Collection.module.css'

const products = [
  {
    id: 1,
    name: 'Moonrise Vessel',
    subtitle: 'Ash glaze series',
    price: '$145',
    tag: 'Bestseller',
    color: '#d4b890',
    accent: '#8b6f47',
    height: '28 cm',
  },
  {
    id: 2,
    name: 'Forest Amphora',
    subtitle: 'Celadon series',
    price: '$220',
    tag: 'New',
    color: '#8aae8e',
    accent: '#4a7a50',
    height: '38 cm',
  },
  {
    id: 3,
    name: 'Ember Bottle',
    subtitle: 'Iron oxide series',
    price: '$165',
    tag: null,
    color: '#c4704a',
    accent: '#8a3a1a',
    height: '22 cm',
  },
  {
    id: 4,
    name: 'Dusk Pillar',
    subtitle: 'Raku series',
    price: '$195',
    tag: 'Limited',
    color: '#9a8ab0',
    accent: '#5a4a70',
    height: '45 cm',
  },
]

const ProductCard = ({ p, idx }: { p: typeof products[0]; idx: number }) => {
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className={`${styles.card} animate-fadeUp`} style={{ animationDelay: `${idx * 0.15}s` }}>
      <div className={styles.imageWrap} style={{ background: `linear-gradient(145deg, ${p.color}22, ${p.color}44)` }}>
        {p.tag && <span className={styles.tag}>{p.tag}</span>}
        <MiniVase color={p.color} accent={p.accent} />
        <div className={styles.overlay}>
          <button className={styles.quickAdd} onClick={handleAdd} data-hover="true">
            {added ? '✓ Added' : 'Quick Add'}
          </button>
          <button className={styles.wishlist} aria-label="Add to wishlist">♡</button>
        </div>
      </div>
      <div className={styles.info}>
        <div>
          <h3 className={styles.name}>{p.name}</h3>
          <p className={styles.sub}>{p.subtitle} · {p.height}</p>
        </div>
        <p className={styles.price}>{p.price}</p>
      </div>
    </div>
  )
}

const MiniVase = ({ color, accent }: { color: string; accent: string }) => (
  <svg viewBox="0 0 140 220" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.miniVase}>
    <path
      d="M45 185 C30 180 22 162 20 142 C18 118 24 95 32 82 C26 72 25 58 28 48 C31 38 40 30 50 27 L50 18 C50 15 62 10 70 10 C78 10 90 15 90 18 L90 27 C100 30 109 38 112 48 C115 58 114 72 108 82 C116 95 122 118 120 142 C118 162 110 180 95 185 Z"
      fill={color}
      opacity="0.85"
    />
    <path
      d="M45 185 C30 180 22 162 20 142 C18 118 24 95 32 82 C26 72 25 58 28 48 C31 38 40 30 50 27 L50 18 C50 15 62 10 70 10 C78 10 90 15 90 18 L90 27 C100 30 109 38 112 48 C115 58 114 72 108 82 C116 95 122 118 120 142 C118 162 110 180 95 185 Z"
      stroke={accent}
      strokeWidth="1.5"
      fill="none"
      opacity="0.4"
    />
    {/* Stem */}
    <path d="M70 10 L70 -30" stroke={accent} strokeWidth="2" strokeLinecap="round" />
    {/* Leaves */}
    <path d="M70 -10 C70 -10 52 -20 48 -34 C46 -44 56 -50 66 -42 C72 -36 72 -20 70 -10Z" fill={color} opacity="0.7" />
    <path d="M70 -18 C70 -18 88 -28 92 -42 C94 -52 84 -58 74 -50 C68 -44 68 -28 70 -18Z" fill={accent} opacity="0.5" />
    {/* Flower */}
    <circle cx="70" cy="-35" r="6" fill={color} />
    {[0,72,144,216,288].map((deg, i) => (
      <ellipse
        key={i}
        cx={70 + 8 * Math.cos((deg * Math.PI) / 180)}
        cy={-35 + 8 * Math.sin((deg * Math.PI) / 180)}
        rx="4" ry="6"
        transform={`rotate(${deg} ${70 + 8 * Math.cos((deg * Math.PI) / 180)} ${-35 + 8 * Math.sin((deg * Math.PI) / 180)})`}
        fill={color}
        opacity="0.9"
      />
    ))}
    <circle cx="70" cy="-35" r="4" fill={accent} />
    {/* Gloss */}
    <path d="M35 95 C33 105 33 115 36 125" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.2" />
    {/* Shadow */}
    <ellipse cx="70" cy="190" rx="40" ry="6" fill="rgba(0,0,0,0.06)" />
  </svg>
)

const Collection = () => {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section className={`${styles.section} section-pad`} ref={ref} id="collection">
      <div className="container">
        <div className={styles.header}>
          <div>
            <p className={`${styles.eyebrow} ${visible ? 'animate-fadeUp' : ''}`}>Spring / Summer 2025</p>
            <h2 className={`${styles.title} ${visible ? 'animate-fadeUp delay-200' : ''}`}>
              The <em>Collection</em>
            </h2>
          </div>
          <a href="#" className={`${styles.viewAll} ${visible ? 'animate-fadeUp delay-300' : ''}`}>
            View All 48 Pieces →
          </a>
        </div>

        <div className={styles.grid}>
          {products.map((p, i) => (
            <ProductCard key={p.id} p={p} idx={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Collection
