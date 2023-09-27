import Image from "next/image";
import Link from "next/link";
import React from "react";

function NavigationItem({children, location}) {
  return <div className="flex-1 flex flex-row items-center">
    <Link href={location} className="flex-1 flex flex-row items-center">
      {children}
    </Link>
  </div>
}

export default function Navbar() {
  return (
    <div className="bg-rose-700 p-2 text-white flex flex-row items-center flex h-16">
      <div className="flex-row flex flex-1">
        <NavigationItem location="/">
          <Image src="" alt="logo" width={50} height={50} className=""></Image>
        </NavigationItem>
        <NavigationItem location="/projects">
          <span>Projects</span>
        </NavigationItem>
        <NavigationItem location="/profile">
          <span>Profile</span>
        </NavigationItem>
      </div>
    </div>
  )
}
