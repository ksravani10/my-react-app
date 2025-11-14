import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ success: false, error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, error: 'Invalid Password' });
    }

    // ✅ Generate JWT token
    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: '10d' }
    );

    // ✅ Send token in response
    res.status(200).json({
      success: true,
      message: "Login successful",
      token, // <--- send token here
      user: {
        _id: user._id,
        name: user.name,
        role: user.role
      }
    });
    
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

const verify = async (req, res) => {
  try {
    const user = req.user; 
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ success: false, error: "Server error" });
  } 
};

export { login, verify };
