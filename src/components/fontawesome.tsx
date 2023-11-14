import React from "react";

export default function FontAwesomeIcon({
  icon,
  className,
  type = "solid",
}: {
  icon: string;
  className?: string;
  type?: "solid" | "brands";
}) {
  return (
    <span
      className={`w-6 inline-flex items-center flex-col ${className ?? ""}`}
    >
      <span className={`fa-${type} fa-${icon}`}></span>
    </span>
  );
}
