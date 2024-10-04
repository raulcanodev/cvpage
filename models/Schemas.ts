import mongoose, { Schema, model } from "mongoose";

// Interface definition for the Service document
interface Service {
  title: string;
  subtitle: string;
  price: string;
  description: string;
  category: string;
  link: string;
  date: string;
  dateEnd: string;
  location: string;
  image: string;
  active: boolean;
}

// Interface definition for the User document
export interface User {
  _id: mongoose.Types.ObjectId;
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
  emailContact: string;
  services: mongoose.Types.ObjectId[]; // Reference to the Service model
  isRegistered: boolean;
  role: string;
  pageColor: string;
  pageFont: string;
  premium: boolean;
  createdAt: Date;
  updatedAt: Date;
  resetToken?: string;
}

// Define the schema for the service model
const ServiceSchema = new Schema<Service>(
  {
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    price: {
      type: String,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
    },
    link: {
      type: String,
    },
    date: {
      type: String,
    },
    dateEnd: {
      type: String,
    },
    location: {
      type: String,
    },
    image: {
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
const UserSchema = new Schema<User>(
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
    emailContact: {
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
    pageColor: {
      type: String,
    },
    pageFont: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
    premium: {
      type: Boolean,
      default: false,
    },
    resetToken: {
      type: String,
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
const User = mongoose.models?.User || model<User>("User", UserSchema);
export default User;