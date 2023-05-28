import jwt from 'jsonwebtoken';
import User from "../models/User.js";
/* Register user */

export const register = async (req,res) => {
  try {
    const {
      email,
      password,
    } = req.body;
    const newUser = new User({
      email,
      password,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({error:err.message});
  }
}
/* Login */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = password === user.password
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET,{expiresIn:"1d"});
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};