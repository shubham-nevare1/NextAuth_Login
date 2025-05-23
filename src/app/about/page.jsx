"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function AboutPage() {
   const { data: session, status } = useSession();
    const router = useRouter();
    // page show only login
    useEffect(() => {
      if (status === "unauthenticated") {
        // Redirect if not logged in
        router.replace("/");
      }
    }, [status, router]);
  return (
    <div className="h-full bg-gray-50 flex flex-col items-center justify-center p-10">
      <h1 className="text-4xl font-bold text-blue-800 mb-4">About Us</h1>
      <p className="text-lg text-gray-700 max-w-2xl text-center">
        We are dedicated to building secure, scalable, and smart web solutions.
        Our mission is to deliver quality products that empower users and
        businesses through technology.
      </p>
    </div>
  );
}