import styles from './Footer.module.css'

const Footer = () => (
  <footer className={styles.footer}>
    <div className="container">
      <div className={styles.top}>
        <div className={styles.brand}>
          <a href="#" className={styles.logo}>
            <span className={styles.logoMark}>✦</span>
            Verdana
          </a>
          <p className={styles.tagline}>
            Handcrafted plant vases for<br />the thoughtful home.
          </p>
          <div className={styles.social}>
            {['Instagram', 'Pinterest', 'TikTok'].map(s => (
              <a key={s} href="#" className={styles.socialLink}>{s}</a>
            ))}
          </div>
        </div>

        <div className={styles.links}>
          {[
            {
              head: 'Shop',
              items: ['All Vases', 'New Arrivals', 'Bestsellers', 'Limited Editions', 'Gift Sets']
            },
            {
              head: 'Studio',
              items: ['Our Story', 'Process', 'Artisans', 'Sustainability', 'Press']
            },
            {
              head: 'Support',
              items: ['Shipping', 'Returns', 'Care Guide', 'FAQ', 'Contact']
            }
          ].map(col => (
            <div key={col.head} className={styles.col}>
              <h4 className={styles.colHead}>{col.head}</h4>
              <ul>
                {col.items.map(item => (
                  <li key={item}><a href="#">{item}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© 2025 Verdana Studio. All rights reserved.</p>
        <div className={styles.legal}>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
