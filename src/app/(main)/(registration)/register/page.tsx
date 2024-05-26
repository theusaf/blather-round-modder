"use client";
import { registerWithPasswordAction } from "@/lib/actions/register";
import Link from "next/link";
import { useFormState } from "react-dom";

export default function LoginPage() {
  const [formState, formAction, pending] = useFormState(
    registerWithPasswordAction,
    null,
  );

  return (
    <div className="p-2">
      <h2 className="text-2xl font-bold">Register</h2>
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
          <div>
            <label htmlFor="password-confirm" className="font-bold">
              Confirm Password
            </label>
            <input
              type="password"
              id="password-confirm"
              className="w-full h-10 p-2 rounded-md border-emerald-800 border-2"
              placeholder="Password"
              required
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="agreement"
              className="h-4 w-4 mr-1 rounded-md"
              placeholder="Password"
              required
            />
            <label htmlFor="agreement">
              I agree to the terms and conditions
            </label>
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
            Register
          </button>
        </div>
        <div className="mt-2">
          Have an account?{" "}
          <Link href="/login" className="text-emerald-800">
            Log in
          </Link>
        </div>
      </form>
    </div>
  );
}
