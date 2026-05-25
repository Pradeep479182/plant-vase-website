import { useState, useRef, useEffect } from 'react'
import styles from './Collection.module.css'
import CartModal from './CartModal'
import NotificationBell from './NotificationBell'
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
    price: 'LKR 145',
    tag: 'Bestseller',
    image: Pot1,
    height: '28 cm',
    temperature: '18-24°C',
  },
  {
    id: 2,
    name: 'Forest Amphora',
    subtitle: 'Celadon series',
    price: 'LKR 220',
    tag: 'New',
    image: Pot2,
    height: '38 cm',
    temperature: '16-22°C',
  },
  {
    id: 3,
    name: 'Ember Bottle',
    subtitle: 'Iron oxide series',
    price: 'LKR 165',
    tag: null,
    image: Pot3,
    height: '22 cm',
    temperature: '20-26°C',
  },
  {
    id: 4,
    name: 'Dusk Pillar',
    subtitle: 'Raku series',
    price: 'LKR 195',
    tag: 'Limited',
    image: Pot4,
    height: '45 cm',
    temperature: '18-25°C',
  },
  {
    id: 5,
    name: 'Dawn Chalice',
    subtitle: 'Stoneware series',
    price: 'LKR 175',
    tag: 'New',
    image: Pot5,
    height: '32 cm',
    temperature: '15-24°C',
  },
  {
    id: 6,
    name: 'Heritage Crown',
    subtitle: 'Traditional glaze',
    price: 'LKR 210',
    tag: null,
    image: Pot6,
    height: '35 cm',
    temperature: '17-23°C',
  },
  {
    id: 7,
    name: 'Sage Dream',
    subtitle: 'Matte finish',
    price: 'LKR 155',
    tag: 'Bestseller',
    image: Pot7,
    height: '26 cm',
    temperature: '18-24°C',
  },
  {
    id: 8,
    name: 'Ocean Depths',
    subtitle: 'Cobalt series',
    price: 'LKR 185',
    tag: 'Limited',
    image: Pot8,
    height: '40 cm',
    temperature: '16-22°C',
  },
  {
    id: 9,
    name: 'Desert Gold',
    subtitle: 'Terracotta edition',
    price: 'LKR 135',
    tag: null,
    image: Pot9,
    height: '24 cm',
    temperature: '20-28°C',
  },
  {
    id: 10,
    name: 'Moonlit Grace',
    subtitle: 'Celadon matte',
    price: 'LKR 200',
    tag: 'New',
    image: Pot10,
    height: '36 cm',
    temperature: '17-25°C',
  },
  {
    id: 11,
    name: 'Silhouette',
    subtitle: 'Minimalist design',
    price: 'LKR 160',
    tag: null,
    image: Pot11,
    height: '30 cm',
    temperature: '18-24°C',
  },
  {
    id: 12,
    name: 'Twilight Vessel',
    subtitle: 'Gloss finish',
    price: 'LKR 190',
    tag: 'New',
    image: Pot12,
    height: '34 cm',
    temperature: '16-23°C',
  },
  {
    id: 13,
    name: 'Harmony Bowl',
    subtitle: 'Wide mouth design',
    price: 'LKR 170',
    tag: 'Bestseller',
    image: Pot13,
    height: '25 cm',
    temperature: '19-25°C',
  },
  {
    id: 14,
    name: 'Zenith Urn',
    subtitle: 'Contemporary style',
    price: 'LKR 225',
    tag: 'Limited',
    image: Pot14,
    height: '42 cm',
    temperature: '17-24°C',
  },
  {
    id: 15,
    name: 'Artisan\'s Pride',
    subtitle: 'Hand-thrown masterpiece',
    price: 'LKR 280',
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
  // expects format like "LKR 145" — returns number 145
  const n = Number(p.replace(/[^0-9.]/g, ''))
  return Number.isFinite(n) ? n : 0
}

const ProductCard = ({ p, idx, onSelect }: { p: typeof products[0]; idx: number; onSelect: () => void }) => {
  return (
    <div
      className={`${styles.card} animate-fadeUp`}
      style={{ animationDelay: `${idx * 0.15}s` }}
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect()}
    >
      <div className={styles.imageWrap} style={{ background: '#f5f0e8' }}>
        {p.tag && <span className={styles.tag}>{p.tag}</span>}
        <img src={p.image} alt={p.name} className={styles.potImage} />
        <div className={styles.overlay}>
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
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null)
  const [selectedQty, setSelectedQty] = useState(1)
  const ref = useRef<HTMLDivElement>(null)

  // cart state
  const [cart, setCart] = useState<CartItem[]>([])
  const [bellOpen, setBellOpen] = useState(false)
  const [bellPulse, setBellPulse] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastOpen, setToastOpen] = useState(false)
  const toastTimer = useRef<number | null>(null)
  const pulseTimer = useRef<number | null>(null)

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
    playSuccessSound()
    speakAssistant(`${product.name} added to the cart. You can continue shopping or proceed to checkout.`)
    showToast(`${product.name} added to cart successfully`)
    setBellOpen(true)
  }

  const handleRemove = (productId: number) => {
    setCart(prev => prev.filter(i => i.id !== productId))
  }

  const openProductModal = (product: typeof products[0]) => {
    setSelectedProduct(product)
    setSelectedQty(1)
  }

  const closeProductModal = () => {
    setSelectedProduct(null)
    setSelectedQty(1)
  }

  const handleModalAdd = () => {
    if (!selectedProduct) return
    setCart(prev => {
      const exists = prev.find(i => i.id === selectedProduct.id)
      if (exists) {
        return prev.map(i => i.id === selectedProduct.id ? { ...i, qty: i.qty + selectedQty } : i)
      }
      return [...prev, { id: selectedProduct.id, name: selectedProduct.name, price: parsePrice(selectedProduct.price), qty: selectedQty }]
    })
    playSuccessSound()
    speakAssistant(`${selectedProduct.name} added to the cart. You can continue shopping or proceed to checkout.`)
    showToast(`${selectedProduct.name} added to cart successfully`)
    closeProductModal()
    setBellOpen(true)
  }

  const handleModalBuyNow = () => {
    handleModalAdd()
    setBellOpen(true)
  }

  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedProduct])

  useEffect(() => {
    return () => {
      if (toastTimer.current) {
        window.clearTimeout(toastTimer.current)
      }
      if (pulseTimer.current) {
        window.clearTimeout(pulseTimer.current)
      }
    }
  }, [])

  const showToast = (message: string) => {
    setToastMessage(message)
    setToastOpen(true)
    setBellPulse(true)
    if (toastTimer.current) {
      window.clearTimeout(toastTimer.current)
    }
    if (pulseTimer.current) {
      window.clearTimeout(pulseTimer.current)
    }
    toastTimer.current = window.setTimeout(() => setToastOpen(false), 3000)
    pulseTimer.current = window.setTimeout(() => setBellPulse(false), 700)
  }

  // gentle success sound using WebAudio
  const playSuccessSound = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      o.type = 'sine'
      o.frequency.value = 880
      g.gain.value = 0
      o.connect(g)
      g.connect(ctx.destination)
      o.start()
      g.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.01)
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28)
      o.frequency.linearRampToValueAtTime(1320, ctx.currentTime + 0.22)
      setTimeout(() => {
        o.stop()
        ctx.close()
      }, 350)
    } catch (e) {
      // ignore audio errors on restricted devices
    }
  }

  const speakAssistant = (text: string) => {
    try {
      if (!('speechSynthesis' in window)) return
      const utter = new SpeechSynthesisUtterance(text)
      utter.lang = 'en-US'
      utter.rate = 1
      utter.pitch = 1
      window.speechSynthesis.cancel()
      window.speechSynthesis.speak(utter)
    } catch (e) {
      // ignore speech errors
    }
  }

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <section className={`${styles.section} section-pad`} ref={ref} id="collection">
      <NotificationBell
        count={cartCount}
        pulse={bellPulse}
        onClick={() => setBellOpen(true)}
      />
      <CartModal
        open={bellOpen}
        onClose={() => setBellOpen(false)}
        items={cart}
        total={total}
        clearCart={() => setCart([])}
      />
      <div className={`${styles.toast} ${toastOpen ? styles.visible : ''}`}>
        {toastMessage}
      </div>

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
            <ProductCard key={p.id} p={p} idx={i} onSelect={() => openProductModal(p)} />
          ))}
        </div>

        {selectedProduct && (
          <div className={styles.modalBackdrop} onClick={closeProductModal}>
            <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
              <button className={styles.closeBtn} onClick={closeProductModal} aria-label="Close product details">×</button>
              <div className={styles.modalInner}>
                <div className={styles.imagePanel}>
                  <img src={selectedProduct.image} alt={selectedProduct.name} className={styles.modalImage} />
                </div>
                <div className={styles.modalContent}>
                  <span className={styles.labelTag}>Curated Plant</span>
                  <h3 className={styles.modalTitle}>{selectedProduct.name}</h3>
                  <p className={styles.modalSubtitle}>{selectedProduct.subtitle}</p>
                  <p className={styles.modalPrice}>{selectedProduct.price}</p>
                  <div className={styles.quantityRow}>
                    <button className={styles.qtyBtn} onClick={() => setSelectedQty((qty) => Math.max(1, qty - 1))}>−</button>
                    <span className={styles.qtyText}>{selectedQty}</span>
                    <button className={styles.qtyBtn} onClick={() => setSelectedQty((qty) => qty + 1)}>+</button>
                  </div>
                  <p className={styles.modalDescription}>
                    {`Discover the ${selectedProduct.subtitle} for a premium touch at home. Ideal for bright corners, this plant adds texture and calm with its sculptural silhouette.`}
                  </p>
                  <div className={styles.actionRow}>
                    <button className={styles.addButton} onClick={handleModalAdd}>Add to Cart</button>
                    <button className={styles.buyButton} onClick={handleModalBuyNow}>Buy Now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

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
