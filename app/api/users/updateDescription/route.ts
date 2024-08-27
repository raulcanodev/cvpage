// app/api/users/updateDescription/route.js
"use server";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { z } from 'zod';  

// Define a validation schema for the description field
const descriptionSchema = z.string()
  .trim() // Remove leading/trailing whitespace
  .min(1, "Description cannot be empty") // Check for empty string
  .max(1000, "Description cannot exceed 1000 characters") // Check for max length
  .refine((description) => !/[<>]/.test(description), { // Check for '<' or '>' characters
    message: "Description cannot contain '<' or '>' characters",
  });

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
    }

    const userId = session.user._id;
    const { description } = await request.json();

    // Validate description field
    const parsedDescription = descriptionSchema.safeParse(description);
    if (!parsedDescription.success) {
      const errorMessages = parsedDescription.error.issues.map((issue) => issue.message);
      return new Response(JSON.stringify({ error: errorMessages }), { status: 400 });
    }

    // Connect to the database and find the user by ID to update the description
    await connectDB();

    const user = await User.findById(userId);
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    user.description = parsedDescription.data;
    await user.save();

    return new Response(JSON.stringify({ message: "Description updated successfully" }), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "Failed to update description" }), { status: 500 });
  }
}