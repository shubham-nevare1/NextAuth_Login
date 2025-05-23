"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ContactPage() {
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
    <div className="h-full bg-yellow-50 p-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-yellow-800 mb-4">Contact Us</h1>
        <p className="text-gray-700 text-lg mb-4">
          We'd love to hear from you! Reach out via the form below or email us at contact@example.com.
        </p>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-2 border rounded"
          />
          <textarea
            placeholder="Your Message"
            className="w-full px-4 py-2 border rounded"
            rows={4}
          ></textarea>
          <button
            type="submit"
            className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}