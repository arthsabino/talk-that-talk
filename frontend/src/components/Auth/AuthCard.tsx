import { useLanguage } from "@/hooks/context";
import { useTabs } from "@/hooks/navigation";
import Button from "../Button";
import Card from "../Card";
import Login from "./Login";
import Register from "./Register";

const AuthCard = () => {
  const { app_name: appName } = useLanguage();
  const { tab, setTab } = useTabs();
  return (
    <div className="auth-container">
      <Card containerCls="card--auth-card bg-secondary">
        <div className="w-full flex items-center justify-center">
          <h2>{appName}</h2>
        </div>
      </Card>
      <Card containerCls="card--auth-card flex-col bg-white relative">
        <>
          <div className="auth-headers">
            <Button
              onClick={() => {
                setTab();
              }}
              btnCls={`btn--auth ${!tab || tab === "login" ? "selected" : ""}`}
            >
              login
            </Button>
            <Button
              onClick={() => {
                setTab("register");
              }}
              btnCls={`btn--auth ${tab === "register" ? "selected" : ""}`}
            >
              register
            </Button>
          </div>
          {!tab || tab === "login" ? (
            <Login />
          ) : tab === "register" ? (
            <Register />
          ) : null}
        </>
      </Card>
    </div>
  );
};

export default AuthCard;
