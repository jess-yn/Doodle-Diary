import type { ReactNode } from "react";
import { Button } from "../Button/Button";
import "./CtaBanner.css";

interface CtaBannerProps {
  children: ReactNode;
  btnText: string;
  href: string;
}

export function CtaBanner({ children, btnText, href }: CtaBannerProps) {
  return (
    <div className="cta-banner">
      <h2>{children}</h2>
      <Button variant="secondary" size="lg" href={href} btnRight={true}>
        {btnText}
      </Button>
    </div>
  );
}
