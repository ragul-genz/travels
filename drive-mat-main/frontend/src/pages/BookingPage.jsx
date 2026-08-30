import React, { useState } from 'react';
import axios from 'axios';
import { MapPin, Calendar, Clock, Car, Info, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const BookingPage = () => {
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
  const navigate = useNavigate();

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
    
    axios.post(`${API_URL}/api/bookings`, formData).catch(error => console.error('Booking error:', error));
    
    setStatus({ type: 'success', message: 'Booking submitted successfully!' });
    
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '4rem', minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#F8FAFC' }}>
      <motion.div 
        className="admin-card"
        style={{ maxWidth: '800px', width: '100%', margin: '0 1rem' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--primary)' }}>Book Your Ride</h2>
          <p style={{ color: 'var(--text-muted)' }}>Fill in the details below and we will confirm your booking instantly.</p>
        </div>
        
        {status.message && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`alert alert-${status.type}`}
          >
            {status.message}
          </motion.div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
            </div>
            <div className="form-group">
              <label>Mobile Number</label>
              <input type="tel" name="mobile" className="form-control" value={formData.mobile} onChange={handleChange} placeholder="+91 98765 43210" required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group input-with-icon">
              <label>Pickup Location</label>
              <div className="input-wrapper">
                <MapPin size={18} className="input-icon" />
                <input type="text" name="pickup" className="form-control pl-10" value={formData.pickup} onChange={handleChange} placeholder="Current location" required />
              </div>
            </div>
            <div className="form-group input-with-icon">
              <label>Drop Location</label>
              <div className="input-wrapper">
                <MapPin size={18} className="input-icon" style={{color: 'var(--accent)'}} />
                <input type="text" name="drop" className="form-control pl-10" value={formData.drop} onChange={handleChange} placeholder="Destination" required />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group input-with-icon">
              <label>Date</label>
              <div className="input-wrapper">
                <Calendar size={18} className="input-icon" />
                <input type="date" name="date" className="form-control pl-10" value={formData.date} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-group input-with-icon">
              <label>Time</label>
              <div className="input-wrapper">
                <Clock size={18} className="input-icon" />
                <input type="time" name="time" className="form-control pl-10" value={formData.time} onChange={handleChange} required />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group input-with-icon">
              <label>Car Type</label>
              <div className="input-wrapper">
                <Car size={18} className="input-icon" />
                <select name="carType" className="form-control pl-10" value={formData.carType} onChange={handleChange}>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Luxury Cabs">Luxury Cabs</option>
                  <option value="Others">Others</option>
                </select>
              </div>
            </div>
            
            <div className="form-group input-with-icon">
              <label>Service Type</label>
              <div className="input-wrapper">
                <Info size={18} className="input-icon" />
                <select name="serviceType" className="form-control pl-10" value={formData.serviceType} onChange={handleChange}>
                  <option value="Event">Event</option>
                  <option value="Emergency">Emergency</option>
                  <option value="Corporate">Corporate</option>
                  <option value="Vacation">Vacation</option>
                  <option value="Outstation">Outstation</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group input-with-icon">
              <label>Luggage</label>
              <div className="input-wrapper">
                <Briefcase size={18} className="input-icon" />
                <select name="luggage" className="form-control pl-10" value={formData.luggage} onChange={handleChange}>
                  <option value="Without Luggage">Without Luggage</option>
                  <option value="With Luggage">With Luggage</option>
                </select>
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-primary submit-btn btn-large" disabled={loading} style={{marginTop: '1.5rem', width: '100%'}}>
            {loading ? 'Confirming...' : 'Confirm Booking Request'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default BookingPage;
