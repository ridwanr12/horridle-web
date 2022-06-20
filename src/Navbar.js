import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Navbar = () => {
  const history = useHistory();
  const user = localStorage.getItem("user id");

  const handleClick = () => {
    history.push("/");
  }
  return (
    <nav className="navbar">
      <div className="title-navbar">
        <h1 onClick={handleClick}>HORRIDLE</h1>
      </div>
      <div className="links">
        <Link to="/">Home</Link>
        {!user && <Link to="/sign-in">Sign In</Link>}
        {user && <Link to="/user-profile">Profile</Link>}
      </div>
    </nav>
  );
};

export default Navbar;
