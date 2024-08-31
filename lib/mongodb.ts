import mongoose from "mongoose";
import User from "@/models/User";

const { MONGODB_URI } = process.env;

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(MONGODB_URI as string);
    if (connection.readyState === 1) {
      return Promise.resolve(true);
    }
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const getUserById = async (id: string) => {
  await connectDB();
  return User.findById(id);
}

export const updateUserById = async (id: string, data: any) => {
  await connectDB();
  return User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

export const deleteUserById = async (id: string) => {
  await connectDB();
  return User.findByIdAndDelete(id);
}

/**
 * Retrieves user data by custom domain.
 * 
 * @param customDomain - The custom domain to search for.
 * @returns The user data.
 */
export const getUserDataByCustomDomain = async (customDomain: string) => {
  console.log("customDomain", customDomain);
  await connectDB();
  return User.findOne({ customDomain: customDomain });
}