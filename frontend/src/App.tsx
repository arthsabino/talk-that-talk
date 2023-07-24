import RoutesCtrl from "@/components/Controllers/RoutesCtrl";
import ProviderLayout from "@/components/Layouts/ProviderLayout";
import "@/styles/app.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLanguage } from "./hooks/context";
function App() {
  const { app_name } = useLanguage();
  return (
    <ProviderLayout>
      <title>{app_name}</title>
      <div className="app-container">
        <RoutesCtrl />
        <ToastContainer
          position="top-center"
          limit={3}
          toastStyle={{
            backgroundColor: "var(--secondary)",
            color: "var(--white)",
          }}
        />
      </div>
    </ProviderLayout>
  );
}

export default App;
