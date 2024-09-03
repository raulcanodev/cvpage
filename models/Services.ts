import mongoose, { Schema, model } from "mongoose";

// Interface definition for the Service document
interface Service {
  title: string;
  price: number;
  description: string;
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

// Define the model for the Service
const Service = mongoose.models?.Service || model<Service>("Service", ServiceSchema);
export default Service;