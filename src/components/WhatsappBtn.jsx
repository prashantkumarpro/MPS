import React from 'react'
import '../styles/WhatsappBtn.css'

const WhatsappBtn = () => {
  return (
    <div> 
      <a
      href="https://wa.me/9006756153" // Replace with your WhatsApp number
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-button"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
        alt="WhatsApp"
        className="whatsapp-icon"
      />
    </a>
    </div>
  )
}

export default WhatsappBtn