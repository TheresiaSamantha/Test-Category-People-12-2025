"use client";

import { logout } from "@/actions";

export default function LogoutButton() {
  return (
    <button
      onClick={() => logout()}
      className="bg-red-500 text-white px-4 py-2 rounded mr-4"
    >
      <span>Logout</span>
    </button>
  );
}
