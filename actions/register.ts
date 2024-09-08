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
          return {
              error: 'Passwords do not match!'
          }
      }

      await connectDB();
      const userFound = await User.findOne({ email });
      if(userFound){
          return {
              error: 'Email already exists!'
          }
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({
        email,
        password: hashedPassword,
      });
      await user.save();

  }catch(e){
      console.log(e);
  }
}