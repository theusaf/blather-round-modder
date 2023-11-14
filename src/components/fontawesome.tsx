import React from "react";

export default function FontAwesomeIcon({
  icon,
  className,
}: {
  icon: string;
  className?: string;
}) {
  return <span className={`fa-solid fa-${icon} ${className ?? ""}`}></span>;
}
