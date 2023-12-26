import React from "react";

export default function LoginFormInput({
  type = "text",
  name,
  placeholder,
  children,
  required = false,
  className = "",
  onInput: oninput,
}: {
  type?: string;
  name: string;
  placeholder: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
  onInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      <label htmlFor={name} className="block">
        {children}
      </label>
      <input
        type={type}
        id={name}
        placeholder={placeholder}
        className={`block w-full mb-2 border-2 ${className}`}
        required={required}
        onInput={oninput}
      ></input>
    </>
  );
}
