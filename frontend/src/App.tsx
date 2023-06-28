import RoutesCtrl from "@/components/Controllers/RoutesCtrl";
import ProviderLayout from "@/components/Layouts/ProviderLayout";
import Navbar from "@/components/Navigation/Navbar";
import "@/styles/app.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <ProviderLayout>
      <div className="app-container">
        <Navbar />
        <RoutesCtrl />
        <ToastContainer position="top-center" limit={3} />
      </div>
    </ProviderLayout>
  );
}

export default App;
