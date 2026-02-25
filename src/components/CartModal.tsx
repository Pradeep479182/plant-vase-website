import React, { useState } from 'react'
import css from './CartModal.tsx'

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
  const [method, setMethod] = useState<'card' | 'cod' | null>(null)
  const [paid, setPaid] = useState(false)

  if (!open) return null

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault()
    // mock payment
    setPaid(true)
    setTimeout(() => {
      clearCart()
    }, 800)
  }

  const handleConfirmCOD = () => {
    setPaid(true)
    setTimeout(() => {
      clearCart()
    }, 800)
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

            <div className={css.totalRow}>
              <span>Total</span>
              <strong className={css.totalPrice}>{formatPrice(total)}</strong>
            </div>

            <div className={css.payMethods}>
              <button
                className={`${css.methodBtn} ${method === 'card' ? css.active : ''}`}
                onClick={() => setMethod('card')}
              >
                Card Payment
              </button>
              <button
                className={`${css.methodBtn} ${method === 'cod' ? css.active : ''}`}
                onClick={() => setMethod('cod')}
              >
                Cash on Delivery
              </button>
            </div>

            <div className={css.methodArea}>
              {method === 'card' && !paid && (
                <form className={css.cardForm} onSubmit={handlePay}>
                  <label>
                    Card number
                    <input required placeholder="4242 4242 4242 4242" />
                  </label>
                  <label>
                    Expiry
                    <input required placeholder="MM/YY" />
                  </label>
                  <label>
                    CVC
                    <input required placeholder="CVC" />
                  </label>
                  <button type="submit" className={css.payBtn}>Pay {formatPrice(total)}</button>
                </form>
              )}

              {method === 'cod' && !paid && (
                <div className={css.codWrap}>
                  <p>Confirm Cash on Delivery. You will pay when the courier arrives.</p>
                  <button className={css.payBtn} onClick={handleConfirmCOD}>Confirm COD</button>
                </div>
              )}

              {paid && (
                <div className={css.success}>
                  <div className={css.check}>✓</div>
                  <div>
                    <p className={css.successTitle}>Order confirmed</p>
                    <p className={css.successSub}>We'll email you order details shortly.</p>
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