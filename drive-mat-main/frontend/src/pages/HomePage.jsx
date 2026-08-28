import React from 'react';
import { PhoneCall, MessageCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const phoneNumber = '8754429775';
  const waNumber = '918754429775';

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

  const cars = [
    { id: 1, name: 'Sedan', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=600' },
    { id: 2, name: 'SUV', image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&q=80&w=600' },
    { id: 3, name: 'Luxury Cabs', image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=600' },
    { id: 4, name: 'Others', image: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&q=80&w=600' },
  ];

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

      <section className="cars-section" style={{ padding: '4rem 2rem', backgroundColor: 'var(--background)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2.5rem', fontWeight: 'bold' }}
          >
            Our <span style={{ color: 'var(--accent)' }}>Cars</span>
          </motion.h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {cars.map((car, index) => (
              <motion.div 
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.05)', 
                  borderRadius: '16px', 
                  overflow: 'hidden',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
                }}
              >
                <img src={car.image} alt={car.name} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '12px', marginBottom: '1.5rem' }} />
                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: '600' }}>{car.name}</h3>
                <Link to="/book" className="btn btn-primary" style={{ width: '100%', textAlign: 'center', padding: '0.75rem', borderRadius: '8px', display: 'block' }}>
                  Book try
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
