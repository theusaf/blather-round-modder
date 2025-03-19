"use client";
import { loginWithPasswordAction } from "@/lib/actions/login";
import { BProgress } from "@bprogress/core";
import Link from "next/link";
import { useActionState } from "react";

export default function LoginPage() {
	const [formState, formAction, pending] = useActionState(
		(_: unknown, data: FormData) => {
			BProgress.start();
			return loginWithPasswordAction(_, data).then((data) => {
				BProgress.done();
				return data;
			});
		},
		null,
	);

	return (
		<div className="p-2">
			<h2 className="text-2xl font-bold">Log In</h2>
			<form action={formAction}>
				<div className="flex flex-col gap-2">
					<div>
						<label htmlFor="username" className="font-bold">
							Username
						</label>
						<input
							type="text"
							id="username"
							name="username"
							className="w-full h-10 p-2 rounded-md border-emerald-800 border-2"
							placeholder="Username"
							required
						/>
					</div>
					<div>
						<label htmlFor="password" className="font-bold">
							Password
						</label>
						<input
							type="password"
							id="password"
							name="password"
							className="w-full h-10 p-2 rounded-md border-emerald-800 border-2"
							placeholder="Password"
							required
						/>
					</div>
					{formState?.error && !pending && (
						<div>
							<p className="text-red-800">{formState.error}</p>
						</div>
					)}
					<button
						type="submit"
						className="w-full h-10 bg-emerald-800 text-white rounded-md mt-2"
					>
						Log In
					</button>
				</div>
				<div className="mt-2">
					New user?{" "}
					<Link href="/register" className="text-emerald-800">
						Register now!
					</Link>
				</div>
			</form>
		</div>
	);
}
