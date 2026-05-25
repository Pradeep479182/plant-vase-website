import { useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Collection from './components/Collection'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import FloatingPetals from './components/FloatingPetals'
import Chatbot from './components/Chatbot'
import AnimatedBackground from './components/AnimatedBackground'
import LoadingScreen from './components/LoadingScreen'

function App() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let greeted = false
    const timer = window.setTimeout(() => setLoading(false), 2350)
    const greetingTimers: number[] = []
    let welcomeUtterance: SpeechSynthesisUtterance | null = null

    const speakWelcome = () => {
      if (greeted || !('speechSynthesis' in window)) return
      try {
        welcomeUtterance = new SpeechSynthesisUtterance('Welcome to Leafora. Discover handcrafted plant vases made for calm, beautiful spaces.')
        welcomeUtterance.lang = 'en-US'
        welcomeUtterance.rate = 0.95
        welcomeUtterance.pitch = 1
        welcomeUtterance.onstart = () => {
          greeted = true
        }
        window.speechSynthesis.resume()
        window.speechSynthesis.cancel()
        window.speechSynthesis.speak(welcomeUtterance)
      } catch {
        // Some browsers only allow speech after the first user interaction.
      }
    }

    ;[250, 700, 1250, 1900].forEach(delay => {
      greetingTimers.push(window.setTimeout(speakWelcome, delay))
    })
    const speakAfterInteraction = () => speakWelcome()

    if ('speechSynthesis' in window) {
      window.speechSynthesis.addEventListener('voiceschanged', speakWelcome)
    }
    window.addEventListener('pointerdown', speakAfterInteraction, { once: true })
    window.addEventListener('keydown', speakAfterInteraction, { once: true })

    return () => {
      window.clearTimeout(timer)
      greetingTimers.forEach(id => window.clearTimeout(id))
      if ('speechSynthesis' in window) {
        window.speechSynthesis.removeEventListener('voiceschanged', speakWelcome)
      }
      window.removeEventListener('pointerdown', speakAfterInteraction)
      window.removeEventListener('keydown', speakAfterInteraction)
    }
  }, [])

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    if (!cursor || !follower) return

    let mouseX = 0, mouseY = 0
    let followerX = 0, followerY = 0

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      cursor.style.left = mouseX + 'px'
      cursor.style.top = mouseY + 'px'
    }

    const animate = () => {
      followerX += (mouseX - followerX) * 0.12
      followerY += (mouseY - followerY) * 0.12
      follower.style.left = followerX + 'px'
      follower.style.top = followerY + 'px'
      requestAnimationFrame(animate)
    }

    const onHoverIn = () => {
      cursor.classList.add('hovering')
      follower.classList.add('hovering')
    }
    const onHoverOut = () => {
      cursor.classList.remove('hovering')
      follower.classList.remove('hovering')
    }

    window.addEventListener('mousemove', onMouseMove)
    document.querySelectorAll('a, button, [data-hover]').forEach(el => {
      el.addEventListener('mouseenter', onHoverIn)
      el.addEventListener('mouseleave', onHoverOut)
    })

    animate()
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <>
      <LoadingScreen visible={loading} />
      <AnimatedBackground />
      <div className="cursor" ref={cursorRef} />
      <div className="cursor-follower" ref={followerRef} />
      <FloatingPetals />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Collection />
        <Process />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
      <Chatbot />
    </>
  )
}

export default App
