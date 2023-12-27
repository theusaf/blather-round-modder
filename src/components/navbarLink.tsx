"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarLink({
  link,
  children,
  className = "",
}: {
  link: string;
  children: React.ReactNode;
  className?: string;
}) {
  const selected = usePathname().startsWith(link);
  return (
    <Link
      href={link}
      className={`flex-row items-center ${className}${
        selected ? " underline" : ""
      }`}
    >
      {children}
    </Link>
  );
}
