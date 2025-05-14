"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";

export default function SessionWatcher() {
  const { data: session, status } = useSession();

  useEffect(() => {
    // Wait for session to be authenticated before proceeding
    if (status !== "authenticated" || !session?.expires) return;

    const expiryTime = new Date(session.expires).getTime();
    const now = Date.now();
    const timeoutDuration = expiryTime - now;

    if (timeoutDuration <= 0) {
      alert("🔒 Session expired. You will be logged out.");
      signOut({ callbackUrl: "/" });
      return;
    }

    // Set timeout based on session expiry
    const timeout = setTimeout(() => {
      alert("🔒 Session expired. You will be logged out.");
      signOut({ callbackUrl: "/" });
    }, timeoutDuration);

    // Cleanup timeout on component unmount
    return () => clearTimeout(timeout);
  }, [session, status]);

  return null; // No need to render anything if the session is authenticated and handled
}
