import { ReactElement } from "react";
import { Link } from "react-router-dom";

const HomePage = (): ReactElement => {
  return (
    <div>
      <Link to="/">Home Page</Link>
      <Link to="/chats">Chats page</Link>
    </div>
  );
};

export default HomePage;
