import React from 'react';
import { Shield, Clock, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const AboutPage = () => {
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
    <div style={{ paddingTop: '8rem' }}>
      <section className="section about-section">
        <div className="about-content">
          <motion.div 
            className="about-text"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
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
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
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
    </div>
  );
};

export default AboutPage;
