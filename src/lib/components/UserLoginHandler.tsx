"use client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { type ReactNode, useEffect } from "react";
import { useUserStore } from "../hooks/userStore";
import type { UserLogin } from "../types/session";

/**
 * A component which syncs the user's login state passed from the server components.
 *
 * @param loginDetails The current user's login details.
 */
export default function UserLoginHandler({
	loginDetails,
	children,
}: {
	loginDetails: UserLogin;
	children: ReactNode;
}) {
	useEffect(() => {
		const setUser = useUserStore.getState().setUser;
		setUser(loginDetails);
	}, [loginDetails]);
	return (
		<>
			<ProgressBar
				options={{
					showSpinner: false,
				}}
			/>
			{children}
		</>
	);
}
