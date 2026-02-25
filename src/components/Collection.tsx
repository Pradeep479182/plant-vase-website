import { useState, useRef, useEffect } from 'react'
import styles from './Collection.module.css'
import CenterPopup from './CenterPopup'
import NotificationBell from './NotificationBell'
import CartModal from './CartModal'
import Pot1 from '../assets/Pot1.jpg'
import Pot2 from '../assets/Pot2.png'
import Pot3 from '../assets/Pot3.jpg'
import Pot4 from '../assets/Pot4.png'
import Pot5 from '../assets/Pot5.jpg'
import Pot6 from '../assets/Pot6.png'
import Pot7 from '../assets/Pot7.jpg'
import Pot8 from '../assets/Pot8.jpg'
import Pot9 from '../assets/Pot9.png'
import Pot10 from '../assets/Pot10.avif'
import Pot11 from '../assets/Pot11.jpg'
import Pot12 from '../assets/Pot12.png'
import Pot13 from '../assets/Pot13.png'
import Pot14 from '../assets/Pot14.png'
import Pot15 from '../assets/Pot15.webp'

const products = [
  {
    id: 1,
    name: 'Moonrise Vessel',
    subtitle: 'Ash glaze series',
    price: '$145',
    tag: 'Bestseller',
    image: Pot1,
    height: '28 cm',
    temperature: '18-24°C',
  },
  {
    id: 2,
    name: 'Forest Amphora',
    subtitle: 'Celadon series',
    price: '$220',
    tag: 'New',
    image: Pot2,
    height: '38 cm',
    temperature: '16-22°C',
  },
  {
    id: 3,
    name: 'Ember Bottle',
    subtitle: 'Iron oxide series',
    price: '$165',
    tag: null,
    image: Pot3,
    height: '22 cm',
    temperature: '20-26°C',
  },
  {
    id: 4,
    name: 'Dusk Pillar',
    subtitle: 'Raku series',
    price: '$195',
    tag: 'Limited',
    image: Pot4,
    height: '45 cm',
    temperature: '18-25°C',
  },
  {
    id: 5,
    name: 'Dawn Chalice',
    subtitle: 'Stoneware series',
    price: '$175',
    tag: 'New',
    image: Pot5,
    height: '32 cm',
    temperature: '15-24°C',
  },
  {
    id: 6,
    name: 'Heritage Crown',
    subtitle: 'Traditional glaze',
    price: '$210',
    tag: null,
    image: Pot6,
    height: '35 cm',
    temperature: '17-23°C',
  },
  {
    id: 7,
    name: 'Sage Dream',
    subtitle: 'Matte finish',
    price: '$155',
    tag: 'Bestseller',
    image: Pot7,
    height: '26 cm',
    temperature: '18-24°C',
  },
  {
    id: 8,
    name: 'Ocean Depths',
    subtitle: 'Cobalt series',
    price: '$185',
    tag: 'Limited',
    image: Pot8,
    height: '40 cm',
    temperature: '16-22°C',
  },
  {
    id: 9,
    name: 'Desert Gold',
    subtitle: 'Terracotta edition',
    price: '$135',
    tag: null,
    image: Pot9,
    height: '24 cm',
    temperature: '20-28°C',
  },
  {
    id: 10,
    name: 'Moonlit Grace',
    subtitle: 'Celadon matte',
    price: '$200',
    tag: 'New',
    image: Pot10,
    height: '36 cm',
    temperature: '17-25°C',
  },
  {
    id: 11,
    name: 'Silhouette',
    subtitle: 'Minimalist design',
    price: '$160',
    tag: null,
    image: Pot11,
    height: '30 cm',
    temperature: '18-24°C',
  },
  {
    id: 12,
    name: 'Twilight Vessel',
    subtitle: 'Gloss finish',
    price: '$190',
    tag: 'New',
    image: Pot12,
    height: '34 cm',
    temperature: '16-23°C',
  },
  {
    id: 13,
    name: 'Harmony Bowl',
    subtitle: 'Wide mouth design',
    price: '$170',
    tag: 'Bestseller',
    image: Pot13,
    height: '25 cm',
    temperature: '19-25°C',
  },
  {
    id: 14,
    name: 'Zenith Urn',
    subtitle: 'Contemporary style',
    price: '$225',
    tag: 'Limited',
    image: Pot14,
    height: '42 cm',
    temperature: '17-24°C',
  },
  {
    id: 15,
    name: 'Artisan\'s Pride',
    subtitle: 'Hand-thrown masterpiece',
    price: '$280',
    tag: 'New',
    image: Pot15,
    height: '48 cm',
    temperature: '15-25°C',
  },
]
type CartItem = {
  id: number
  name: string
  price: number
  qty: number
}

const parsePrice = (p: string) => {
  // expects format like "$145" — returns number 145
  const n = Number(p.replace(/[^0-9.]/g, ''))
  return Number.isFinite(n) ? n : 0
}

const ProductCard = ({ p, idx, onQuickAdd }: { p: typeof products[0]; idx: number; onQuickAdd: (product: typeof products[0]) => void }) => {
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    onQuickAdd(p)
    setAdded(true)
    setTimeout(() => setAdded(false), 1600)
  }

  return (
    <div className={`${styles.card} animate-fadeUp`} style={{ animationDelay: `${idx * 0.15}s` }}>
      <div className={styles.imageWrap} style={{ background: '#f5f0e8' }}>
        {p.tag && <span className={styles.tag}>{p.tag}</span>}
        <img src={p.image} alt={p.name} className={styles.potImage} />
        <div className={styles.overlay}>
          <button className={styles.quickAdd} onClick={handleAdd} data-hover="true">
            {added ? '✓ Added' : 'Quick Add'}
          </button>
          <button className={styles.wishlist} aria-label="Add to wishlist">♡</button>
        </div>
      </div>
      <div className={styles.info} style={{ animationDelay: `${idx * 0.15 + 0.2}s` }}>
        <div>
          <h3 className={styles.name}>{p.name}</h3>
          <p className={styles.sub}>{p.subtitle}</p>
          <p className={styles.details}>Height: {p.height} | Temp: {p.temperature}</p>
        </div>
        <p className={styles.price} style={{ animationDelay: `${idx * 0.15 + 0.3}s` }}>{p.price}</p>
      </div>
    </div>
  )
}

const Collection = () => {
  const [visible, setVisible] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // cart state
  const [cart, setCart] = useState<CartItem[]>([])
  const [bellOpen, setBellOpen] = useState(false)
  const [bellPulse, setBellPulse] = useState(false)

  const displayedProducts = showAll ? products : products.slice(0, 6)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const handleQuickAdd = (product: typeof products[0]) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id)
      if (exists) {
        return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      } else {
        return [...prev, { id: product.id, name: product.name, price: parsePrice(product.price), qty: 1 }]
      }
    })

    // pulse bell to indicate an add
    setBellPulse(true)
    setTimeout(() => setBellPulse(false), 800)
  }

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <section className={`${styles.section} section-pad`} ref={ref} id="collection">
      <NotificationBell
        count={cart.reduce((s, i) => s + i.qty, 0)}
        onClick={() => setBellOpen(true)}
        pulse={bellPulse}
      />

      <CartModal
        open={bellOpen}
        onClose={() => setBellOpen(false)}
        items={cart}
        total={total}
        clearCart={() => setCart([])}
      />

      <div className="container">
        <div className={styles.header}>
          <div>
            <p className={`${styles.eyebrow} ${visible ? 'animate-fadeUp' : ''}`}>Spring / Summer 2025</p>
            <h2 className={`${styles.title} ${visible ? 'animate-fadeUp delay-200' : ''}`}>
              The <em>Collection</em>
            </h2>
          </div>
        </div>

        <div className={styles.grid}>
          {displayedProducts.map((p, i) => (
            <ProductCard key={p.id} p={p} idx={i} onQuickAdd={handleQuickAdd} />
          ))}
        </div>

        {!showAll && (
          <div className={styles.showAllContainer}>
            <button 
              className={styles.showAllBtn}
              onClick={() => setShowAll(true)}
              data-hover="true"
            >
              Show All Collection →
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default Collection