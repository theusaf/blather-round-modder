import Image from "next/image";
import NavbarLink from "./navbarLink";
import React from "react";
import { getCurrentUser } from "../lib/app/auth";
import FontAwesomeIcon from "./fontawesome";

function NavigationItem({
  children,
  location,
  className = "",
}: {
  children: React.ReactNode;
  location: string;
  className?: string;
}) {
  return (
    <div className={`flex-1 flex flex-row items-center`}>
      <NavbarLink link={location} className={className}>
        {children}
      </NavbarLink>
    </div>
  );
}

async function ProfileButton() {
  const user = await getCurrentUser();
  if (user) {
    return <span>Profile</span>;
  } else {
    return <span>Log in</span>;
  }
}

export default async function Navbar() {
  return (
    <nav className="bg-rose-700 p-2 text-white flex flex-row items-center flex h-16">
      <div className="mr-4 ml-4">
        <NavigationItem location="/">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={128}
            height={128}
            className="w-12 rounded"
          ></Image>
        </NavigationItem>
      </div>
      <div className="mr-2 ml-4">
        <NavigationItem location="/projects">
          <span>Projects</span>
        </NavigationItem>
      </div>
      <div className="flex-row flex flex-1">
        <NavigationItem location="/projects/new" className="no-underline">
          <div className="border-2 rounded-full h-6 w-6 flex flex-row items-center">
            <FontAwesomeIcon icon="plus"></FontAwesomeIcon>
          </div>
        </NavigationItem>
      </div>
      <div className="mr-4">
        <NavigationItem location="/user">
          <ProfileButton></ProfileButton>
        </NavigationItem>
      </div>
    </nav>
  );
}
