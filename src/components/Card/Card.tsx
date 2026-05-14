import type { ReactNode } from "react";
import "./Card.css";

export interface CardProps {
  icon?: ReactNode;
  step?: string;
  title: string;
  description: string;
}

export function Card({ icon, step, title, description }: CardProps) {
  return (
    <div className="card">
      <div className="card-icon">{icon}</div>
      <div className="card-content">
        <span>{step}</span>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}
