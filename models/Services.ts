import mongoose, { Schema, model } from "mongoose";

// Interface definition for the Service document
interface Service {
  title: string;
  description: string;
  category: string;
  price: number;
  link: string;
  imageUrl: string;
  index?: number;
  active: boolean;
}

// Define the schema for the service model
const ServiceSchema = new Schema<Service>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      default: "No description provided",
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be a positive number"],
    },
    link: {
      type: String,
      required: [true, "Link is required"],
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
    },
    index: {
      type: Number,
      required: [true, "Index is required"],
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

// Define the model for the Service
const Service = mongoose.models?.Service || model<Service>("Service", ServiceSchema);
export default Service;