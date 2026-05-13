import type { ReactNode } from "react";
import { Button } from "../Button/Button";
import "./HeroBanner.css";

type PrimaryCTA = {
  text: string;
  href: string;
};

type SecondaryCTA = {
  text: string;
  href: string;
};

interface HeroBannerProps {
  overline?: string;
  title: ReactNode;
  description: string;
  primaryCta: PrimaryCTA;
  secondaryCta: SecondaryCTA;
}

export function HeroBanner({
  overline,
  title,
  description,
  primaryCta,
  secondaryCta,
}: HeroBannerProps) {
  return (
    <div className="hero-banner">
      <div className="banner-left">
        {overline && <p className="overline">{overline}</p>}
        <h1 className="banner-title">{title}</h1>
        <p className="banner-description">{description}</p>
        <div className="banner-cta">
          <Button variant="primary" size="lg" href={primaryCta.href}>
            {primaryCta.text}
          </Button>
          <Button variant="secondary" size="lg" href={secondaryCta.href}>
            {secondaryCta.text}
          </Button>
        </div>
        <p className="note">free to try — no account needed</p>
      </div>
      <div className="banner-right"></div>
    </div>
  );
}
