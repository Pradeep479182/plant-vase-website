import React, { useState } from 'react'
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

const formatPrice = (n: number) => `$${n.toFixed(2)}`

const CartModal: React.FC<Props> = ({ open, onClose, items, total, clearCart }) => {
  // Only Cash on Delivery is supported for now
  const [method, setMethod] = useState<'card' | 'cod' | null>('cod')
  const [paid, setPaid] = useState(false)
  const [email, setEmail] = useState('')
  const [receiptSent, setReceiptSent] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [sending, setSending] = useState(false)
  const [sentOnce, setSentOnce] = useState(false)

  if (!open) return null

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault()
    // mock payment
    setPaid(true)
    setTimeout(() => {
      clearCart()
      if (email) sendReceipt(email)
    }, 800)
  }

  const handleConfirmCOD = async () => {
    const emails = email.split(/[,;]\s*/).filter(e => e.trim())
    
    if (emails.length === 0) {
      setEmailError('Please enter at least one email address')
      return
    }

    const invalidEmails = emails.filter(e => !isValidEmail(e.trim()))
    if (invalidEmails.length > 0) {
      setEmailError(`Invalid email address(es): ${invalidEmails.join(', ')}`)
      return
    }

    setEmailError('')
    // Send receipt before clearing the cart to ensure items are included
    if (emails.length > 0 && !sending) {
      setSending(true)
      const ok = await sendReceipt(emails)
      setSending(false)
      if (ok) setSentOnce(true)
    }

    setPaid(true)
    setTimeout(() => {
      clearCart()
    }, 800)
  }

  const sendReceipt = async (recipients: string | string[]) => {
    const emailAddresses = Array.isArray(recipients) ? recipients.map(e => e.trim()) : [recipients]
    
    // Open email client with prefilled receipt
    try {
      const firstEmail = emailAddresses[0]
      const subject = encodeURIComponent(`Order Confirmation — ${formatPrice(total)}`)
      const itemsText = items.map(i => `${i.name} x${i.qty} — ${formatPrice(i.price * i.qty)}`).join('%0A')
      const body = encodeURIComponent(`Thank you for your order!%0A%0A${itemsText}%0A%0ATotal: ${formatPrice(total)}%0A%0AWe appreciate your purchase.`)
      const mailto = `mailto:${emailAddresses.join(';')}?subject=${subject}&body=${body}`
      const win = window.open(mailto, '_blank')
      if (!win) window.location.href = mailto
      setReceiptSent(true)
      setTimeout(() => setReceiptSent(false), 3200)
      return true
    } catch (err) {
      console.error('sendReceipt failed', err)
      return false
    }
  }

  const isValidEmail = (e: string) => {
    return /^\S+@\S+\.\S+$/.test(e)
  }

  return (
    <div className={css.backdrop} onClick={onClose}>
      <div className={css.modal} onClick={e => e.stopPropagation()}>
        <button className={css.close} onClick={onClose} aria-label="Close">✕</button>

        <h3 className={css.heading}>Your Cart</h3>

        {items.length === 0 ? (
          <p className={css.empty}>No items yet. Use Quick Add to add something.</p>
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



            <div className={css.payMethods}>
              <button
                className={`${css.methodBtn} ${method === 'cod' ? css.active : ''}`}
                onClick={() => setMethod('cod')}
              >
                Cash on Delivery
              </button>
            </div>

            <div className={css.methodArea}>
              {method === 'cod' && !paid && (
                <div className={css.codWrap}>
                  <p>Confirm Cash on Delivery. You will pay when the courier arrives.</p>
                  <div className={css.emailRow}>
                    <input
                      className={css.emailInput}
                      type="email"
                      placeholder="Enter email(s) for receipt (comma or semicolon separated)"
                      value={email}
                      onChange={e => { setEmail(e.target.value); setEmailError('') }}
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          const emails = email.split(/[,;]\s*/).filter(em => em.trim())
                          const validEmails = emails.filter(em => isValidEmail(em.trim()))
                          if (validEmails.length > 0 && !sending && !sentOnce) {
                            setSending(true)
                            sendReceipt(validEmails).then(ok => {
                              setSending(false)
                              if (ok) setSentOnce(true)
                            })
                          } else if (emails.length > 0 && validEmails.length === 0) {
                            setEmailError('Please enter valid email addresses')
                          }
                        }
                      }}
                      onBlur={() => {
                        const emails = email.split(/[,;]\s*/).filter(em => em.trim())
                        const validEmails = emails.filter(em => isValidEmail(em.trim()))
                        if (validEmails.length > 0 && !sending && !sentOnce) {
                          setSending(true)
                          sendReceipt(validEmails).then(ok => {
                            setSending(false)
                            if (ok) setSentOnce(true)
                          })
                        }
                      }}
                    />
                    {emailError && <p className={css.fieldError}>{emailError}</p>}
                  </div>
                  <button className={css.payBtn} onClick={handleConfirmCOD}>Confirm COD</button>
                </div>
              )}

              {paid && (
                <div className={css.success}>
                  <div className={css.check}>✓</div>
                  <div>
                    <p className={css.successTitle}>Order confirmed</p>
                    <p className={css.successSub}>We'll email you order details shortly.</p>
                    {receiptSent && <div className={css.sentToast}>Receipt sent to {email.split(/[,;]\s*/).filter(e => e.trim()).join(', ')}</div>}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default CartModal