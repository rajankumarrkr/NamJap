import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
  try {
    const { mobile, password } = req.body;

    // Validation
    if (!mobile || !password) {
      return res.status(400).json({ message: 'Please provide mobile and password' });
    }

    if (!/^\d{10}$/.test(mobile)) {
      return res.status(400).json({ message: 'Mobile number must be 10 digits' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Check if user already exists
    const userExists = await User.findOne({ mobile });

    if (userExists) {
      return res.status(400).json({ message: 'Mobile number already registered' });
    }

    // Create user
    const user = await User.create({
      mobile,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        mobile: user.mobile,
        token: generateToken(user._id),
        user: {
          id: user._id,
          mobile: user.mobile,
        },
      });
    }
  } catch (error) {
    console.error('Register Error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
  try {
    const { mobile, password } = req.body;

    // Validation
    if (!mobile || !password) {
      return res.status(400).json({ message: 'Please provide mobile and password' });
    }

    // Find user
    const user = await User.findOne({ mobile });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        mobile: user.mobile,
        token: generateToken(user._id),
        user: {
          id: user._id,
          mobile: user.mobile,
        },
      });
    } else {
      res.status(401).json({ message: 'Invalid mobile number or password' });
    }
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};
