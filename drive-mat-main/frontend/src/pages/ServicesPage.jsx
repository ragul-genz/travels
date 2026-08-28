import React from 'react';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ServicesPage = () => {
  return (
    <div style={{ paddingTop: '8rem' }}>
      <section className="section">
        <motion.div 
          className="services-wrapper"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
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
            <Link to="/book" className="btn btn-primary btn-large">
              Book Ride
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default ServicesPage;
