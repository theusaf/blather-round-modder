"use client";
import { logout } from "@/lib/actions/logout";
import { useUserStore } from "@/lib/hooks/userStore";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider, Menu, MenuItem } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";

export function UserNavMenu() {
  const user = useUserStore((state) => state.user);
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex items-center">
      {!user.loggedIn ? (
        <Link href="/login">Login</Link>
      ) : (
        <div>
          <button ref={anchorRef} onClick={() => setOpen(true)}>
            <FontAwesomeIcon className="w-8 h-8" icon={faUser} />
          </button>
          <Menu
            open={open}
            anchorEl={anchorRef.current}
            onClose={() => setOpen(false)}
            onClick={() => setOpen(false)}
          >
            <p className="px-4 py-2 text-slate-">Welcome {user.sub}!</p>
            <Divider />
            <MenuItem>Profile</MenuItem>
            <MenuItem>My Projects</MenuItem>
            <Divider />
            <MenuItem onClick={() => logout(pathname)}>Log Out</MenuItem>
          </Menu>
        </div>
      )}
    </div>
  );
}
