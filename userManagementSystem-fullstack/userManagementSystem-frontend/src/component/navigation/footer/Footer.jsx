import React from 'react'
import "./Footer.css"

const Footer = () => {
  return (
    <section className='footer-section'>
      <div className="footer-container">
        <p className='intro-text'>Reach Out.</p>
        <h2 className='sub-intro'>global5050conceptsnigltd@yahoo.com</h2>
        <div className="footer-card-box">
          <div className="footer-card">
            <p>Head Office</p>
            <span className='foot-text'>97 Port Harcourt Rd beside Gtbank owerri Imo state</span>
          </div>
          <div className="footer-card footer-center">
            <span>Home</span>
            <span>About</span>
            <span>Testimonials</span>
            <span>Contact Us</span>
          </div>
          <div className="footer-card ">
            <p>Call Us</p>
            <span className='foot-text'>090GLOBAL5050</span>
          </div>
        
        </div>
      </div>
    </section>
  )
}

export default Footer
