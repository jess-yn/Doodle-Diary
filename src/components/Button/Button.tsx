import React from "react";
import { Link } from "react-router";
import "./Button.css";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  btnRight?: boolean;
  fullWidth?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
};

const sizes: Record<ButtonSize, string> = {
  sm: "btn-sm",
  md: "btn-md",
  lg: "btn-lg",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  btnRight = false,
  fullWidth = false,
  ...props
}: ButtonProps) {
  const classes = `btn ${variants[variant]} ${sizes[size]} ${btnRight ? "btn-right" : ""} ${fullWidth ? "btn-full" : ""}`;

  if (href) {
    return (
      <Link to={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      {...props}
    >
      {children}
    </button>
  );
}
