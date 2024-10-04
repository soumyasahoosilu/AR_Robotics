const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth'); 
const router = express.Router();

// User Profile Route
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password'); 
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    
    res.json({
      name: user.name,
      email: user.email,
      age: user.age,
      address: user.address
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;

