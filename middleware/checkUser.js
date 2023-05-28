import User from "../models/User.js";// Import your User model

// Middleware function to check if email exists in User model
const checkUser = async (req, res, next) => {
  try {
    const { email } = req.body; // Assuming email is passed in the request body
    const user = await User.findOne({ email: email });
    if (user) return res.status(400).json({ msg: "User exist. " });
    // Email is unique, proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle any errors that occurred during the process
    console.error('Error checking email existence:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export default checkUser