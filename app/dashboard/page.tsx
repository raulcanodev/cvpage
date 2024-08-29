import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import React from "react";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  const currentUserId = session?.user?._id;
  
  const currentUserName = session?.user?.name;
  const currentUserEmail = session?.user?.email;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {currentUserName}</p>
      <p>Email: {currentUserEmail}</p>
      <p>User ID: {currentUserId}</p>
    </div>
  );
}