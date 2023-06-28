import { API_URL, CLOUDINARY_UPLOAD } from "@/Util/Consts";
import { useLanguage } from "@/hooks/context";
import axios from "axios";
import { ChangeEvent, FormEvent, ReactElement, useState } from "react";
import Button from "../Button";
import Card from "../Card";
import TextInput from "../FormElements/TextInput";

const Register = (): ReactElement => {
  const { errors: errLang } = useLanguage();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState<File>();
  const [errors, setErrors] = useState<string[]>([]);

  const handlePic = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) {
      return;
    } else {
      setPic(e.target.files[0]);
    }
  };
  const addError = (err: string) => {
    setErrors((prev) => [...prev, err]);
  };
  const checkErrors = () => {
    if (!email) {
      addError(errLang.email_required);
    }
    if (!name) {
      addError(errLang.name_required);
    }
    if (!password) {
      addError(errLang.password_required);
    }
    if (!pic) {
      addError(errLang.pic_required);
    } else if (pic.type !== "image/jpeg" && pic.type !== "image/png") {
      addError(errLang.pic_image_accepted);
    }
    if (password !== confirmPassword) {
      addError(errLang.pw_not_match);
    }

    return (
      !email ||
      !name ||
      !password ||
      !pic ||
      password !== confirmPassword ||
      (pic.type !== "image/jpeg" && pic.type !== "image/png")
    );
  };

  const registerUser = async (picUrl: string) => {
    const { data: userData } = await axios.post(API_URL.apiUser, {
      name,
      email,
      password,
      pic: picUrl,
    });
    console.log(userData);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);
    if (checkErrors()) return;
    if (pic) {
      const picData = new FormData();
      picData.append("file", pic);
      picData.append("upload_preset", "talk-that-talk");
      picData.append("cloud_name", "talk-that-talk");
      await axios
        .post(CLOUDINARY_UPLOAD, picData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res && res.data && res.data.url) {
            registerUser(res.data.url);
          }
        });
    }
  };
  const {
    auth: { register, forms },
  } = useLanguage();
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="auth-content">
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

        <Button btnCls="btn--secondary">{register}</Button>
      </div>
    </form>
  );
};

export default Register;
