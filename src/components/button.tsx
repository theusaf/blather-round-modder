import React from "react";
import FontAwesomeIcon from "./fontawesome";

export interface ButtonProps {
  onClick?: () => void;
  icon?: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

function Button({
  onClick,
  icon,
  children,
  className,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`disabled:opacity-75 disabled:cursor-not-allowed p-2 rounded mr-2 ${
        className ?? ""
      }`}
    >
      {icon && <FontAwesomeIcon icon={icon}></FontAwesomeIcon>}
      {children}
    </button>
  );
}

export function DefaultButton({
  onClick,
  icon,
  children,
  className,
  disabled = false,
}: ButtonProps) {
  return (
    <Button
      icon={icon}
      className={`hover:bg-neutral-700 bg-neutral-500 text-neutral-100 ${
        className ?? ""
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export function PrimaryButton({
  onClick,
  icon,
  children,
  className,
  disabled = false,
}: ButtonProps) {
  return (
    <Button
      icon={icon}
      className={`hover:bg-blue-700 bg-blue-500 text-neutral-100 ${
        className ?? ""
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export function DangerButton({
  onClick,
  icon,
  children,
  className,
  disabled = false,
}: ButtonProps) {
  return (
    <Button
      icon={icon}
      className={`hover:bg-red-700 bg-red-500 text-neutral-100 ${
        className ?? ""
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export function SuccessButton({
  onClick,
  icon,
  children,
  className,
  disabled = false,
}: ButtonProps) {
  return (
    <Button
      icon={icon}
      className={`hover:bg-green-700 bg-green-500 text-neutral-100 ${
        className ?? ""
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
