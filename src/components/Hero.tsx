import styles from './Hero.module.css'
import VaseSVG from './VaseSVG'

const Hero = () => {
  return (
    <section className={styles.hero} id="hero">
      {/* Background texture */}
      <div className={styles.bg} />

      <div className={styles.container}>
        <div className={styles.content}>
          <p className={`${styles.eyebrow} animate-fadeUp`}>Handcrafted in Small Batches</p>

          <h1 className={styles.title}>
            <span className={`${styles.line} animate-fadeUp delay-200`}>
              <em>Living</em> Art
            </span>
            <span className={`${styles.line} animate-fadeUp delay-300`}>
              for Your
            </span>
            <span className={`${styles.line} animate-fadeUp delay-400`}>
              Home
            </span>
          </h1>

          <p className={`${styles.subtitle} animate-fadeUp delay-500`}>
            Botanical vases crafted from reclaimed clay and organic glazes —<br />
            each piece a unique collaboration between artisan and earth.
          </p>

          <div className={`${styles.actions} animate-fadeUp delay-600`}>
            <a href="#collection" className={styles.btnPrimary} data-hover="true">
              Explore Collection
            </a>
            <a href="#process" className={styles.btnSecondary} data-hover="true">
              Our Process ↗
            </a>
          </div>

          <div className={`${styles.stats} animate-fadeUp delay-700`}>
            {[
              { num: '340+', label: 'Unique Designs' },
              { num: '12yr', label: 'Craft Heritage' },
              { num: '100%', label: 'Sustainable Clay' },
            ].map(s => (
              <div key={s.label} className={styles.stat}>
                <strong>{s.num}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`${styles.visual} animate-scaleIn delay-300`}>
          <div className={styles.orbit}>
            <div className={styles.orbitRing} />
            <div className={styles.orbitDot} />
          </div>
          <div className={styles.vaseWrap}>
            <VaseSVG />
          </div>
          <div className={styles.badge}>
            <span className={styles.badgeText}>New<br/>Season</span>
            <span className={styles.badgeSub}>2025</span>
          </div>
          <div className={styles.leafAccent}>
            <LeafSVG />
          </div>
        </div>
      </div>

      <div className={styles.scrollHint}>
        <span>Scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  )
}

const LeafSVG = () => (
  <svg viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M40 110 C40 110 10 80 8 50 C6 20 40 5 40 5 C40 5 74 20 72 50 C70 80 40 110 40 110Z"
      fill="#7a9e7e" opacity="0.6"
    />
    <path d="M40 110 L40 20" stroke="#5a7a5e" strokeWidth="1.5" opacity="0.8" />
    <path d="M40 50 C40 50 25 40 20 28" stroke="#5a7a5e" strokeWidth="1" opacity="0.5" />
    <path d="M40 65 C40 65 55 55 60 43" stroke="#5a7a5e" strokeWidth="1" opacity="0.5" />
  </svg>
)

export default Hero
