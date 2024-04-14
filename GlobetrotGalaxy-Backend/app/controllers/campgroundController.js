const db = require('../config/db');

const campgroundController = {
    getAllCampgrounds: async (req, res) => {
        try {
            const [rows] = await db.execute('SELECT * FROM campgrounds');
            res.json(rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    getCampgroundById: async (req, res) => {
        try {
            const [rows] = await db.execute('SELECT * FROM campgrounds WHERE id = ?', [req.params.id]);
            if (rows.length > 0) {
                res.json(rows[0]);
            } else {
                res.status(404).json({ message: 'Campground not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    createCampground: async (req, res) => {
        const { name, address, description, image, amenities, price, gps_location, regulations, policies, id_user, status, max_guests } = req.body;
        try {
            await db.execute(`
                INSERT INTO campgrounds (name, address, description, image, amenities, price, gps_location, regulations, policies, id_user, status, max_guests)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `, [name, address, description, image, amenities, price, gps_location, regulations, policies, id_user, status, max_guests]);
            res.status(201).json({ message: 'Campground created successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },


    updateCampground: async (req, res) => {
        const { name, address, description, image, amenities, price, gps_location, regulations, policies, id_user, status, max_guests } = req.body;
        try {
            await db.execute(`
                UPDATE campgrounds
                SET name = ?, address = ?, description = ?, image = ?, amenities = ?, price = ?, gps_location = ?, regulations = ?, policies = ?, id_user = ?, status = ?, max_guests = ?
                WHERE id = ?
            `, [name, address, description, image, amenities, price, gps_location, regulations, policies, id_user, status, max_guests, req.params.id]);
            res.json({ message: 'Campground updated successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },


    deleteCampground: async (req, res) => {
        try {
            await db.execute('DELETE FROM campgrounds WHERE id = ?', [req.params.id]);
            res.json({ message: 'Campground deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    searchCampgrounds: async (req, res) => {
        const { query } = req.query;
        try {
            const [rows] = await db.execute('SELECT * FROM campgrounds WHERE name LIKE ?', [`%${query}%`]);
            res.json(rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    approveCampground: async (req, res) => {
        const { id } = req.params;
        try {
            await db.execute('UPDATE campgrounds SET status = "approved" WHERE id = ?', [id]);
            res.json({ message: 'Campground approved successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    denyCampground: async (req, res) => {
        const { id } = req.params;
        try {
            await db.execute('UPDATE campgrounds SET status = "denied" WHERE id = ?', [id]);
            res.json({ message: 'Campground denied successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },


    searchCampgroundsAdvanced: async (req, res) => {
        const { location, max_guests, status } = req.query;
        let queryParams = [];
        let queryString = 'SELECT * FROM campgrounds WHERE 1=1';

        if (location) {
            queryString += ' AND address LIKE ?';
            queryParams.push(`%${location}%`);
        }

        if (max_guests) {
            queryString += ' AND max_guests >= ?';
            queryParams.push(max_guests);
        }

        if (status) {
            queryString += ' AND status = ?';
            queryParams.push(status);
        }

        try {
            const [rows] = await db.execute(queryString, queryParams);
            res.json(rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    getCampgroundsByUserId: async (req, res) => {
        const { user_id } = req.params;
        try {
            const [rows] = await db.execute('SELECT * FROM campgrounds WHERE id_user = ?', [user_id]);
            res.json(rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = campgroundController;
