import React from 'react'
import css from './NotificationBell.module.css'

type Props = {
  count: number
  pulse?: boolean
  onClick?: () => void
}

const NotificationBell: React.FC<Props> = ({ count, onClick, pulse }) => {
  return (
    <div
      className={`${css.bellWrap} ${pulse ? css.pulse : ''}`}
      onClick={onClick}
      role="button"
      aria-label="Open cart"
    >
      <div className={css.bell}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 22c1.1 0 2-.9 2-2H10a2 2 0 0 0 2 2z" fill="#2c2c2c"/>
          <path d="M18 16v-5c0-3.1-1.6-5.8-4.6-6.7V3a1.4 1.4 0 1 0-2.8 0v1.3C7.6 5.2 6 7.9 6 11v5l-2 2v1h16v-1l-2-2z" fill="#2c2c2c" opacity="0.95"/>
        </svg>
      </div>

      {count > 0 && <div className={css.badge}>{count}</div>}
    </div>
  )
}

export default NotificationBell