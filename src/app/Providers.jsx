"use client";

import { SessionProvider } from "next-auth/react";
import SessionWatcher from "./components/SessionWatcher";

export function Providers({ children }) {
  return (
    <SessionProvider>
      {" "}
      <SessionWatcher />
      {children}
    </SessionProvider>
  );
}
