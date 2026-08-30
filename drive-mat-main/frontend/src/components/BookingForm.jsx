import React, { useState } from 'react';
import axios from 'axios';
import { X, MapPin, Calendar, Clock, Car, Info, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BookingForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    pickup: '',
    drop: '',
    date: '',
    time: '',
    carType: 'Sedan',
    serviceType: 'Event',
    luggage: 'Without Luggage'
  });
  
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const message = `New Booking Request:
Name: ${formData.name}
Mobile: ${formData.mobile}
Pickup: ${formData.pickup}
Drop: ${formData.drop}
Date: ${formData.date}
Time: ${formData.time}
Car Type: ${formData.carType}
Service: ${formData.serviceType}
Luggage: ${formData.luggage}`;

    const whatsappUrl = `https://wa.me/918754429775?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    
    // Fire and forget so it closes instantly
    axios.post(`${API_URL}/api/bookings`, formData).catch(error => console.error('Booking error:', error));
    
    setStatus({ type: 'success', message: 'Booking submitted successfully!' });
    
    // Close almost instantly
    setTimeout(() => {
      onClose();
    }, 150);
  };

  const inputStyle = {
    background: '#F5F5F5',
    border: 'none',
    borderRadius: '12px',
    padding: '14px 14px 14px 44px',
    width: '100%',
    fontSize: '1rem',
    color: 'var(--text-main)',
    outline: 'none',
    boxShadow: 'inset 0 0 0 1px transparent',
    transition: 'box-shadow 0.2s ease'
  };

  const inputContainerStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  };

  const iconStyle = {
    position: 'absolute',
    left: '14px',
    color: 'var(--text-muted)'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: 600,
    color: 'var(--text-main)',
    fontSize: '0.95rem'
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="modal-overlay" 
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(8px)',
          zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}
      >
        <motion.div 
          className="modal-content" 
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.95, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 30 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          style={{
            background: 'white', borderRadius: '24px', padding: '2.5rem',
            width: '90%', maxWidth: '650px', maxHeight: '90vh', overflowY: 'auto',
            boxShadow: 'var(--shadow-2xl)'
          }}
        >
          <style>{`
            .uipro-input:focus {
              box-shadow: inset 0 0 0 2px var(--primary) !important;
            }
          `}</style>
          
          <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '2rem', margin: 0, color: 'var(--text-main)' }}>Book Your Ride</h2>
            <button onClick={onClose} style={{ background: '#F5F5F5', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <X size={20} color="var(--text-main)" />
            </button>
          </div>
          
          <div className="modal-body">
            {status.message && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ background: 'rgba(37, 211, 102, 0.1)', color: '#25D366', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', fontWeight: 600 }}
              >
                {status.message}
              </motion.div>
            )}
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label style={labelStyle}>Full Name</label>
                  <input type="text" name="name" className="uipro-input" style={{...inputStyle, paddingLeft: '14px'}} value={formData.name} onChange={handleChange} placeholder="John Doe" required />
                </div>
                <div>
                  <label style={labelStyle}>Mobile Number</label>
                  <input type="tel" name="mobile" className="uipro-input" style={{...inputStyle, paddingLeft: '14px'}} value={formData.mobile} onChange={handleChange} placeholder="+91 98765 43210" required />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label style={labelStyle}>Pickup Location</label>
                  <div style={inputContainerStyle}>
                    <MapPin size={18} style={iconStyle} />
                    <input type="text" name="pickup" className="uipro-input" style={inputStyle} value={formData.pickup} onChange={handleChange} placeholder="Current location" required />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Drop Location</label>
                  <div style={inputContainerStyle}>
                    <MapPin size={18} style={{...iconStyle, color: 'var(--primary)'}} />
                    <input type="text" name="drop" className="uipro-input" style={inputStyle} value={formData.drop} onChange={handleChange} placeholder="Destination" required />
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label style={labelStyle}>Date</label>
                  <div style={inputContainerStyle}>
                    <Calendar size={18} style={iconStyle} />
                    <input type="date" name="date" className="uipro-input" style={inputStyle} value={formData.date} onChange={handleChange} required />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Time</label>
                  <div style={inputContainerStyle}>
                    <Clock size={18} style={iconStyle} />
                    <input type="time" name="time" className="uipro-input" style={inputStyle} value={formData.time} onChange={handleChange} required />
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label style={labelStyle}>Car Type</label>
                  <div style={inputContainerStyle}>
                    <Car size={18} style={iconStyle} />
                    <select name="carType" className="uipro-input" style={inputStyle} value={formData.carType} onChange={handleChange}>
                      <option value="Sedan">Sedan</option>
                      <option value="SUV">SUV</option>
                      <option value="Luxury Cabs">Luxury Cabs</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label style={labelStyle}>Service Type</label>
                  <div style={inputContainerStyle}>
                    <Info size={18} style={iconStyle} />
                    <select name="serviceType" className="uipro-input" style={inputStyle} value={formData.serviceType} onChange={handleChange}>
                      <option value="Event">Event</option>
                      <option value="Emergency">Emergency</option>
                      <option value="Corporate">Corporate</option>
                      <option value="Vacation">Vacation</option>
                      <option value="Outstation">Outstation</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label style={labelStyle}>Luggage</label>
                <div style={inputContainerStyle}>
                  <Briefcase size={18} style={iconStyle} />
                  <select name="luggage" className="uipro-input" style={inputStyle} value={formData.luggage} onChange={handleChange}>
                    <option value="Without Luggage">Without Luggage</option>
                    <option value="With Luggage">With Luggage</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-large" disabled={loading} style={{marginTop: '1rem', width: '100%', borderRadius: '16px'}}>
                {loading ? 'Confirming...' : 'Confirm Booking Request'}
              </button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookingForm;
