import type { ReactNode } from "react";
import "./ButtonIcon.css";

export interface ButtonIconProps {
  icon: ReactNode;
  disabled?: boolean;
  active?: boolean;
  tooltip: string;
  onClick: (pen: string) => void;
}

export function ButtonIcon({
  icon,
  disabled = false,
  active = false,
  tooltip,
  onClick,
}: ButtonIconProps) {
  const classes = `btn-icon ${active ? "active" : ""}`;

  return (
    <button className={classes} onClick={() => onClick(tooltip)}>
      {icon}
    </button>
  );
}
