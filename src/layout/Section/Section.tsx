import type { ReactNode } from "react";
import "./Section.css";

interface SectionProps {
  children: ReactNode;
  overline?: string;
  sectionheading?: ReactNode;
}

export function Section({ children, overline, sectionheading }: SectionProps) {
  const hasSectionHeading = overline || sectionheading;

  return (
    <section>
      {hasSectionHeading && (
        <div className="section-heading">
          <p className="overline">{overline}</p>
          <h2>{sectionheading}</h2>
        </div>
      )}
      {children}
    </section>
  );
}
