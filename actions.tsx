"use server";
import { cookies } from "next/headers";

// Server actions run on the server, so UI popups must be handled on the client.
// This action strictly performs the logout side-effect (delete cookie).
export const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("Authorization");
};
