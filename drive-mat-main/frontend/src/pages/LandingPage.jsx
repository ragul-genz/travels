import React, { useState, useEffect } from 'react';
import { PhoneCall, MessageCircle, Shield, Clock, MapPin, CheckCircle, ArrowRight, Car, Baby } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import BookingForm from '../components/BookingForm';

const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);

  const phoneNumber = '8754428775';
  const phoneNumber2 = '6382392516';
  const waNumber = '918754428775';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <div className="main-content">
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <a href="/" className="logo-container">
          <Car size={32} className="text-primary" style={{ color: 'var(--accent)' }} />
          <span>GO CABS</span>
        </a>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
          <button className="btn btn-outline" onClick={() => setIsModalOpen(true)}>
            Book Ride
          </button>
        </div>
      </nav>

      <section id="home" className="hero-section">
        <div className="hero-bg-blob"></div>
        
        <motion.div 
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1 variants={fadeUp} className="hero-title">
            The Ultimate <span className="text-gradient">Travel</span> Experience
          </motion.h1>
          <motion.p variants={fadeUp} className="hero-subtitle">
            Experience unparalleled comfort, safety, and punctuality. From corporate travels to emergency rides, your journey matters to us.
          </motion.p>
          
          <motion.div variants={fadeUp} className="hero-actions">
            <button className="btn btn-glass btn-large" onClick={() => setIsModalOpen(true)}>
              Book Your Ride <ArrowRight size={20} />
            </button>
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

      <section id="about" className="section about-section">
        <div className="about-content">
          <motion.div 
            className="about-text"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
          >
            <h2 className="section-title">Excellence in Motion</h2>
            <p className="section-subtitle">We redefine luxury and reliability in every journey.</p>
            <p className="about-desc">
              With years of experience in premium chauffeur and transport services, GO CABS ensures that every ride is not just a journey, but an experience in unmatched comfort and absolute safety. Whether it's a quick airport transfer or a lavish wedding event, our fleet is meticulously maintained and our drivers are professionally trained to prioritize your time and peace of mind.
            </p>
            <div className="about-stats">
              <div>
                <strong>10+</strong>
                <span>Years Experience</span>
              </div>
              <div>
                <strong>50+</strong>
                <span>Premium Vehicles</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="features-grid"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
          >
            {[
              { icon: <Clock size={28} />, title: "Zero Wait Time", desc: "Our drivers arrive 10 minutes early. Your time is our priority." },
              { icon: <Shield size={28} />, title: "Highest Safety", desc: "Sanitized vehicles and background-checked professional drivers." },
              { icon: <MapPin size={28} />, title: "Anywhere, Anytime", desc: "City transfers to outstation trips, available 24/7." }
            ].map((feature, i) => (
              <motion.div key={i} className="feature-card" variants={fadeUp}>
                <div className="feature-icon-wrapper">{feature.icon}</div>
                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="services" className="section">
        <motion.div 
          className="services-wrapper"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div>
            <h2>Tailored For You</h2>
            <p>From a quick run to the airport to an elegant arrival at a wedding, we have the perfect vehicle and service for your needs.</p>
            
            <ul className="service-list">
              <li><CheckCircle className="icon" size={24} /> Corporate Travel & Events</li>
              <li><CheckCircle className="icon" size={24} /> Outstation Vacations</li>
              <li><CheckCircle className="icon" size={24} /> Airport Transfers</li>
              <li><CheckCircle className="icon" size={24} /> Premium Chauffeur Service</li>
              <li><CheckCircle className="icon" size={24} /> City Tours & Sightseeing</li>
              <li><CheckCircle className="icon" size={24} /> Wedding & Special Events</li>
            </ul>
          </div>
          <div className="services-card">
            <h3>Ready to experience the best?</h3>
            <button className="btn btn-primary btn-large" onClick={() => setIsModalOpen(true)}>
              Book Ride
            </button>
          </div>
        </motion.div>
      </section>

      <footer id="contact" className="footer">
        <div className="footer-grid" style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr' }}>
          <div className="footer-brand">
            <div className="logo-container">
              <Car size={32} className="text-primary" style={{ color: 'var(--accent)' }} />
              <span>GO CABS</span>
            </div>
            <p>Your trusted premium travel partner. Ensuring safety, comfort, and reliability for every mile.</p>
          </div>
          <div>
            <h4 className="footer-heading">Company</h4>
            <ul className="footer-links">
              <li><a href="#about">About Us</a></li>
              <li><a href="#services">Our Services</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-heading">Legal</h4>
            <ul className="footer-links">
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#refund">Refund Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-heading">Contact Us</h4>
            <ul className="footer-links">
              <li>
                <a href={`tel:${phoneNumber}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <PhoneCall size={18} /> +91 87544 28775
                </a>
              </li>
              <li>
                <a href={`tel:${phoneNumber2}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <PhoneCall size={18} /> +91 63823 92516
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${waNumber}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MessageCircle size={18} /> WhatsApp Us
                </a>
              </li>
              <li style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                <MapPin size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>No 3 sri nivas appartment, lake view street, L H nagar, Adambakkam, Chennai 600088</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} GO CABS. All rights reserved.</p>
        </div>
      </footer>

      {isModalOpen && <BookingForm onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default LandingPage;
