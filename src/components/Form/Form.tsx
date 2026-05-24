import { Button } from "../Button/Button";
import "./Form.css";

export function Form() {
  return (
    <>
      <div className="form-card">
        <p className="overline">welcome back, doodler</p>
        <h2>
          Sign <span className="accent italic">in</span>.
        </h2>
        <p>Pick up where you left off. Your sketchbook missed you.</p>

        <form action="">
          <label htmlFor="">Email</label>
          <input type="email" name="email" id="email" />
          <label htmlFor="">Password</label>
          <input type="password" name="" id="" />
          <input type="checkbox" name="remember" id="remember" />
          <Button variant="primary" size="lg">
            Open my sketchbook
          </Button>
        </form>
      </div>
    </>
  );
}
