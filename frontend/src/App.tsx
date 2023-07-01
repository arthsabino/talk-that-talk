import RoutesCtrl from "@/components/Controllers/RoutesCtrl";
import ProviderLayout from "@/components/Layouts/ProviderLayout";
import "@/styles/app.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <ProviderLayout>
      <div className="app-container">
        <RoutesCtrl />
        <ToastContainer position="top-center" limit={3} />
      </div>
    </ProviderLayout>
  );
}

export default App;
