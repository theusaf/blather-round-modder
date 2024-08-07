"use client";
import { logout } from "@/lib/actions/logout";
import { useUserStore } from "@/lib/hooks/userStore";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
	faPlusCircle,
	faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider, Menu, MenuItem } from "@mui/material";
import { startProgress, stopProgress } from "next-nprogress-bar";
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
					<button type="button" ref={anchorRef} onClick={() => setOpen(true)}>
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
						<Link href={`/profile/${encodeURIComponent(user.sub!)}`}>
							<MenuItem>Profile</MenuItem>
						</Link>
						<Link href={`/profile/${encodeURIComponent(user.sub!)}/projects`}>
							<MenuItem>My Projects</MenuItem>
						</Link>
						<Divider />
						<Link href="/project/create">
							<MenuItem>
								<div className="flex gap-2 items-center">
									<FontAwesomeIcon icon={faPlusCircle} />
									<span>Create Project</span>
								</div>
							</MenuItem>
						</Link>
						<Divider />
						<MenuItem
							onClick={() => {
								startProgress();
								logout(pathname).then(() => {
									stopProgress();
								});
							}}
						>
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
