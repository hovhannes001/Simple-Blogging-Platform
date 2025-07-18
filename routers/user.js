const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { registerUser, loginUser, updateUserProfile } = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/profile', authMiddleware, updateUserProfile);

module.exports = router;
