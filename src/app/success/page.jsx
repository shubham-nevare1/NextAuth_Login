"use client";

import { signOut, useSession } from "next-auth/react";
import Navbar from "../components/Navbar";
export default function SuccessPage() {
  const { data: session, status } = useSession();

  if (!session) {
    return <div className="p-4 text-center">Not authorized</div>;
  }
  console.log("session", session);
  // tp
  const readableDate = new Date(session.expires).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  });
  console.log("Session expires at:", readableDate);

  // tp end

  return (
    <>
      <div className="h-screen bg-green-50 flex flex-col items-center justify-start py-10 px-4">
        <h1 className="text-4xl font-bold text-green-800 mb-4">
          Welcome to Dashboard
        </h1>

        {/* 🔽 Navigation Bar */}

        <Navbar />
        {/* 🔽 Logout Button */}
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          // onClick={() => {
          //   const popup = confirm("Are you sure you want to log out?");
          //   if (popup) {
          //     signOut({ callbackUrl: "/" });
          //   }
          // }}
          className="mb-6 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Log Out
        </button>

        {/* 🔽 User Info Card */}
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center space-y-6">
          <h2 className="text-2xl font-semibold text-green-700">
            ✅ Login Successful
          </h2>

          {session?.user?.profilePic && (
            <img
              src={session.user.profilePic}
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto border-4 border-green-300 object-cover"
            />
          )}

          <div className="space-y-2 text-gray-800 text-lg">
            <p>
              Welcome, <strong>{session?.user?.firstName || "User"}</strong>
            </p>
            <p>
              <strong>{session?.user?.email || "user@example.com"}</strong>
            </p>
            <p>
              Occupation:{" "}
              <strong>
                {session?.user?.personalInfo?.occupation || "Unknown"}
              </strong>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
