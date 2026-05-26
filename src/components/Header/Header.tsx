import { Button } from "../Button/Button";
import { Link, useNavigate } from "react-router";
import { LogoIcon } from "../icons/LogoIcon";
import "./Header.css";
import { UserAuth } from "../../context/AuthContext";

export function Header() {
  const { session, signOutUser } = UserAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOutUser();
      navigate("/");
    } catch (err) {
      console.log("There was an error signing out: ", err);
    }
  };

  return (
    <>
      <nav>
        <Link to="/" className="brand">
          <LogoIcon></LogoIcon>
          <span className="brand-name">Doodle Diary</span>
        </Link>
        <div className="menu-links">
          <Button variant="secondary" size="md" href="/entry">
            Let's doodle
          </Button>

          {session ? (
            <Button variant="primary" size="md" onClick={handleSignOut}>
              Sign out
            </Button>
          ) : (
            <Button variant="primary" size="md" href="/login">
              Sign in
            </Button>
          )}
        </div>
      </nav>
    </>
  );
}
