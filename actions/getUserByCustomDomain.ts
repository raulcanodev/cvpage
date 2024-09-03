"use server";
import { fetchUserByCustomDomain } from "@/lib/mongodb";
import { notFound, redirect } from "next/navigation";


/**
 * Retrieves user data by custom domain.
 * 
 * @param customDomain - The custom domain to search for. (string)
 * @returns The user data if found, otherwise null.
 */
export const getUserByCustomDomain = async (customDomain: string) => {
  const response = await fetchUserByCustomDomain(customDomain);

  if (!response) {
    notFound();
  }

  return JSON.stringify(response);
}