import mongoose from 'mongoose';
import User, { Service } from '@/models/Schemas';

const MONGODB_URI = process.env.MONGODB_URI;

// if (!MONGODB_URI) {
//   throw new Error('Please define the MONGODB_URI environment variable');
// }

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
    console.error('MongoDB Connection Error:', error);
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
  return User.findById(id); // TODO: Handle the case where the user is not found
};

/**
 * Retrieves user data by its email.
 *
 * @param email - The user email.
 * @returns The user data.
 */
export const fetchUserDataByEmail = async (email: string) => {
  try {
    await connectDB();
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Retrieves user data by its email.
 *
 * @param email - The user email.
 * @returns The user data.
 */
export const fetchUserByToken = async (token: string) => {
  await connectDB();
  return User.findOne({ resetToken: token });
};

/**
 * Updates user data by ID.
 *
 * @param id - The user ID.
 * @param data - The data to update.
 * @returns Updated user data or throws an error
 */
export const updateUserById = async (id: string, data: any) => {
  await connectDB();
  // TODO: Handle the case where the user is not found
  // TODO: Validate if services is > 99
  return User.findByIdAndUpdate(id, data, {
    new: true, // Return the updated document
    runValidators: true, // Run model validations
  });
};

/**
 * Deletes user data by ID.
 *
 * @param id - The user ID.
 * @returns  The deleted user data.
 */
export const deleteUserById = async (id: string) => {
  await connectDB();
  return User.findByIdAndDelete(id); // TODO: Handle the case where the user is not found
};

/**
 * Retrieves user data by custom domain.
 *
 * @param customDomain - The custom domain to search for.
 * @returns The user data if found, otherwise null.
 */
export const fetchUserByCustomDomain = async (customDomain: string) => {
  await connectDB();
  const user = await User.findOne({ customDomain: customDomain }); // TODO: Handle the case where the user is not found
  return user ? user : null;
};

/**
 * Retrieves service data by its ID.
 *
 * @param id - The user ID.
 * @returns A promise that resolves to the service data.
 */
export const fetchServiceById = async (id: string) => {
  await connectDB();
  return Service.findById(id); // TODO: Handle the case where the service is not found
};

/**
 * Creates a new service.
 *
 * @param data - The data to create the service.
 * @returns The created service data.
 */
export const createService = async (data: any) => {
  await connectDB();
  return Service.create(data);
};

/**
 * Updates service data by ID.
 *
 * @param id - The service ID.
 * @param data - The data to update.
 * @returns
 */
export const updateServiceById = async (id: string, data: any) => {
  await connectDB();
  return Service.findByIdAndUpdate(id, data, {
    // TODO: Handle the case where the service is not found
    new: true, // Return the updated document
    runValidators: true, // Run model validations
  });
};

/**
 * Deletes service data by ID.
 *
 * @param id - The service ID.
 * @returns  The deleted service data.
 */
export const deleteServiceById = async (id: string) => {
  await connectDB();
  return Service.findByIdAndDelete(id); // TODO: Handle the case where the service is not found
};

/**
 * Delete service in the user's services array.
 *
 * @param userId - The user ID.
 * @param serviceId - The service ID.
 * @returns The updated user data.
 */
export const deleteServiceFromUser = async (userId: string, serviceId: string) => {
  await connectDB();
  return User.findByIdAndUpdate(
    userId,
    {
      $pull: { services: serviceId },
    },
    {
      new: true,
      runValidators: true,
    }
  );
};

/**
 * Updates user domain, it has to be unique.
 *
 * @param id - The user ID.
 * @param data - The data to update.
 * @returns The updated user data.
 * @throws An error if the domain is already taken.
 */
export const updateCustomDomain = async (id: string, domain: string) => {
  await connectDB();
  const user = await User.findOne({ customDomain: domain });
  if (user) {
    throw new Error('Custom domain is already taken');
  }
  return User.findByIdAndUpdate(
    id,
    { customDomain: domain },
    {
      new: true,
      runValidators: true,
    }
  );
};

/**
 * Updates user premium status.
 *
 * @param email - The user email.
 * @param premium - The premium status.
 * @returns The updated user data.
 */
export const updateUserPremium = async (email: string, premium: boolean) => {
  console.log(" updateUserPremium email mongo", email);
  
  await connectDB();
  return User.findOneAndUpdate(
    { email },
    { premium },
    {
      new: true,
      runValidators: true,
    }
  );
};

/**
 * Saves the reset token to the user.
 *
 * @param email - The user email.
 * @param token - The reset token.
 * @returns The updated user data.
 */
export const saveResetToken = async (email: string, token: string) => {
  try {
    await connectDB();
    const user = await User.findOneAndUpdate(
      { email },
      { resetToken: token },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Invalidates the reset token.
 *
 * @param email - The user email.
 * @returns The updated user data.
 */
export const invalidateResetToken = async (email: string) => {
  await connectDB();
  return User.findOneAndUpdate(
    { email },
    { resetToken: '' },
    {
      new: true,
      runValidators: true,
    }
  );
};

/**
 * Updates the user password.
 *
 * @param email - The user email.
 * @param password - The new password.
 * @returns The updated user data.
 */
export const updatePassword = async (email: string, password: string) => {
  await connectDB();
  return User.findOneAndUpdate(
    { email },
    { password },
    {
      new: true,
      runValidators: true,
    }
  );
};

export const userCounter = async () => {
  await connectDB();
  return User.countDocuments();
}