import React from 'react'
import styles from './CenterPopup.module.css'

type Props = {
  message: string
  visible: boolean
  onClose?: () => void
  duration?: number // ms
}

const CenterPopup: React.FC<Props> = ({ message, visible, onClose, duration = 2000 }) => {
  React.useEffect(() => {
    if (!visible) return
    const t = setTimeout(() => onClose?.(), duration)
    return () => clearTimeout(t)
  }, [visible, duration, onClose])

  if (!visible) return null

  return (
    <div className={styles.container} role="status" aria-live="polite" onClick={onClose}>
      <div className={styles.box}>
        <div className={styles.icon}>✓</div>
        <div className={styles.text}>{message}</div>
      </div>
    </div>
  )
}

export default CenterPopup