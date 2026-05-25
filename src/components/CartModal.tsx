import React, { useEffect, useState } from 'react'
import css from './CartModal.module.css'

type Item = {
  id: number
  name: string
  price: number
  qty: number
}

type Props = {
  open: boolean
  onClose: () => void
  items: Item[]
  total: number
  clearCart: () => void
}

const formatPrice = (n: number) => `LKR ${n.toFixed(2)}`

const maskCardNumber = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 16)
  const groups = digits.match(/.{1,4}/g)
  return groups ? groups.join(' ') : ''
}

const formatExpiry = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 4)
  if (digits.length <= 2) return digits
  return `${digits.slice(0, 2)}/${digits.slice(2)}`
}

const emailConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
}

const CartModal: React.FC<Props> = ({ open, onClose, items, total, clearCart }) => {
  const [method, setMethod] = useState<'card' | 'cod'>('card')
  const [paid, setPaid] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [email, setEmail] = useState('')
  const [receiptSent, setReceiptSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [cardNumber, setCardNumber] = useState('')
  const [cardName, setCardName] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvv, setCvv] = useState('')
  const [focusedField, setFocusedField] = useState<'number' | 'name' | 'expiry' | 'cvv' | null>(null)
  const [formError, setFormError] = useState('')

  useEffect(() => {
    if (!open) return
    setPaid(false)
    setReceiptSent(false)
    setFormError('')
    setCardNumber('')
    setCardName('')
    setExpiry('')
    setCvv('')
    setEmail('')
    setMethod('card')
    // voice assistant: announce checkout
    speakAssistant(`Checkout opened. You have ${items.length} ${items.length === 1 ? 'item' : 'items'} in your cart. The total is ${formatPrice(total)}. Please select your payment method.`)
  }, [open])

  useEffect(() => {
    // when payment method changes, prompt the user
    if (!open) return
    if (method === 'card') {
      speakAssistant('Online card payment selected. Enter your card details.')
    } else {
      speakAssistant('Cash on Delivery selected. Please provide your email to receive a receipt.')
    }
  }, [method, open])

  const speakAssistant = (text: string) => {
    try {
      if (!('speechSynthesis' in window)) return
      const u = new SpeechSynthesisUtterance(text)
      u.lang = 'en-US'
      u.rate = 1
      u.pitch = 1
      window.speechSynthesis.cancel()
      window.speechSynthesis.speak(u)
    } catch (e) {
      // ignore
    }
  }

  if (!open) return null

  const isValidEmail = (value: string) => /^\S+@\S+\.\S+$/.test(value)

  const sendReceipt = async (recipient: string, orderIdValue: string, paymentMethod: string) => {
    if (!recipient.trim()) return false

    if (!emailConfig.serviceId || !emailConfig.templateId || !emailConfig.publicKey) {
      setFormError('Email service is not configured yet. Add your EmailJS IDs in .env.')
      return false
    }

    const orderItems = items
      .map(item => `${item.name} x${item.qty} - ${formatPrice(item.price * item.qty)}`)
      .join('\n')

    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: emailConfig.serviceId,
          template_id: emailConfig.templateId,
          user_id: emailConfig.publicKey,
          template_params: {
            to_email: recipient,
            buyer_email: recipient,
            order_id: orderIdValue,
            payment_method: paymentMethod,
            order_total: formatPrice(total),
            order_items: orderItems,
            delivery_status: 'Processing - Estimated 3-5 business days',
          },
        }),
      })

      if (!response.ok) {
        const message = await response.text()
        setFormError(message || 'Email could not be sent. Please check your EmailJS template.')
        return false
      }
    } catch {
      setFormError('Email could not be sent. Please check your internet connection and EmailJS settings.')
      return false
    }

    setReceiptSent(true)
    setTimeout(() => setReceiptSent(false), 3200)
    return true
  }

  const handleCardPayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')
    const digits = cardNumber.replace(/\D/g, '')
    if (digits.length !== 16) {
      setFormError('Please enter a valid 16-digit card number.')
      return
    }
    if (!cardName.trim()) {
      setFormError('Please enter the cardholder name.')
      return
    }
    if (!/^([0-1][0-9])\/([0-9]{2})$/.test(expiry)) {
      setFormError('Expiry must be in MM/YY format.')
      return
    }
    if (!/^[0-9]{3,4}$/.test(cvv)) {
      setFormError('Please enter a valid CVV.')
      return
    }
    if (!email.trim()) {
      setFormError('Please enter your email to receive the order receipt.')
      return
    }
    if (!isValidEmail(email.trim())) {
      setFormError('Please enter a valid email address.')
      return
    }

    setSending(true)
    const id = `ORD-${Math.random().toString(36).slice(2, 9).toUpperCase()}`
    const buyerEmail = email.trim()
    const ok = await sendReceipt(buyerEmail, id, 'Online Card Payment')
    setSending(false)
    if (!ok) return
    setPaid(true)
    setOrderId(id)
    setOrderPlaced(true)
    speakAssistant(`Payment successful. Please check ${buyerEmail} for your receipt and order details.`)
  }

  const handleConfirmCOD = async () => {
    setFormError('')
    if (!email.trim()) {
      setFormError('Please enter an email address for your receipt.')
      return
    }
    if (!isValidEmail(email.trim())) {
      setFormError('Please enter a valid email address.')
      return
    }

    setSending(true)
    const buyerEmail = email.trim()
    const id = `ORD-${Math.random().toString(36).slice(2, 9).toUpperCase()}`
    const ok = await sendReceipt(buyerEmail, id, 'Cash on Delivery')
    setSending(false)
    if (!ok) return
    setPaid(true)
    setOrderId(id)
    setOrderPlaced(true)
    speakAssistant(`Your order has been confirmed. Please check ${buyerEmail} for your receipt and delivery details.`)
  }

  const handleOrderComplete = () => {
    clearCart()
    setOrderPlaced(false)
    onClose()
  }

  const cardDisplayNumber = maskCardNumber(cardNumber).padEnd(19, '•')
  const cardDisplayName = cardName.trim() || 'CARDHOLDER NAME'
  const cardDisplayExpiry = expiry || 'MM/YY'

  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.close} onClick={onClose} aria-label="Close">✕</button>

        <div className={css.header}>
          <div>
            <h3 className={css.heading}>Checkout</h3>
            <p className={css.subheading}>Choose your payment method and complete your order securely.</p>
          </div>
          <div className={css.totalBadge}>{formatPrice(total)}</div>
        </div>

        {items.length === 0 ? (
          <p className={css.empty}>Your cart is empty. Add a product to continue.</p>
        ) : (
          <>
            <ul className={css.items}>
              {items.map(it => (
                <li key={it.id} className={css.item}>
                  <span>{it.name} x{it.qty}</span>
                  <strong>{formatPrice(it.price * it.qty)}</strong>
                </li>
              ))}
            </ul>

            <div className={css.methodTabs}>
              <button
                type="button"
                className={`${css.methodButton} ${method === 'card' ? css.active : ''}`}
                onClick={() => setMethod('card')}
              >
                Online Card Payment
              </button>
              <button
                type="button"
                className={`${css.methodButton} ${method === 'cod' ? css.active : ''}`}
                onClick={() => setMethod('cod')}
              >
                Cash on Delivery
              </button>
            </div>

            <div className={css.paymentPanel}>
              {method === 'card' ? (
                <div className={css.cardCheckout}>
                  <div className={css.cardPreviewWrapper}>
                    <div className={`${css.cardPreview} ${focusedField === 'cvv' ? css.flipped : ''}`}>
                      <div className={`${css.cardFace} ${css.cardFront}`}>
                        <div className={css.cardTopRow}>
                      <div className={css.cardBrand}>
                        <span className={css.cardLogo}>Leafora</span>
                        <span className={css.cardSub}>PLATINUM</span>
                      </div>
                      <div className={css.contactless}>
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>
                    <div className={css.chip} />
                    <div className={css.cardNumber}>{cardDisplayNumber}</div>
                        <div className={css.cardMeta}>
                          <div>
                            <span className={css.metaLabel}>Card Holder</span>
                            <p className={css.metaValue}>{cardDisplayName}</p>
                          </div>
                          <div>
                            <span className={css.metaLabel}>Expires</span>
                            <p className={css.metaValue}>{cardDisplayExpiry}</p>
                          </div>
                        </div>
                      </div>
                      <div className={`${css.cardFace} ${css.cardBack}`}>
                        <div className={css.magneticStrip} />
                        <div className={css.signatureRow}>
                          <span>CVV</span>
                          <strong>{cvv.padEnd(3, '•')}</strong>
                        </div>
                        <p className={css.cardBackNote}>Secure payment powered by premium banking UI.</p>
                      </div>
                    </div>
                  </div>

                  <form className={css.cardForm} onSubmit={handleCardPayment}>
                    <label className={css.fieldLabel}>
                      Card number
                      <input
                        type="tel"
                        inputMode="numeric"
                        placeholder="1234 5678 9012 3456"
                        value={maskCardNumber(cardNumber)}
                        onChange={(e) => setCardNumber(e.target.value.replace(/[^0-9]/g, '').slice(0, 16))}
                        onFocus={() => setFocusedField('number')}
                        onBlur={() => setFocusedField(null)}
                      />
                    </label>
                    <label className={css.fieldLabel}>
                      Name on card
                      <input
                        type="text"
                        placeholder="Cardholder name"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                      />
                    </label>
                    <div className={css.splitRow}>
                      <label className={css.fieldLabel}>
                        Expiry date
                        <input
                          type="tel"
                          inputMode="numeric"
                          placeholder="MM/YY"
                          value={expiry}
                          onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                          onFocus={() => setFocusedField('expiry')}
                          onBlur={() => setFocusedField(null)}
                        />
                      </label>
                      <label className={css.fieldLabel}>
                        CVV
                        <input
                          type="tel"
                          inputMode="numeric"
                          placeholder="123"
                          maxLength={4}
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
                          onFocus={() => setFocusedField('cvv')}
                          onBlur={() => setFocusedField(null)}
                        />
                      </label>
                    </div>

                    <label className={css.fieldLabel}>
                      Email for receipt
                      <input
                        type="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocusedField(null)}
                      />
                    </label>

                    {formError && <p className={css.fieldError}>{formError}</p>}
                    <button type="submit" className={css.payBtn} disabled={sending}>
                      {sending ? 'Sending Receipt...' : `Pay ${formatPrice(total)}`}
                    </button>
                  </form>
                </div>
              ) : (
                <div className={css.codPanel}>
                  <div className={css.codInfo}>
                    <h4>Cash on Delivery</h4>
                    <p>Pay securely when the product arrives at your door. No card details required.</p>
                  </div>
                  <label className={css.fieldLabel}>
                    Email for receipt
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocusedField(null)}
                    />
                  </label>

                  {formError && <p className={css.fieldError}>{formError}</p>}
                  <button type="button" className={css.payBtn} onClick={handleConfirmCOD} disabled={sending}>
                    Confirm COD
                  </button>
                </div>
              )}
            </div>

            {paid && orderPlaced && (
              <div className={css.orderPopup} role="dialog" aria-label="Order success" aria-live="polite">
                <div className={css.confetti} aria-hidden />
                <div className={css.orderCard}>
                  <div className={css.orderCheck} aria-hidden>
                    <span className={css.checkStem} />
                    <span className={css.checkKick} />
                  </div>
                  <p className={css.successLabel}>{method === 'card' ? 'Payment successful' : 'Order confirmed'}</p>
                  <h4>{method === 'card' ? 'Thank you, your payment is complete' : 'Thank you, your order is confirmed'}</h4>
                  <p className={css.orderId}>Order ID: <strong>{orderId}</strong></p>
                  <p className={css.orderMeta}>{method === 'card' ? 'Payment: Online Card' : 'Payment: Cash on Delivery'}</p>
                  <p className={css.orderMeta}>Delivery: Processing — Estimated 3–5 business days</p>
                  <p className={css.emailHint}>Receipt email: <strong>{email.trim()}</strong></p>
                  <p className={css.orderTotal}>Total: {formatPrice(total)}</p>
                  {receiptSent && <div className={css.sentToast}>Receipt sent to {email.trim() || 'your email'}</div>}
                  <div className={css.orderActions}>
                    <button className={css.payBtn} onClick={handleOrderComplete}>OK</button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default CartModal
