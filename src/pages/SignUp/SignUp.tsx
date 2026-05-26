import { FileStack } from "../../components/FileStack/FileStack";
import { SignUpForm } from "../../components/Form/SignUpForm";

export function SignUp() {
  return (
    <>
      <div className="two-column">
        <div className="left">
          <FileStack></FileStack>
        </div>
        <div className="right">
          <SignUpForm></SignUpForm>
        </div>
      </div>
    </>
  );
}
