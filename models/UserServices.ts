import  mongoose, { Schema, model } from  "mongoose";
import { UserDocument } from  "./User";

// Define interace for the UserServices model
export interface UserServicesDocument {
  _id: string;
  user: mongoose.Types.ObjectId;
  title: string;
  description: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema for the UserServices model
const UserServicesSchema = new Schema<UserServicesDocument>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, "Title is required"]
  },
  description: {
    type: String,
    required: [true, "Description is required"]
  },
  price: {
    type: Number,
    required: [true, "Price is required"]
  }
},
{
  timestamps: true,
}
);

const UserServices = mongoose.models?.UserServices || model<UserServicesDocument>('UserServices', UserServicesSchema);
export default UserServices;