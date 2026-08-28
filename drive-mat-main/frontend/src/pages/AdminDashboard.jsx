import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, Calendar, Car, Eye, Trash2 } from 'lucide-react';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
    
    // Auto-refresh bookings every 2 seconds
    const intervalId = setInterval(() => {
      fetchBookings(true);
    }, 2000);
    
    return () => clearInterval(intervalId);
  }, []);

  const fetchBookings = async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      const token = localStorage.getItem('adminToken');
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      
      const response = await axios.get(`${API_URL}/api/bookings?t=${new Date().getTime()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setBookings(response.data);
    } catch (err) {
      if (err.response?.status === 403 || err.response?.status === 401) {
        handleLogout();
      } else {
        setError('Failed to fetch bookings');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this enquiry?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      await axios.delete(`${API_URL}/api/bookings/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBookings(bookings.filter(b => b.id !== id));
    } catch (err) {
      alert('Failed to delete booking');
    }
  };

  const getServiceBadgeClass = (type) => {
    const t = type?.toLowerCase() || '';
    if (['event', 'emergency', 'corporate', 'vacation'].includes(t)) {
      return `badge ${t}`;
    }
    return 'badge default';
  };

  const todayBookings = bookings.filter(b => {
    const bookingDate = new Date(b.createdAt).toDateString();
    return bookingDate === new Date().toDateString();
  });

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-logo">
          <Car size={24} className="text-primary" />
          <span className="logo-text">Go Cabz</span>
        </div>
        <nav className="sidebar-nav">
          <a href="#" className="nav-item active"><LayoutDashboard size={20} /> Dashboard</a>
        </nav>
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="btn logout-btn">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <h1 className="admin-page-title">Overview</h1>
            <p className="admin-page-subtitle">Welcome back, Admin!</p>
          </div>
        </header>

        {error && <div className="alert alert-error">{error}</div>}

        <div className="dashboard-stats">
          <div className="stat-card">
            <div className="stat-card-icon" style={{backgroundColor: '#EFF6FF', color: '#3B82F6'}}>
              <Calendar size={24} />
            </div>
            <div className="stat-card-info">
              <h3>Total Enquiries</h3>
              <p>{bookings.length}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-card-icon" style={{backgroundColor: '#ECFDF5', color: '#10B981'}}>
              <Calendar size={24} />
            </div>
            <div className="stat-card-info">
              <h3>Today's Enquiries</h3>
              <p>{todayBookings.length}</p>
            </div>
          </div>
        </div>

        <div className="table-wrapper">
          <div className="table-header">
            <h2>Recent Enquiries</h2>
          </div>
          <div className="table-container">
            {loading ? (
              <div className="loading-state">Loading enquiries...</div>
            ) : bookings.length === 0 ? (
              <div className="empty-state">
                <Car size={48} className="text-secondary" style={{opacity: 0.5, marginBottom: '1rem'}} />
                <p>No enquiries found yet.</p>
              </div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Received At</th>
                    <th>Customer Details</th>
                    <th>Service Type</th>
                    <th>Car Type</th>
                    <th>Route</th>
                    <th>Schedule</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking, index) => (
                    <tr key={booking.id}>
                      <td>{index + 1}</td>
                      <td>
                        <div style={{fontSize: '0.9rem', color: 'var(--text-muted)'}}>
                          {new Date(booking.createdAt).toLocaleString('en-US', {
                            month: 'short', day: 'numeric', year: 'numeric',
                            hour: 'numeric', minute: 'numeric', hour12: true
                          })}
                        </div>
                      </td>
                      <td>
                        <div className="customer-cell">
                          <div className="avatar-small">{booking.name.charAt(0).toUpperCase()}</div>
                          <div>
                            <div className="customer-name">{booking.name}</div>
                            <div className="customer-mobile">{booking.mobile}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={getServiceBadgeClass(booking.serviceType)}>
                          {booking.serviceType}
                        </span>
                      </td>
                      <td>
                        <div style={{fontWeight: '600', color: 'var(--text-main)'}}>
                          {booking.carType}
                        </div>
                      </td>
                      <td>
                        <div className="route-point" style={{fontSize: '0.9rem', marginBottom: '0.25rem'}}>
                          <span style={{color: '#3B82F6', fontWeight: '700', marginRight: '0.5rem'}}>Pickup</span> {booking.pickup}
                        </div>
                        <div className="route-point" style={{fontSize: '0.9rem'}}>
                          <span style={{color: '#10B981', fontWeight: '700', marginRight: '0.5rem'}}>Drop</span> {booking.drop}
                        </div>
                      </td>
                      <td>
                        <div style={{fontSize: '0.9rem', color: 'var(--text-muted)'}}>
                          {booking.date && booking.time ? (
                            new Date(`${booking.date}T${booking.time}`).toLocaleString('en-US', {
                              month: 'short', day: 'numeric', year: 'numeric',
                              hour: 'numeric', minute: 'numeric', hour12: true
                            })
                          ) : `${booking.date} ${booking.time}`}
                        </div>
                      </td>
                      <td>
                        <div style={{display: 'flex', gap: '0.5rem'}}>
                          <button 
                            title="View Receipt"
                            onClick={() => {
                              setSelectedBooking(booking);
                              setViewModalOpen(true);
                            }}
                            style={{background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer', padding: '0.25rem'}}
                          >
                            <Eye size={18} />
                          </button>
                          <button 
                            title="Delete"
                            onClick={() => handleDelete(booking.id)}
                            style={{background: 'transparent', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '0.25rem'}}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>

      {/* Receipt Modal */}
      {viewModalOpen && selectedBooking && (
        <div className="receipt-modal-overlay" onClick={() => setViewModalOpen(false)}>
          <div className="receipt-modal" onClick={e => e.stopPropagation()}>
            <div className="receipt-header">
              <h2>Booking Details</h2>
              <p>Go Cabz - The Ultimate Travel Experience</p>
              <p>Thank you for choosing us!</p>
            </div>
            <div className="receipt-body">
              <div className="receipt-row">
                <span className="receipt-label">Customer Name</span>
                <span className="receipt-value">{selectedBooking.name}</span>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">Mobile Number</span>
                <span className="receipt-value">{selectedBooking.mobile}</span>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">Service Type</span>
                <span className="receipt-value" style={{textTransform: 'capitalize'}}>{selectedBooking.serviceType}</span>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">Car Preference</span>
                <span className="receipt-value">{selectedBooking.carType}</span>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">Route</span>
                <span className="receipt-value">{selectedBooking.pickup} ➔ {selectedBooking.drop}</span>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">Schedule</span>
                <span className="receipt-value">
                  {selectedBooking.date && selectedBooking.time ? (
                    new Date(`${selectedBooking.date}T${selectedBooking.time}`).toLocaleString('en-US', {
                      month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true
                    })
                  ) : `${selectedBooking.date} at ${selectedBooking.time}`}
                </span>
              </div>
              <div className="receipt-row">
                <span className="receipt-label">Received On</span>
                <span className="receipt-value">
                  {new Date(selectedBooking.createdAt).toLocaleString('en-US', {
                    month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true
                  })}
                </span>
              </div>
            </div>
            <div className="receipt-footer">
              <button className="btn btn-primary receipt-close-btn" onClick={() => setViewModalOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
