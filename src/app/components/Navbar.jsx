"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="mb-8 flex gap-6 text-green-700 font-medium text-lg">
      <Link href="/about" className="hover:underline">
        About
      </Link>
      <Link href="/contact" className="hover:underline">
        Contact Us
      </Link>
      <Link href="/product" className="hover:underline">
        Product
      </Link>
      <Link href="/admin" className="hover:underline">
        Admin Page
      </Link>
    </nav>
  );
}
