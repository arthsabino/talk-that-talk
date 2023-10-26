import { useLanguage } from "@/hooks/context";
import { getSignature } from "@/lib/cloudinary";
import { API_URL } from "@/lib/consts";
import axios, { AxiosError } from "axios";
import { ChangeEvent, FormEvent, ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../Button";
import Card from "../Card";
import TextInput from "../FormElements/TextInput";
import LoadingView from "../Utility/LoadingView";

const Register = (): ReactElement => {
  const { messages } = useLanguage();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [picture, setPicture] = useState<File>();
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  const handlePic = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) {
      return;
    } else {
      setPicture(e.target.files[0]);
    }
  };
  const addError = (err: string) => {
    setErrors((prev) => [...prev, err]);
  };
  const checkErrors = () => {
    if (!email) {
      addError(messages.email_required);
    }
    if (!name) {
      addError(messages.name_required);
    }
    if (!password) {
      addError(messages.password_required);
    }
    if (!picture) {
      addError(messages.pic_required);
    } else if (picture.type !== "image/jpeg" && picture.type !== "image/png") {
      addError(messages.pic_image_accepted);
    }
    if (password !== confirmPassword) {
      addError(messages.pw_not_match);
    }

    return (
      !email ||
      !name ||
      !password ||
      !picture ||
      password !== confirmPassword ||
      (picture.type !== "image/jpeg" && picture.type !== "image/png")
    );
  };

  const registerUser = async (picUrl: string) => {
    const { data: userData } = await axios.post(
      API_URL.register,
      {
        name,
        email,
        password,
        picture: picUrl,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (userData) {
      setLoading(false);
      console.log(JSON.stringify(userData));
      localStorage.removeItem("userInfo");
      localStorage.setItem("userInfo", JSON.stringify(userData));
      toast.success(messages.register_successful);
      history("/chats");
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);
    if (checkErrors()) return;
    if (picture) {
      try {
        setLoading(true);
        const picData = new FormData();
        const { timestamp, signature } = await getSignature();
        picData.append("file", picture);
        picData.append("upload_preset", "talk-that-talk-preset");
        picData.append("api_key", process.env.CLOUDINARY_API_KEY!);
        picData.append("folder", "talk-that-talk");
        picData.append("timestamp", timestamp?.toString());
        picData.append("signature", signature);
        await axios
          .post(process.env.CLOUDINARY_CLOUD_NAME!, picData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            if (res && res.data && res.data.url) {
              registerUser(res.data.url);
            }
          });
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data?.message);
        }
      } finally {
        setLoading(false);
      }
    }
  };
  const {
    auth: { register, forms },
  } = useLanguage();
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="auth-content">
        {loading ? <LoadingView show={loading} /> : null}
        {errors && errors.length > 0 && (
          <Card containerCls="card--error-card">
            <ul>
              {errors.map((err, index) => (
                <li key={`form-err-${index}`}>{err}</li>
              ))}
            </ul>
          </Card>
        )}
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
            type: "password",
            onChange: (e) => {
              setPassword(e.target.value);
            },
          }}
        />
        <TextInput
          label={forms[3]}
          input={{
            value: confirmPassword,
            type: "password",
            onChange: (e) => {
              setConfirmPassword(e.target.value);
            },
          }}
        />
        <div className="form-input">
          <label>{forms[4]}</label>
          <input type="file" accept="image/*" onChange={(e) => handlePic(e)} />
        </div>

        <Button type="submit" btnCls="btn--secondary">
          {register}
        </Button>
      </div>
    </form>
  );
};

export default Register;
