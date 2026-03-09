import { useEffect, useRef } from 'react'
import styles from './AnimatedBackground.module.css'

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = canvasRef.current
    if (!container) return

    // Create floating orbs
    const createOrb = (delay: number, duration: number, x: number, y: number, size: number) => {
      const orb = document.createElement('div')
      orb.className = styles.orb
      orb.style.animation = `${styles.float} ${duration}s infinite`
      orb.style.animationDelay = `${delay}s`
      orb.style.left = `${x}%`
      orb.style.top = `${y}%`
      orb.style.width = `${size}px`
      orb.style.height = `${size}px`
      
      // Random color from palette
      const colors = [
        'rgba(122, 158, 126, 0.08)',
        'rgba(90, 122, 94, 0.06)',
        'rgba(196, 112, 74, 0.05)',
        'rgba(132, 111, 71, 0.07)',
      ]
      orb.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
      
      container.appendChild(orb)
    }

    // Create orbs with varied parameters
    createOrb(0, 20, 10, 20, 200)
    createOrb(3, 25, 80, 10, 150)
    createOrb(5, 30, 50, 80, 180)
    createOrb(1, 22, 20, 60, 120)
    createOrb(4, 28, 70, 40, 160)
    createOrb(2, 24, 90, 70, 140)

  }, [])

  return <div ref={canvasRef} className={styles.backgroundContainer} />
}

export default AnimatedBackground
