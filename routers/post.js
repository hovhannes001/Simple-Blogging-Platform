const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { createPost, getPosts, getPostById, likePost, dislikePost} = require('../controllers/postController');
const { addComment,getCommentsByPost } = require('../controllers/commentController');

router.post('/', authMiddleware, createPost);
router.get('/', getPosts);
router.get('/:postId', getPostById);
router.post('/:postId/like', authMiddleware, likePost);
router.post('/:postId/dislike', authMiddleware, dislikePost);
router.post('/:postId/comments', authMiddleware, addComment);
router.get('/:postId/comments', getCommentsByPost);

module.exports = router;
