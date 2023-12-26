import React from "react";
import Link from "next/link";
import { SignupInput } from "../../../components/user/password_input";

export default function SignupPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  return (
    <>
      <div className="flex items-center flex-col">
        <div className="flex-1 w-96 rounded-xl bg-amber-300 p-5">
          <h1 className="text-2xl">Sign up</h1>
          <hr className="border-black border-1 mb-2"></hr>
          <form method="POST" action="/api/auth/login">
            <SignupInput />
            {searchParams["error"] && (
              <p className="text-red-500 bg-neutral-100 rounded p-1 mt-2">
                {decodeURIComponent(
                  searchParams["message"] ?? "Invalid username or password.",
                )}
              </p>
            )}
          </form>
          <hr className="border-black border-1 my-2"></hr>
          <div className="flex">
            <span className="flex-1">
              <p>Already have an account?</p>
              <Link href="/user/login" className="underline">
                Log in
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
