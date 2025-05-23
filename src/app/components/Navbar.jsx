"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { toast } from "react-hot-toast";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  // Detect screen size on first render
  useEffect(() => {
    if (window.innerWidth >= 768) {
      setIsOpen(true); // open by default on desktop
    }
  }, []);
  if (status !== "authenticated") return null;

  const handleLogout = () => {
    localStorage.removeItem("sessionExpiry");
    toast.error("👋 Logged out successfully!");
    setTimeout(() => {
      signOut({ callbackUrl: "/" });
    }, 1000);
  };
  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };
  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`h-screen bg-green-50 text-green-700 w-64 p-6 transition-transform duration-300 
          ${isOpen ? "translate-x-0 overflow-y-" : "-translate-x-full"} 
          fixed lg:relative z-50 shadow-md`} 
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-green-700"
            aria-label="Close Sidebar"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex flex-col gap-4 text-lg font-medium">
          <Link
            href="/success"
            onClick={handleLinkClick}
            className="flex items-center gap-2 group"
          >
            🏠 <span className="group-hover:underline">Home</span>
          </Link>
          <Link
            href="/about"
            onClick={handleLinkClick}
            className="flex items-center gap-2 group"
          >
            ℹ️ <span className="group-hover:underline">About</span>
          </Link>
          <Link
            href="/contact"
            onClick={handleLinkClick}
            className="flex items-center gap-2 group"
          >
            📞 <span className="group-hover:underline">Contact Us</span>
          </Link>
          <Link
            href="/product"
            onClick={handleLinkClick}
            className="flex items-center gap-2 group"
          >
            🛒 <span className="group-hover:underline">Product</span>
          </Link>

          <Link
            href="/user"
            onClick={handleLinkClick}
            className="flex items-center gap-2 group"
          >
            👤 <span className="group-hover:underline">User</span>
          </Link>
          <Link
            href="/admin"
            onClick={handleLinkClick}
            className="flex items-center gap-2 group"
          >
            🧑‍💻 <span className="group-hover:underline  text-red-500">Admin Page</span>
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-8 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>

      {/* Toggle button (Mobile) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-5 left-5 z-50 lg:hidden bg-green-100 p-2 rounded-full"
          aria-label="Open Sidebar"
        >
          <Menu size={24} className="text-green-700" />
        </button>
      )}
    </div>
  );
}
