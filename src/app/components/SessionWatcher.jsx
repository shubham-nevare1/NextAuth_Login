"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function SessionWatcher() {
  const { data: session, status } = useSession();
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (status !== "authenticated" || !session?.expires) return;

    let expiryTime = localStorage.getItem("sessionExpiry");

    if (!expiryTime) {
      // Save the original expiry only once
      expiryTime = new Date(session.expires).getTime().toString();
      localStorage.setItem("sessionExpiry", expiryTime);
    }

    const expiry = parseInt(expiryTime);
    const now = Date.now();
    const timeoutDuration = expiry - now;

    if (timeoutDuration <= 0) {
      alert("🔒 Session expired. You will be logged out.");
      localStorage.removeItem("sessionExpiry");
      signOut({ callbackUrl: "/" });
      return;
    }

    setTimeLeft(timeoutDuration);

    const logoutTimeout = setTimeout(() => {
      alert("🔒 Session expired. You will be logged out.");
      localStorage.removeItem("sessionExpiry");
      signOut({ callbackUrl: "/" });
    }, timeoutDuration);

    const interval = setInterval(() => {
      const newTimeLeft = expiry - Date.now();
      if (newTimeLeft <= 0) {
        clearInterval(interval);
        setTimeLeft(0);
      } else {
        setTimeLeft(newTimeLeft);
      }
    }, 1000);

    return () => {
      clearTimeout(logoutTimeout);
      clearInterval(interval);
    };
  }, [session, status]);

  if (status !== "authenticated") return null;

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-2 rounded shadow text-sm font-mono">
      {timeLeft === null
        ? "Checking session..."
        : `Session expires in: ${Math.floor(timeLeft / 1000 / 60)}m ${Math.floor((timeLeft / 1000) % 60)}s`}
    </div>
  );
}
