"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    // 🚫 Redirect non-admin users
    if (!session || session.user?.role !== "admin") {
      router.push("/unauthorized");
    }
  }, [session, status]);

  if (!session || session.user?.role !== "admin") {
    return <p className="text-center text-red-500 mt-20">Checking access...</p>;
  }

  return (
    <div className="h-full bg-red-50 p-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-red-800 mb-4">Admin Panel</h1>
        <p className="text-gray-700 text-lg">
          Welcome, Admin! Here you can manage users, view analytics, and configure system settings.
        </p>
        <div className="mt-6 space-y-2">
          <button className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700">
            Manage Users
          </button>
          <button className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700">
            View Analytics
          </button>
          <button className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700">
            System Settings
          </button>
        </div>
      </div>
    </div>
  );
}
