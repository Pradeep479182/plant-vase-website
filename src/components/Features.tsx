import { useRef, useEffect, useState } from 'react'
import styles from './Features.module.css'

const features = [
  {
    icon: '🌿',
    title: 'Organic Clay',
    desc: 'Sourced from sustainable deposits, our clay is free from synthetic additives — rich, earthy, and alive.'
  },
  {
    icon: '🔥',
    title: 'Wood-Fired Kilns',
    desc: 'Each piece endures a 48-hour firing process, developing a character no factory can replicate.'
  },
  {
    icon: '🎨',
    title: 'Natural Glazes',
    desc: 'Ash, iron, and mineral glazes create depth and unpredictability — every finish is a conversation with fire.'
  },
  {
    icon: '♻️',
    title: 'Zero Waste Studio',
    desc: 'Offcuts are reclaimed, packaging is compostable, and our carbon footprint is actively offset.'
  },
]

const Features = () => {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section className={`${styles.section} section-pad`} ref={ref} id="story">
      <div className="container">
        <div className={styles.header}>
          <p className={`${styles.eyebrow} ${visible ? 'animate-fadeUp' : ''}`}>Why Verdana</p>
          <h2 className={`${styles.title} ${visible ? 'animate-fadeUp delay-200' : ''}`}>
            Where Earth Meets<br /><em>Artistry</em>
          </h2>
          <p className={`${styles.subtitle} ${visible ? 'animate-fadeUp delay-300' : ''}`}>
            Every vase tells a story of land, hands, and flame.
          </p>
        </div>

        <div className={styles.grid}>
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`${styles.card} ${visible ? 'animate-fadeUp' : ''}`}
              style={{ animationDelay: `${0.2 + i * 0.12}s` }}
            >
              <span className={styles.icon}>{f.icon}</span>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardDesc}>{f.desc}</p>
              <div className={styles.line} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
