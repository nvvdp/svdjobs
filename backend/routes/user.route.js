import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/user.controller.js';
import verifyToken from '../middleware/auth.js';

const router = express.Router();

// User registration route
router.post('/register', registerUser);

// User login route
router.post('/login', loginUser);

// Get user profile route
router.get('/profile', verifyToken, getUserProfile);

export default router;