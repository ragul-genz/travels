import React from 'react';
import { PhoneCall, MessageCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const phoneNumber = '8754428775';
  const waNumber = '918754428775';

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <>
      <section className="hero-section">
        <div className="hero-bg-blob"></div>
        <motion.div 
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1 variants={fadeUp} className="hero-title">
            The Ultimate <span className="hero-highlight">Travel</span> Experience
          </motion.h1>
          <motion.p variants={fadeUp} className="hero-subtitle">
            Experience unparalleled comfort, safety, and punctuality. From corporate travels to emergency rides, your journey matters to us.
          </motion.p>
          
          <motion.div variants={fadeUp} className="hero-actions">
            <Link to="/book" className="btn btn-glass btn-large">
              Book Your Ride <ArrowRight size={20} />
            </Link>
            <div className="contact-actions">
              <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noreferrer" className="action-circle whatsapp">
                <MessageCircle size={24} />
              </a>
              <a href={`tel:${phoneNumber}`} className="action-circle">
                <PhoneCall size={24} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default HomePage;
