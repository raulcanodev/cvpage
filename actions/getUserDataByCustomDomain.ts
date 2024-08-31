"use server";
import { getUserDataByCustomDomain } from "@/lib/mongodb";

export const getUserDataByCustomDomainTest = async (customDomain: string) => {
  

  const response = await getUserDataByCustomDomain(customDomain);

  
  return JSON.stringify(response);
}