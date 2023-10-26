import { useLanguage } from "@/hooks/context";
import { API_URL } from "@/lib/consts";
import axios, { AxiosError } from "axios";
import { FormEvent, ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../Button";
import TextInput from "../FormElements/TextInput";
import LoadingView from "../Utility/LoadingView";

const Login = (): ReactElement => {
  const { messages } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  const {
    auth: { login, forms },
  } = useLanguage();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error(messages.fill_out_fields);
      return;
    }
    setLoading(true);
    try {
      await axios
        .post(
          API_URL.login,
          {
            email,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res && res.data) {
            localStorage.removeItem("userInfo");
            localStorage.setItem("userInfo", JSON.stringify(res.data));
            toast.success(messages.login_successful);
            history("/chats");
          }
        });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="auth-content">
        {loading ? <LoadingView show={loading} /> : null}
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
            type: "password",
            onChange: (e) => {
              setPassword(e.target.value);
            },
          }}
        />
        <Button type="submit" btnCls="btn--secondary">
          {login}
        </Button>
        {/* <Button btnCls="btn--primary">{btns[0]}</Button> */}
      </div>
    </form>
  );
};

export default Login;
