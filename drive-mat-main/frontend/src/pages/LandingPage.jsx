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

  const phoneNumber = '8754429775';
  const phoneNumber2 = '6382392516';
  const waNumber = '918754429775';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const iconStyle = {
    background: 'rgba(75, 77, 255, 0.1)',
    color: 'var(--primary)',
    padding: '16px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <div className="main-content" style={{ backgroundColor: 'var(--bg-color)' }}>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <a href="/" className="logo-container" style={{ color: scrolled ? 'var(--text-main)' : 'white' }}>
          <Car size={32} style={{ color: scrolled ? 'var(--primary)' : 'white' }} />
          <span style={{ fontWeight: 800 }}>GO CABS</span>
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

      <section id="home" className="hero-section" style={{
        backgroundImage: `linear-gradient(135deg, rgba(75, 77, 255, 0.9), rgba(109, 61, 255, 0.8)), url('/hero-bg.jpg')`,
        backgroundBlendMode: 'overlay',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
      }}>
        <motion.div 
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1 variants={fadeUp} className="hero-title" style={{ fontSize: '6rem', letterSpacing: '-0.04em', textShadow: 'none' }}>
            The Ultimate <br /><span style={{ color: '#FFFFFF', textShadow: '0 4px 20px rgba(255,255,255,0.4)' }}>Travel</span> Experience
          </motion.h1>
          <motion.p variants={fadeUp} className="hero-subtitle" style={{ fontSize: '1.4rem', fontWeight: 400, opacity: 0.9 }}>
            Experience unparalleled comfort, safety, and punctuality. From corporate travels to emergency rides, your journey matters to us.
          </motion.p>
          
          <motion.div variants={fadeUp} className="hero-actions">
            <button className="btn btn-primary btn-large" onClick={() => setIsModalOpen(true)} style={{ fontWeight: 700, borderRadius: '40px', padding: '1.2rem 3rem' }}>
              Book Your Ride <ArrowRight size={20} />
            </button>
            <div className="contact-actions">
              <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noreferrer" className="action-circle whatsapp" style={{ background: 'white', color: '#25D366', borderColor: 'transparent' }}>
                <MessageCircle size={24} />
              </a>
              <a href={`tel:${phoneNumber}`} className="action-circle" style={{ background: 'white', color: 'var(--primary)', borderColor: 'transparent' }}>
                <PhoneCall size={24} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section id="about" className="section about-section" style={{ background: '#FFFFFF', padding: '10rem 6%' }}>
        <div className="about-content">
          <motion.div 
            className="about-text"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
          >
            <h2 className="section-title" style={{ color: 'var(--text-main)' }}>Excellence in Motion</h2>
            <p className="section-subtitle" style={{ color: 'var(--primary)' }}>We redefine luxury and reliability in every journey.</p>
            <p className="about-desc" style={{ color: 'var(--text-muted)' }}>
              With years of experience in premium chauffeur and transport services, GO CABS ensures that every ride is not just a journey, but an experience in unmatched comfort and absolute safety. Whether it's a quick airport transfer or a lavish wedding event, our fleet is meticulously maintained and our drivers are professionally trained to prioritize your time and peace of mind.
            </p>
            <div className="about-stats" style={{ display: 'flex', gap: '3rem', marginTop: '3rem' }}>
              <div>
                <strong style={{ fontSize: '3rem', color: 'var(--primary)', lineHeight: 1 }}>10+</strong>
                <span style={{ display: 'block', color: 'var(--text-muted)', fontWeight: 500 }}>Years Experience</span>
              </div>
              <div>
                <strong style={{ fontSize: '3rem', color: 'var(--primary)', lineHeight: 1 }}>50+</strong>
                <span style={{ display: 'block', color: 'var(--text-muted)', fontWeight: 500 }}>Premium Vehicles</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="features-grid"
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            style={{ display: 'grid', gap: '2rem' }}
          >
            {[
              { icon: <Clock size={28} />, title: "Zero Wait Time", desc: "Our drivers arrive 10 minutes early. Your time is our priority." },
              { icon: <Shield size={28} />, title: "Highest Safety", desc: "Sanitized vehicles and background-checked professional drivers." },
              { icon: <MapPin size={28} />, title: "Anywhere, Anytime", desc: "City transfers to outstation trips, available 24/7." }
            ].map((feature, i) => (
              <motion.div key={i} variants={fadeUp} style={{ 
                background: 'var(--surface)', 
                padding: '2rem', 
                borderRadius: '24px', 
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1.5rem',
                border: '1px solid var(--border)'
              }}>
                <div style={iconStyle}>{feature.icon}</div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>{feature.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.5 }}>{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="services" className="section" style={{ background: '#F8FAFC' }}>
        <motion.div 
          className="services-wrapper"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          style={{
            background: '#FFFFFF',
            borderRadius: '40px',
            padding: '5rem',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            gap: '4rem',
            alignItems: 'center'
          }}
        >
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Tailored For You</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '3rem' }}>From a quick run to the airport to an elegant arrival at a wedding, we have the perfect vehicle and service for your needs.</p>
            
            <ul className="service-list" style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {[
                "Corporate Travel & Events",
                "Outstation Vacations",
                "Airport Transfers",
                "Premium Chauffeur Service",
                "City Tours & Sightseeing",
                "Wedding & Special Events"
              ].map((item, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.05rem', fontWeight: 500, color: 'var(--text-main)' }}>
                  <div style={{ ...iconStyle, padding: '8px' }}>
                    <CheckCircle size={20} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="services-card" style={{
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)',
            padding: '4rem 3rem',
            borderRadius: '32px',
            color: 'white',
            textAlign: 'center',
            boxShadow: 'var(--shadow-xl)',
            minWidth: '350px'
          }}>
            <h3 style={{ fontSize: '2rem', color: 'white', marginBottom: '2rem' }}>Ready to experience the best?</h3>
            <button className="btn btn-outline btn-large" onClick={() => setIsModalOpen(true)} style={{ color: 'white', borderColor: 'white', width: '100%', borderRadius: '16px' }}>
              Book Ride Now
            </button>
          </div>
        </motion.div>
      </section>

      <footer id="contact" className="footer" style={{ background: '#000080', color: 'white', padding: '6rem 6% 2rem' }}>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '4rem', marginBottom: '4rem' }}>
          <div className="footer-brand">
            <div className="logo-container" style={{ color: 'white', marginBottom: '1.5rem' }}>
              <Car size={32} style={{ color: 'var(--primary-light)' }} />
              <span>GO CABS</span>
            </div>
            <p style={{ color: '#888', lineHeight: 1.8 }}>Your trusted premium travel partner. Ensuring safety, comfort, and reliability for every mile.</p>
          </div>
          <div>
            <h4 className="footer-heading" style={{ color: 'white', marginBottom: '1.5rem' }}>Company</h4>
            <ul className="footer-links" style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li><a href="#about" style={{ color: '#888', textDecoration: 'none' }}>About Us</a></li>
              <li><a href="#services" style={{ color: '#888', textDecoration: 'none' }}>Our Services</a></li>
              <li><a href="#contact" style={{ color: '#888', textDecoration: 'none' }}>Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-heading" style={{ color: 'white', marginBottom: '1.5rem' }}>Legal</h4>
            <ul className="footer-links" style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li><a href="#privacy" style={{ color: '#888', textDecoration: 'none' }}>Privacy Policy</a></li>
              <li><a href="#terms" style={{ color: '#888', textDecoration: 'none' }}>Terms of Service</a></li>
              <li><a href="#refund" style={{ color: '#888', textDecoration: 'none' }}>Refund Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-heading" style={{ color: 'white', marginBottom: '1.5rem' }}>Contact Us</h4>
            <ul className="footer-links" style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <li>
                <a href={`tel:${phoneNumber}`} style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#888', textDecoration: 'none' }}>
                  <div style={{ ...iconStyle, background: 'rgba(255,255,255,0.1)', color: 'white', padding: '8px' }}><PhoneCall size={16} /></div>
                  +91 87544 28775
                </a>
              </li>
              <li>
                <a href={`tel:${phoneNumber2}`} style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#888', textDecoration: 'none' }}>
                  <div style={{ ...iconStyle, background: 'rgba(255,255,255,0.1)', color: 'white', padding: '8px' }}><PhoneCall size={16} /></div>
                  +91 63823 92516
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${waNumber}`} style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#888', textDecoration: 'none' }}>
                  <div style={{ ...iconStyle, background: 'rgba(255,255,255,0.1)', color: '#25D366', padding: '8px' }}><MessageCircle size={16} /></div>
                  WhatsApp Us
                </a>
              </li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', color: '#888' }}>
                <div style={{ ...iconStyle, background: 'rgba(255,255,255,0.1)', color: 'white', padding: '8px', flexShrink: 0 }}><MapPin size={16} /></div>
                <span style={{ fontSize: '0.9rem', lineHeight: 1.5 }}>No 3 sri nivas appartment, lake view street, L H nagar, Adambakkam, Chennai 600088</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', textAlign: 'center', color: '#666' }}>
          <p>&copy; {new Date().getFullYear()} GO CABS. All rights reserved.</p>
        </div>
      </footer>

      {isModalOpen && <BookingForm onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default LandingPage;
