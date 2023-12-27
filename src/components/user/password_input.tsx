"use client";
import React, { useEffect, useState } from "react";
import LoginFormInput from "./login_form_input";

export function SignupInput() {
  const [emailError, setEmailError] = useState<boolean>(false),
    [passwordError, setPasswordError] = useState<boolean>(false),
    [passwordConfirmError, setPasswordConfirmError] = useState<boolean>(false),
    [password, setPassword] = useState<string>(""),
    [passwordConfirm, setPasswordConfirm] = useState<string>("");

  useEffect(() => {
    if (password !== passwordConfirm) {
      setPasswordError(true);
      setPasswordConfirmError(true);
    } else if (password.length < 8 && password.length > 0) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
      setPasswordConfirmError(false);
    }
  }, [password, passwordConfirm]);

  return (
    <>
      <LoginFormInput name="username" placeholder="Enter username" required>
        Username
      </LoginFormInput>
      <LoginFormInput
        name="email"
        placeholder="Enter email"
        required
        onInput={(event) => {
          const email = event.target.value;
          if (!/.+@.+\..+/.test(email) && email.length > 0) {
            setEmailError(true);
          } else {
            setEmailError(false);
          }
        }}
        className={emailError ? "border-red-500" : ""}
      >
        Email
      </LoginFormInput>
      <LoginFormInput
        type="password"
        name="password"
        placeholder="Enter password"
        required
        onInput={(event) => {
          const password = event.target.value;
          setPassword(password);
        }}
        className={passwordError ? "border-red-500" : ""}
      >
        Password
      </LoginFormInput>
      <LoginFormInput
        type="password"
        name="password-confirm"
        placeholder="Enter password"
        required
        onInput={(event) => {
          const passwordConfirm = event.target.value;
          setPasswordConfirm(passwordConfirm);
        }}
        className={passwordConfirmError ? "border-red-500" : ""}
      >
        Confirm Password
      </LoginFormInput>
      <button
        type="submit"
        className="block w-full mt-2 rounded border-black border-2 hover:bg-blue-600 hover:text-white"
        onClick={(event) => {
          if (emailError || passwordError || passwordConfirmError) {
            event.preventDefault();
          }
        }}
      >
        Sign up
      </button>
    </>
  );
}
