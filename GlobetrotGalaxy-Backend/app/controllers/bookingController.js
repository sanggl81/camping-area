const db = require('../config/db');

const bookingController = {
    getAllBookings: async (req, res) => {
        try {
            const [rows] = await db.execute('SELECT * FROM bookings');
            res.json(rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    getBookingById: async (req, res) => {
        try {
            const [rows] = await db.execute('SELECT * FROM bookings WHERE id = ?', [req.params.id]);
            if (rows.length > 0) {
                res.json(rows[0]);
            } else {
                res.status(404).json({ message: 'Booking not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    createBooking: async (req, res) => {
        const { campground_id, user_id, start_date, end_date, total_price, quantity } = req.body;
        try {
            await db.execute(`
                INSERT INTO bookings (campground_id, user_id, start_date, end_date, total_price, quantity)
                VALUES (?, ?, ?, ?, ?, ?)
            `, [campground_id, user_id, start_date, end_date, total_price, quantity]);
            res.status(201).json({ message: 'Booking created successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    updateBooking: async (req, res) => {
        const { campground_id, user_id, start_date, end_date, total_price, quantity } = req.body;
        try {
            await db.execute(`
                UPDATE bookings
                SET campground_id = ?, user_id = ?, start_date = ?, end_date = ?, total_price = ?, quantity = ?
                WHERE id = ?
            `, [campground_id, user_id, start_date, end_date, total_price, quantity, req.params.id]);
            res.json({ message: 'Booking updated successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    deleteBooking: async (req, res) => {
        try {
            await db.execute('DELETE FROM bookings WHERE id = ?', [req.params.id]);
            res.json({ message: 'Booking deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    
    getBookingsByUser: async (req, res) => {
        const userId = req.params.userId;
        try {
            const [rows] = await db.execute('SELECT * FROM bookings WHERE user_id = ?', [userId]);
            res.json(rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = bookingController;
