const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Admin: Get All Users
router.get('/all-users', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id); 
    if (!user || !user.isAdmin) {
      return res.status(403).json({ msg: 'Access denied. Admins only.' });
    }

    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ message: 'Server error while fetching users.' });
  }
});

// Admin: Delete a user
router.post('/delete-user', authMiddleware, async (req, res) => {
  const { userId } = req.body; 

  try {
    const adminUser = await User.findById(req.user.id); 
    if (!adminUser || !adminUser.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json({ message: 'User deleted successfully!' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
