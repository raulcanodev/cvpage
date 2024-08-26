// app/api/users/updateDescription/route.js
"use server";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth"; 

export async function PUT(request: any) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
    }
   

    const userId = session.user._id.toString();
    const { description } = await request.json();

    await connectDB();

    const user = await User.findById(userId);
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    user.description = description;
    await user.save();

    return new Response(JSON.stringify({ message: "Description updated successfully" }), { status: 200 });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "Failed to update description" }), { status: 500 });
  }
}