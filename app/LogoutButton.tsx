"use client";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="text-sm text-red-500 border border-red-300 px-4 py-2 rounded-lg hover:bg-red-50 hover:border-red-400 transition-colors font-medium"
    >
      Logout
    </button>
  );
}