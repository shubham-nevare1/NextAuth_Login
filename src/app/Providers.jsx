"use client";

import { SessionProvider } from "next-auth/react";
import SessionWatcher from "./components/SessionWatcher";
import { Toaster } from "react-hot-toast";

export function Providers({ children }) {
  return (
    <SessionProvider>
      {" "}
      <SessionWatcher />
      <Toaster position="top-right" reverseOrder={false} />
      {children}
    </SessionProvider>
  );
}
