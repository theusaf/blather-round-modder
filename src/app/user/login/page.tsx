import React from "react";
import Link from "next/link";

export default function LoginPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  return (
    <>
      <div className="flex items-center flex-col">
        <div className="flex-1 w-96 rounded-xl bg-amber-300 p-5">
          <h1 className="text-2xl">Log in</h1>
          <hr className="border-black border-1 mb-2"></hr>
          <form method="POST" action="/api/auth/login">
            <label htmlFor="username" className="block">
              Username
            </label>
            <input
              name="username"
              id="username"
              placeholder="Enter username"
              className="block w-full mb-2"
              required
            ></input>
            <label htmlFor="password" className="block">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              className="block w-full"
              required
            ></input>
            <button
              type="submit"
              className="block w-full mt-2 rounded border-black border-2 hover:bg-blue-600 hover:text-white"
            >
              Log in
            </button>
            {searchParams["error"] && (
              <p className="text-red-500 bg-neutral-100 rounded p-1 mt-2">
                Invalid username or password.
              </p>
            )}
          </form>
          <hr className="border-black border-1 my-2"></hr>
          <div className="flex">
            <span className="flex-1">
              <Link href="/user/signup" className="underline">
                Sign Up
              </Link>
            </span>
            <span className="flex-1 text-right">Forgot Password</span>
          </div>
        </div>
      </div>
    </>
  );
}
