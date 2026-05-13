import { Button } from "../Button/Button";
import { LogoIcon } from "../icons/LogoIcon";
import "./Header.css";

export function Header() {
  return (
    <>
      <nav>
        <div className="brand">
          <LogoIcon></LogoIcon>
          <span className="brand-name">Doodle Diary</span>
        </div>
        <div className="menu-links">
          <Button variant="secondary" size="md">
            Sign in
          </Button>
          <Button variant="primary" size="md">
            Let's doodle
          </Button>
        </div>
      </nav>
    </>
  );
}
