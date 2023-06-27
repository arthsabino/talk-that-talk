import { useLanguage } from "@/hooks/context";
import { ChangeEvent, ReactElement, useState } from "react";
import Button from "../Button";
import TextInput from "../FormElements/TextInput";

const Register = (): ReactElement => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState<File>();

  const handlePic = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]){
      return
    } else {
      setPic(e.target.files[0]);
    }
  };
  const {
    auth: { register, forms },
  } = useLanguage();
  return (
    <form className="w-full">
      <div className="auth-content">
        <TextInput
          label={forms[2]}
          input={{
            value: name,
            onChange: (e) => {
              setName(e.target.value);
            },
          }}
        />
        <TextInput
          label={forms[0]}
          input={{
            value: email,
            onChange: (e) => {
              setEmail(e.target.value);
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
        <TextInput
          label={forms[3]}
          input={{
            value: confirmPassword,
            onChange: (e) => {
              setConfirmPassword(e.target.value);
            },
          }}
        />
        <div className="form-input">
          <label>{forms[4]}</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handlePic(e)}
          />
        </div>

        <Button btnCls="btn--secondary">{register}</Button>
      </div>
    </form>
  );
};

export default Register;
