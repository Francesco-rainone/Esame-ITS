"use client";

import { logout } from "@/app/auth/actions";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/"); 
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition text-sm font-medium"
    >
      Esci
    </button>
  );
}