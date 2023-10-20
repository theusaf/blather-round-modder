"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarLink({ link, children }: { link: string, children: React.ReactNode }) {
  const selected = usePathname().startsWith(link);
  console.log(selected);
  console.log(link);
  console.log(usePathname());
  return <Link href={link} className={`flex-row items-center${selected ? " underline" : ""}`}>
    {children}
  </Link>
}
