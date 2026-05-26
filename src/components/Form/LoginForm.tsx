import { useNavigate } from "react-router";
import { Button } from "../Button/Button";
import "./Form.css";
import { UserAuth } from "../../context/AuthContext";
import { useState } from "react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { signInUser } = UserAuth();

  const handleLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signInUser({ email, password });
      if (res.success) {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      console.error("There was an error signing in: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="form-card">
        <p className="overline">welcome back, doodler</p>
        <h2>
          Sign <span className="accent italic">in</span>.
        </h2>
        <p>Pick up where you left off. Your sketchbook missed you.</p>

        <form onSubmit={handleLogin}>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
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
          New here? <a href="/sign-up">Sign up here!</a>
        </p>
      </div>
    </>
  );
}
