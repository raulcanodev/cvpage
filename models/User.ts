import mongoose, { Schema, model } from "mongoose";

// Interface definition for the Service document
interface Service {
  title: string;
  price: number;
  description: string;
}

// Interface definition for the User document
export interface UserDocument {
  _id: string;
  email: string;
  password: string;
  name: string;
  description: string;
  customDomain: string;
  phone: string;
  profileImage: string;
  services: Service[];
  isRegistered: boolean;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema for the service model
const ServiceSchema = new Schema<Service>({
  title: {
    type: String,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
});

// Define the schema for the user model
const UserSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    customDomain: {
      type: String,
    },
    services: {
      type: [ServiceSchema], // Embed the service schema
      default: [],
    },
    isRegistered: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Si el modelo ya está creado, úsalo. De lo contrario, crea un nuevo modelo
const User = mongoose.models?.User || model<UserDocument>("User", UserSchema);
export default User;