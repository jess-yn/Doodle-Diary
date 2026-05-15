import { type ReactNode } from "react";
import "./SectionCard.css";

interface SectionCardProps {
  children?: ReactNode;
  heading: string;
  subheading: string;
}

export function SectionCard({
  children,
  heading,
  subheading,
}: SectionCardProps) {
  return (
    <div className="section-card">
      <h3>{heading}</h3>
      <p className="subheading heading-decoration">{subheading}</p>
      {children}
    </div>
  );
}
