import mongoose, { Schema, model } from "mongoose";

// Interface definition for the Service document
interface Service {
  title: string;
  price: string;
  description: string;
  category: string;
  active: boolean;
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
  avatar: string;
  website: string;
  twitterUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  githubUrl: string;
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
    },
    price: {
      type: String,
      min: [0, "Price must be a positive number"],
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
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
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    password: {
      type: String,
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
    location: {
      type: String,
    },
    phone: {
      type: String,
    },
    avatar: {
      type: String,
    },
    website: {
      type: String,
    },
    twitterUrl: {
      type: String,
    },
    instagramUrl: {
      type: String,
    },
    linkedinUrl: {
      type: String,
    },
    githubUrl: {
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