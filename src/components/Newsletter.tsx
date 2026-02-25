import { useState } from 'react'
import styles from './Newsletter.module.css'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
    }
  }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.deco}>✦</div>
        <p className={styles.eyebrow}>Stay Connected</p>
        <h2 className={styles.title}>
          Join Our <em>Garden</em>
        </h2>
        <p className={styles.desc}>
          New pieces drop seasonally. Be the first to know, and receive 10% off your first order.
        </p>

        {submitted ? (
          <div className={styles.success}>
            <span>🌿</span>
            <p>Welcome to the garden! Your 10% discount is on its way.</p>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={styles.input}
              required
            />
            <button type="submit" className={styles.btn} data-hover="true">
              Subscribe
            </button>
          </form>
        )}

        <p className={styles.note}>No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  )
}

export default Newsletter
