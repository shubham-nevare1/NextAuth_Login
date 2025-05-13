"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";

export default function SessionWatcher() {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.expires) return;

    const interval = setInterval(() => {
      const now = new Date();
      const expiry = new Date(session.expires);

      // if (now >= expiry) {
      //   clearInterval(interval);
      //   const confirmLogout = confirm("Session expired. Please log in again.");
      //   if (confirmLogout) {
      //     signOut({ callbackUrl: "/" });
      //   }
      // }
        if (now >= expiry) {
          clearInterval(interval);
          alert("🔒 Session expired. You will be logged out.");
          signOut({ callbackUrl: "/" });
        }
    }, 5000);

    return () => clearInterval(interval);
  }, [session]);

  return null;
}

