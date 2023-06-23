import RoutesCtrl from "@/components/Controllers/RoutesCtrl";
import ProviderLayout from "@/components/Layouts/ProviderLayout";
import Navbar from "@/components/Navigation/Navbar";
import "@/styles/app.css";
function App() {
  return (
    <ProviderLayout>
      <div className="app-container">
        <Navbar />
        <RoutesCtrl />
      </div>
    </ProviderLayout>
  );
}

export default App;
