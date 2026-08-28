import React from 'react';
import { Car, PhoneCall, MessageCircle, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const phoneNumber = '8754429775';
  const phoneNumber2 = '6382392516';
  const waNumber = '918754429775';

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <Link to="/" className="logo-container" style={{ color: 'white', textDecoration: 'none' }}>
            <Car size={32} className="text-primary" style={{ color: 'var(--accent)' }} />
            <span>Go Cabz</span>
          </Link>
          <p>Your trusted premium travel partner. Ensuring safety, comfort, and reliability for every mile.</p>
        </div>
        <div>
          <h4 className="footer-heading">Company</h4>
          <ul className="footer-links">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/services">Our Services</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="footer-heading">Legal</h4>
          <ul className="footer-links">
            <li><Link to="#">Privacy Policy</Link></li>
            <li><Link to="#">Terms of Service</Link></li>
            <li><Link to="#">Refund Policy</Link></li>
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
            <li style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: 'rgba(255,255,255,0.7)' }}>
              <MapPin size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>No 3 sri nivas appartment, lake view street, L H nagar, Adambakkam, Chennai 600088</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Go Cabz. All rights reserved.</p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.5)' }}>Developed by : GenZ Neural X &amp; Win Tech</p>
      </div>
    </footer>
  );
};

export default Footer;
