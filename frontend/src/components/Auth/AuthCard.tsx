import { useLanguage } from "@/hooks/context";
import { useTabs } from "@/hooks/navigation";
import Button from "../Button";
import Card from "../Card";

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
      <Card containerCls="card--auth-card bg-white">
        <div className="auth-headers">
          <Button
            onClick={() => {
              setTab();
            }}
            btnCls={`btn--auth ${!tab || tab === "login" ? "selected" : ""}`}
          >
            <>login</>
          </Button>
          <Button
            onClick={() => {
              setTab("register");
            }}
            btnCls={`btn--auth ${tab === "register" ? "selected" : ""}`}
          >
            <>register</>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AuthCard;
