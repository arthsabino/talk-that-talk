import { useLanguage } from "@/hooks/context";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { navigation: navStr } = useLanguage();
  return (
    <nav>
      <div className="main-container nav-container">
        <Link to="/">{navStr[0]}</Link>
        <Link to="/chats">{navStr[1]}</Link>
      </div>
    </nav>
  );
};

export default Navbar;
