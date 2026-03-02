import React from "react";

interface ButtonProps
  extends React.ComponentPropsWithoutRef<"button"> {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline";
  asChild?: boolean;
}

export function Button({
  children,
  size = "md",
  ...props
}: ButtonProps) {
  const padding =
    size === "lg"
      ? "14px 20px"
      : size === "sm"
      ? "6px 10px"
      : "10px 16px";

  return (
    <button
      {...props}
      style={{
        padding,
        backgroundColor: "#8b5cf6",
        color: "white",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}