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
  customDomain: string;
  description: string;
  location: string;
  phone: string;
  profileImage: string;
  website: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  github: string;
  email2: string;
  services: mongoose.Types.ObjectId[]; // Reference to the Service model
  isRegistered: boolean;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema for the service model
const ServiceSchema = new Schema<Service>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be a positive number"],
    },
    description: {
      type: String,
      default: "No description provided",
    },
  },
  {
    timestamps: true,
  }
);

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
      default: "I'm using hitme.to!",
    },
    customDomain: {
      type: String,
    },
    location: {
      type: String,
    },
    phone: {
      type: String,
    },
    profileImage: {
      type: String,
    },
    website: {
      type: String,
    },
    twitter: {
      type: String,
    },
    instagram: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    github: {
      type: String,
    },
    email2: {
      type: String,
    },
    services: [{
      type: Schema.Types.ObjectId,
      ref: "Service",
    }],
    isRegistered: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

// Define the model for the Service
const Service = mongoose.models?.Service || model<Service>("Service", ServiceSchema);
export { Service };

// Define the model for the User
const User = mongoose.models?.User || model<UserDocument>("User", UserSchema);
export default User;