import { useEffect, useRef } from 'react'
import styles from './FloatingPetals.module.css'

const FloatingPetals = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const petals = ['🌸', '🍃', '✿', '❀', '🌿']
    let count = 0

    const spawn = () => {
      if (count > 12) return
      const el = document.createElement('span')
      el.className = styles.petal
      el.textContent = petals[Math.floor(Math.random() * petals.length)]
      el.style.left = Math.random() * 100 + 'vw'
      el.style.fontSize = (0.6 + Math.random() * 0.8) + 'rem'
      el.style.animationDuration = (8 + Math.random() * 8) + 's'
      el.style.animationDelay = Math.random() * 2 + 's'
      el.style.opacity = (0.2 + Math.random() * 0.3).toString()
      container.appendChild(el)
      count++

      el.addEventListener('animationend', () => {
        el.remove()
        count--
      })
    }

    const interval = setInterval(spawn, 2500)
    return () => clearInterval(interval)
  }, [])

  return <div className={styles.container} ref={containerRef} />
}

export default FloatingPetals
