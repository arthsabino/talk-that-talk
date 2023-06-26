import { useLanguage } from "@/hooks/context";
import { ReactElement, useState } from "react";
import Button from "../Button";
import TextInput from "../FormElements/TextInput";

const Register = (): ReactElement => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {
    auth: { register, forms },
  } = useLanguage();
  return (
    <form className="w-full">
      <div className="auth-content">
        <TextInput
          label={forms[0]}
          input={{
            value: username,
            onChange: (e) => {
              setUsername(e.target.value);
            },
          }}
        />
        <TextInput
          label={forms[1]}
          input={{
            value: password,
            onChange: (e) => {
              setPassword(e.target.value);
            },
          }}
        />
        <Button btnCls="btn--secondary">{register}</Button>
      </div>
    </form>
  );
};

export default Register;
