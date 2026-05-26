import { LoginForm } from "../../components/Form/LoginForm";
import { FileStack } from "../../components/FileStack/FileStack";
import "./Login.css";

export function Login() {
  return (
    <>
      <div className="form-page">
        <div className="two-column">
          <div className="left">
            <FileStack></FileStack>
          </div>
          <div className="right">
            <LoginForm></LoginForm>
          </div>
        </div>
      </div>
    </>
  );
}
