const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory data store (resets on server restart / Vercel cold start)
const bookings = [];

// Admin Credentials
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin123';

// 1. Submit a Booking
app.post('/api/bookings', (req, res) => {
    const { name, mobile, pickup, drop, date, time, carType, serviceType } = req.body;
    
    const newBooking = {
        id: Date.now().toString(),
        name,
        mobile,
        pickup,
        drop,
        date,
        time,
        carType,
        serviceType,
        createdAt: new Date().toISOString()
    };
    
    bookings.push(newBooking);
    
    res.status(201).json({ success: true, message: 'Booking submitted successfully', booking: newBooking });
});

// 2. Admin Login
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    
    if (username === ADMIN_USER && password === ADMIN_PASS) {
        res.json({ success: true, token: 'fake-admin-token-123' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// 3. Get all Bookings
app.get('/api/bookings', (req, res) => {
    const authHeader = req.headers['authorization'];
    if (authHeader === 'Bearer fake-admin-token-123') {
        // Sort by newest first
        res.json([...bookings].sort((a, b) => b.id - a.id));
    } else {
        res.status(403).json({ success: false, message: 'Unauthorized' });
    }
});

// 4. Delete a Booking
app.delete('/api/bookings/:id', (req, res) => {
    const authHeader = req.headers['authorization'];
    if (authHeader === 'Bearer fake-admin-token-123') {
        const { id } = req.params;
        const index = bookings.findIndex(b => b.id === id);
        
        if (index !== -1) {
            bookings.splice(index, 1);
            res.json({ success: true, message: 'Booking deleted' });
        } else {
            res.status(404).json({ success: false, message: 'Booking not found' });
        }
    } else {
        res.status(403).json({ success: false, message: 'Unauthorized' });
    }
});

app.get('/', (req, res) => {
    res.send('Drive mat API is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
