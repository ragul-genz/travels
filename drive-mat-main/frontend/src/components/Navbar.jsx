import React, { useState, useEffect } from 'react';
import { Car } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      // Always show scrolled navbar style on non-home pages to ensure visibility
      if (location.pathname !== '/') {
        setScrolled(true);
      } else {
        setScrolled(window.scrollY > 50);
      }
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="logo-container">
        <Car size={32} className="text-primary" style={{ color: 'var(--accent)' }} />
        <span>Go Cabz</span>
      </Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/services">Services</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/book" className="btn btn-outline">
          Book Ride
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
