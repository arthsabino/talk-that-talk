import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        backgroundColor: "grey",
        display: "flex",
      }}
    >
      <Link to="/" style={{ marginRight: "30px" }}>
        Home Page
      </Link>
      <Link to="/chats">Chats page</Link>
    </div>
  );
};

export default Navbar;
