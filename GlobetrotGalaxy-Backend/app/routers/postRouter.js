const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.post('/', postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
router.get('/:id', postController.getPostById);
router.get('/', postController.getAllPosts);
router.get('/user/:user_id', postController.getPostsByUserId);
router.get('/search', postController.searchPosts);
router.put('/approve/:id', postController.approvePost);
router.put('/deny/:id', postController.denyPost);

module.exports = router;
