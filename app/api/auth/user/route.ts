import { connectDB } from "@/lib/mongodb";
import User from "@/models/Schemas";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json(); 
    
    await connectDB();

    await User.create({ name, email });

    return NextResponse.json({ message: "User created" });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}