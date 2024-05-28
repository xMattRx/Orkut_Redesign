import { Request, Response } from 'express';
import User from '../models/userModel';

export const registerUser = async (req: Request, res: Response) => {
  const { email, password, rememberPassword } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ email, password, rememberPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
    res.status(200).json({ message: 'User logged in successfully', userId: user._id });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in user', error });
  }
};
