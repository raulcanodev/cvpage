import mongoose from "mongoose";
import User from "@/models/User";

const { MONGODB_URI } = process.env;

/**
 * Connects to the MongoDB database.
 * 
 * @returns A promise that resolves to a boolean indicating if the connection was successful.
 */
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

/**
 * Retrieves user data by its ID.
 * 
 * @param id - The user ID.
 * @returns The user data.
 */
export const fetchUserId = async (id: string) => {
  await connectDB();
  return User.findById(id);
}

/**
 * Updates user data by ID.
 * 
 * @param id - The user ID.
 * @param data - The data to update.
 * @returns 
 */
export const updateUserById = async (id: string, data: any) => {
  await connectDB();
  return User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

/**
 * Deletes user data by ID.
 * 
 * @param id - The user ID.
 * @returns  The deleted user data.
 */
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
/**
 * Retrieves user data by custom domain.
 * 
 * @param customDomain - The custom domain to search for.
 * @returns The user data if found, otherwise null.
 */
export const fetchUserByCustomDomain = async (customDomain: string) => {
  await connectDB();
  const user = await User.findOne({ customDomain: customDomain });
  return user ? user : null;
}