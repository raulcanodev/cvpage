"use server"
import { connectDB } from "@/lib/mongodb";
import User from "@/models/Schemas";
import bcrypt from "bcryptjs";

interface RegisterValues {
  email?: string;
  password: string;
  repeatPassword: string;
}

// Register a new user in the database
export const register = async (values: RegisterValues) => {
    const { email, password, repeatPassword } = values;
  
    try {

      if (password !== repeatPassword) {
        throw new Error('Passwords do not match!');
      } else if (password.length < 8) {
        throw new Error('Password must be at least 8 characters long!');
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        throw new Error('Password must contain at least one special character!');
      }
  
      await connectDB();
      const userFound = await User.findOne({ email });
      if (userFound) {
        throw new Error('Email already exists!');
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        email,
        password: hashedPassword,
      });
      await user.save();
  
      return { success: true };  
    } catch (e :any) {
      throw new Error(e.message || 'Error registering user');  
    }
  };
  