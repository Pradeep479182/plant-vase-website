import { useRef, useEffect, useState } from 'react'
import styles from './Process.module.css'

const steps = [
  {
    num: '01',
    title: 'Harvest',
    desc: 'Clay is sourced from carefully chosen riverbeds and hillsides, processed by hand to remove impurities while preserving natural character.',
    icon: '🌍'
  },
  {
    num: '02',
    title: 'Shape',
    desc: 'Each piece is thrown on a traditional wheel or hand-built using slab techniques, guided by the material\'s natural tendencies.',
    icon: '🏺'
  },
  {
    num: '03',
    title: 'Fire',
    desc: 'A 48-hour wood firing in our anagama kiln creates the unpredictable beauty of flame-kissed surfaces and natural ash deposits.',
    icon: '🔥'
  },
  {
    num: '04',
    title: 'Release',
    desc: 'After a slow, 36-hour cooling, each piece is carefully inspected and paired with the right plant companion before finding its home.',
    icon: '✨'
  },
]

const Process = () => {
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % steps.length), 3000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className={`${styles.section} section-pad`} ref={ref} id="process">
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.left}>
            <p className={`${styles.eyebrow} ${visible ? 'animate-fadeUp' : ''}`}>From Earth to Home</p>
            <h2 className={`${styles.title} ${visible ? 'animate-fadeUp delay-200' : ''}`}>
              The <em>Process</em>
            </h2>
            <p className={`${styles.desc} ${visible ? 'animate-fadeUp delay-300' : ''}`}>
              Every Verdana vase is a slow conversation between maker and material. 
              No shortcuts, no compromises — just the ancient dialogue of hands, 
              clay, water, and fire.
            </p>

            <div className={`${styles.steps} ${visible ? 'animate-fadeUp delay-400' : ''}`}>
              {steps.map((s, i) => (
                <button
                  key={s.num}
                  className={`${styles.step} ${active === i ? styles.active : ''}`}
                  onClick={() => setActive(i)}
                  data-hover="true"
                >
                  <span className={styles.stepNum}>{s.num}</span>
                  <span className={styles.stepTitle}>{s.title}</span>
                  <span className={styles.stepIcon}>{s.icon}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={`${styles.right} ${visible ? 'animate-scaleIn delay-200' : ''}`}>
            <div className={styles.card}>
              <div className={styles.cardNum}>{steps[active].num}</div>
              <div className={styles.cardIcon}>{steps[active].icon}</div>
              <h3 className={styles.cardTitle}>{steps[active].title}</h3>
              <p className={styles.cardDesc}>{steps[active].desc}</p>
              <div className={styles.progress}>
                {steps.map((_, i) => (
                  <div key={i} className={`${styles.dot} ${active === i ? styles.dotActive : ''}`} />
                ))}
              </div>
            </div>

            <div className={styles.bgCircle} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Process
