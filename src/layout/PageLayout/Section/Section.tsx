import type { ReactNode } from "react";
import "./Section.css";

interface SectionProps {
  children: ReactNode;
}

export function Section({ children }: SectionProps) {
  return <Section>{children}</Section>;
}
