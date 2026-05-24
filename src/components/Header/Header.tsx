import { Button } from "../Button/Button";
import { Link } from "react-router";
import { LogoIcon } from "../icons/LogoIcon";
import "./Header.css";

export function Header() {
  return (
    <>
      <nav>
        <Link to="/" className="brand">
          <LogoIcon></LogoIcon>
          <span className="brand-name">Doodle Diary</span>
        </Link>
        <div className="menu-links">
          <Button variant="secondary" size="md" href="/login">
            Sign in
          </Button>
          <Button variant="primary" size="md" href="/entry">
            Let's doodle
          </Button>
        </div>
      </nav>
    </>
  );
}
