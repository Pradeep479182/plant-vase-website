import { useState } from 'react'
import styles from './Chatbot.module.css'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

interface Product {
  id: number
  name: string
  subtitle: string
  price: string
  image: string
  height: string
  temperature: string
}

const featuredProducts: Product[] = [
  {
    id: 1,
    name: 'Moonrise Vessel',
    subtitle: 'Ash glaze series',
    price: '$145',
    image: '🌿',
    height: '28 cm',
    temperature: '18-24°C',
  },
  {
    id: 2,
    name: 'Forest Amphora',
    subtitle: 'Celadon series',
    price: '$220',
    image: '🌱',
    height: '38 cm',
    temperature: '16-22°C',
  },
  {
    id: 6,
    name: 'Heritage Crown',
    subtitle: 'Traditional glaze',
    price: '$210',
    image: '🪴',
    height: '35 cm',
    temperature: '17-23°C',
  },
]

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showProduct, setShowProduct] = useState(false)
  const [currentProductIndex, setCurrentProductIndex] = useState(0)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! 🌿 Welcome to our plant vase collection. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')

  const handleSendMessage = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        'That\'s a great question! Let me help you find the perfect vase.',
        'I\'d love to assist you with that. Can you tell me more? 🌱',
        'Absolutely! We have beautiful options to choose from.',
        'Great choice! Feel free to browse our collection.',
        'You can add items to your cart and check out whenever you\'re ready!',
        'Is there anything else you\'d like to know about our products?',
      ]

      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: 'bot',
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, botMessage])
    }, 600)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const currentProduct = featuredProducts[currentProductIndex]

  const handleNextProduct = () => {
    setCurrentProductIndex((prev) => (prev + 1) % featuredProducts.length)
  }

  const handlePreviousProduct = () => {
    setCurrentProductIndex((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length)
  }

  const handleAddToCart = () => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      text: `Added ${currentProduct.name} to cart! 🛒`,
      sender: 'bot',
      timestamp: new Date(),
    }])
  }

  return (
    <>
      {/* Floating Button */}
      <button
        className={styles.chatbotButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open chat"
        data-hover="true"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.header}>
            <div className={styles.titleContainer}>
              <button 
                className={styles.logoBtn}
                onClick={() => setShowProduct(!showProduct)}
                data-hover="true"
                aria-label="View products"
              >
                <div className={styles.logo}>🌿</div>
              </button>
              <div>
                <h3 className={styles.title}>Plant Assistant</h3>
                <p className={styles.status}>Online</p>
              </div>
            </div>
            <button
              className={styles.closeBtn}
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Product Popup */}
          {showProduct && (
            <div className={styles.productPopup}>
              <div className={styles.productCard}>
                <div className={styles.productImage}>{currentProduct.image}</div>
                <h4 className={styles.productName}>{currentProduct.name}</h4>
                <p className={styles.productSubtitle}>{currentProduct.subtitle}</p>
                <p className={styles.productDetails}>
                  Height: {currentProduct.height} | Temp: {currentProduct.temperature}
                </p>
                <p className={styles.productPrice}>{currentProduct.price}</p>
                
                <div className={styles.productActions}>
                  <button 
                    className={styles.productBtn}
                    onClick={handleAddToCart}
                    data-hover="true"
                  >
                    Add to Cart
                  </button>
                </div>

                <div className={styles.productNav}>
                  <button 
                    className={styles.navBtn}
                    onClick={handlePreviousProduct}
                    aria-label="Previous product"
                  >
                    ‹
                  </button>
                  <span className={styles.navIndicator}>
                    {currentProductIndex + 1} / {featuredProducts.length}
                  </span>
                  <button 
                    className={styles.navBtn}
                    onClick={handleNextProduct}
                    aria-label="Next product"
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className={styles.messagesContainer}>
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`${styles.message} ${styles[msg.sender]}`}
              >
                <p className={styles.messageText}>{msg.text}</p>
              </div>
            ))}
          </div>

          <div className={styles.inputContainer}>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className={styles.input}
            />
            <button
              onClick={handleSendMessage}
              className={styles.sendBtn}
              disabled={!input.trim()}
              aria-label="Send message"
            >
              →
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Chatbot
