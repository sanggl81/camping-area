const db = require('../config/db');

const postController = {
    createPost: async (req, res) => {
        const { title, content, image, video, location, id_user } = req.body;
        try {
            await db.execute(`
                INSERT INTO posts (title, content, image, video, location, id_user)
                VALUES (?, ?, ?, ?, ?, ?)
            `, [title, content, image, video, location, id_user]);
            res.status(201).json({ message: 'Post created successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    updatePost: async (req, res) => {
        const { id } = req.params;
        const { title, content, image, video, location, status } = req.body;
        try {
            await db.execute(`
                UPDATE posts
                SET title = ?, content = ?, image = ?, video = ?, location = ?, status = ?
                WHERE id = ?
            `, [title, content, image, video, location, status, id]);
            res.json({ message: 'Post updated successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    deletePost: async (req, res) => {
        const { id } = req.params;
        try {
            await db.execute('DELETE FROM posts WHERE id = ?', [id]);
            res.json({ message: 'Post deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    getPostById: async (req, res) => {
        const { id } = req.params;
        try {
            const [post] = await db.execute('SELECT * FROM posts WHERE id = ?', [id]);
            res.json(post);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    getAllPosts: async (req, res) => {
        try {
            const [posts] = await db.execute('SELECT * FROM posts');
            res.json(posts);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    searchPosts: async (req, res) => {
        const { query } = req.query;
        try {
            const [posts] = await db.execute('SELECT * FROM posts WHERE title LIKE ?', [`%${query}%`]);
            res.json(posts);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    approvePost: async (req, res) => {
        const { id } = req.params;
        try {
            await db.execute('UPDATE posts SET status = "approved" WHERE id = ?', [id]);
            res.json({ message: 'Post approved successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    getPostsByUserId: async (req, res) => {
        const { user_id } = req.params;
        try {
            const [posts] = await db.execute('SELECT * FROM posts WHERE id_user = ?', [user_id]);
            res.json(posts);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    denyPost: async (req, res) => {
        const { id } = req.params;
        try {
            await db.execute('UPDATE posts SET status = "denied" WHERE id = ?', [id]);
            res.json({ message: 'Post denied successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = postController;
