import React from 'react';
import { PhoneCall, MessageCircle, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactPage = () => {
  const phoneNumber = '8754428775';
  const phoneNumber2 = '6382392516';
  const waNumber = '918754428775';

  return (
    <div style={{ paddingTop: '8rem', minHeight: '60vh' }}>
      <section className="section">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="section-header"
        >
          <h2 className="section-title">Get in Touch</h2>
          <p className="section-subtitle">We are here to assist you 24/7</p>
        </motion.div>

        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          
          <div className="feature-card" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div className="feature-icon-wrapper" style={{ margin: '0 auto 1.5rem' }}>
              <PhoneCall size={32} />
            </div>
            <h3>Call Us</h3>
            <p style={{ marginBottom: '0.5rem' }}><a href={`tel:${phoneNumber}`} style={{ color: 'var(--text-main)', textDecoration: 'none' }}>+91 87544 28775</a></p>
            <p><a href={`tel:${phoneNumber2}`} style={{ color: 'var(--text-main)', textDecoration: 'none' }}>+91 63823 92516</a></p>
          </div>

          <div className="feature-card" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div className="feature-icon-wrapper" style={{ margin: '0 auto 1.5rem', background: '#DCFCE7', color: '#16A34A' }}>
              <MessageCircle size={32} />
            </div>
            <h3>WhatsApp</h3>
            <p>
              <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noreferrer" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>
                Chat with us on WhatsApp
              </a>
            </p>
          </div>

          <div className="feature-card" style={{ flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div className="feature-icon-wrapper" style={{ margin: '0 auto 1.5rem' }}>
              <MapPin size={32} />
            </div>
            <h3>Visit Us</h3>
            <p>No 3 sri nivas appartment, lake view street, L H nagar, Adambakkam, Chennai 600088</p>
          </div>

        </div>
      </section>
    </div>
  );
};

export default ContactPage;
