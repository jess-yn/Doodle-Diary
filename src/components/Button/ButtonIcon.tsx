import type { ReactNode } from "react";
import "./ButtonIcon.css";

type ButtonIconVariants = "sm" | "lg";

export interface ButtonIconProps {
  icon: ReactNode;
  disabled?: boolean;
  active?: boolean;
  tooltip?: string;
  variant?: ButtonIconVariants;
  onClick: () => void;
}

export function ButtonIcon({
  icon,
  disabled = false,
  active = false,
  tooltip,
  variant = "sm",
  onClick,
}: ButtonIconProps) {
  const classes = `btn-icon ${active ? "active" : ""} ${variant}`;
  const isSmall = variant === "sm";

  return (
    <>
      {isSmall ? (
        <button
          className={classes}
          title={tooltip}
          onClick={onClick}
          disabled={disabled}
        >
          {icon}
        </button>
      ) : (
        <button className={classes} onClick={onClick}>
          {icon}
          <span>{tooltip}</span>
        </button>
      )}
    </>
  );
}
