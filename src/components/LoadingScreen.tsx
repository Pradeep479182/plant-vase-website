import styles from './LoadingScreen.module.css'

type Props = {
  visible: boolean
}

const LoadingScreen = ({ visible }: Props) => {
  if (!visible) return null

  return (
    <div className={styles.screen} role="status" aria-live="polite" aria-label="Website loading">
      <div className={styles.mark} aria-hidden>
        <span className={styles.leaf}>✦</span>
        <span className={styles.ring} />
      </div>
      <p className={styles.eyebrow}>Welcome to</p>
      <h1 className={styles.title}>Leafora</h1>
      <div className={styles.progress} aria-hidden>
        <span />
      </div>
    </div>
  )
}

export default LoadingScreen
