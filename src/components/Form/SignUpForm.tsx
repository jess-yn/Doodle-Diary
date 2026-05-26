import { Button } from "../Button/Button";
import { useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import "./Form.css";

export function SignUpForm() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { signUpUser } = UserAuth();
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signUpUser({ username, email, password });
      if (res.success) {
        navigate("/dashboard");
      }
      console.log("sign up finished");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      console.error("There was an error signing up: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="form-card">
        <p className="overline">welcome, doodler</p>
        <h2>
          Sign <span className="accent italic">up</span>.
        </h2>
        <p>
          Your sketchbook is waiting for you. See what you adventure you'll
          record.
        </p>

        <form onSubmit={handleSignUp}>
          <div className="field">
            <label htmlFor="username">Username</label>
            <input
              type="username"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="field-options">
            <label htmlFor="remember">
              <input type="checkbox" name="remember" id="remember" />
              Remember me
            </label>
          </div>

          <Button type="submit" variant="primary" size="lg" fullWidth={true}>
            {loading ? "Sketching" : "Open my sketchbook"}
          </Button>
        </form>
        <p className="sign-up">
          Already a doodle? <a href="/login">Login here!</a>
        </p>
      </div>
    </>
  );
}
