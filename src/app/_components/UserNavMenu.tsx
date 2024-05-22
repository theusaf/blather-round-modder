"use client";
import { logout } from "@/lib/actions/logout";
import { useUserStore } from "@/lib/hooks/userStore";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
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
            <MenuItem>
              <Link href={`/profile/${encodeURIComponent(user.sub!)}`}>
                Profile
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href={`/profile/${encodeURIComponent(user.sub!)}/projects`}>
                My Projects
              </Link>
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => logout(pathname)}>
              <div className="flex gap-2 items-center">
                <FontAwesomeIcon icon={faRightFromBracket} />
                <span>Log Out</span>
              </div>
            </MenuItem>
          </Menu>
        </div>
      )}
    </div>
  );
}
