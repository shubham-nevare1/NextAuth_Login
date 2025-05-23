"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProductPage() {
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
    <>
      <div className="h-full bg-purple-50 p-10">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
          <h1 className="text-3xl font-bold text-purple-800 mb-4">
            Our Products
          </h1>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "AI Assistant",
              "Smart Scheduler",
              "Analytics Dashboard",
              "Automation Toolkit",
            ].map((product) => (
              <li
                key={product}
                className="bg-purple-100 p-4 rounded-lg shadow hover:bg-purple-200 transition"
              >
                <h2 className="text-xl font-semibold text-purple-900">
                  {product}
                </h2>
                <p className="text-purple-700">
                  An innovative tool to simplify your workflow.
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
