import { useState, useRef, useEffect } from 'react'
import styles from './Testimonials.module.css'

const reviews = [
  {
    text: "I've never experienced anything like unboxing a Verdana piece. The weight, the texture, the way light plays on the ash glaze — it transformed my entire living room.",
    name: 'Amara K.',
    role: 'Interior Designer, London',
    rating: 5,
  },
  {
    text: "The Moonrise Vessel has become the centerpiece of our home. Guests ask about it every time. It's not just a vase — it's a conversation starter, a sculpture, a piece of living history.",
    name: 'Laurent M.',
    role: 'Architect, Paris',
    rating: 5,
  },
  {
    text: "I received the Forest Amphora as a gift and sobbed. Not because I was sad — because something this beautiful actually exists and someone cared enough to give it to me.",
    name: 'Yuki T.',
    role: 'Ceramics collector, Tokyo',
    rating: 5,
  },
]

const Testimonials = () => {
  const [active, setActive] = useState(0)
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section className={`${styles.section} section-pad`} ref={ref}>
      <div className="container">
        <p className={`${styles.eyebrow} ${visible ? 'animate-fadeUp' : ''}`}>What People Say</p>
        <h2 className={`${styles.title} ${visible ? 'animate-fadeUp delay-200' : ''}`}>
          Loved by<br /><em>Collectors</em>
        </h2>

        <div className={`${styles.quoteWrap} ${visible ? 'animate-fadeUp delay-300' : ''}`}>
          <div className={styles.quote}>
            <div className={styles.stars}>{'★'.repeat(reviews[active].rating)}</div>
            <p className={styles.text}>"{reviews[active].text}"</p>
            <div className={styles.author}>
              <div className={styles.avatar}>
                {reviews[active].name.charAt(0)}
              </div>
              <div>
                <strong className={styles.name}>{reviews[active].name}</strong>
                <span className={styles.role}>{reviews[active].role}</span>
              </div>
            </div>
          </div>

          <div className={styles.controls}>
            {reviews.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${active === i ? styles.dotActive : ''}`}
                onClick={() => setActive(i)}
                aria-label={`Review ${i + 1}`}
                data-hover="true"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
