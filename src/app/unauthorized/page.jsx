"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Unauthorized() {
  const router = useRouter();

  useEffect(() => {
    // Step 1: Replace current history with /success
    window.history.replaceState(null, "", "/success");

    // Step 2: Push /unauthorized as the current page
    router.push("/unauthorized");
  }, [router]);

  useEffect(() => {
    const handlePopState = () => {
      // When back button is pressed, go to /success
      router.replace("/success");
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-red-600">Access Denied</h1>
        <p className="mt-4 text-gray-700">You are not authorized to view this page.</p>
      </div>
    </div>
  );
}
