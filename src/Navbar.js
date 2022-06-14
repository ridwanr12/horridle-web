import { useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = localStorage.getItem("user id");
  return (
    <nav className="navbar">
      <h1>HORRIDLE</h1>
      <div className="links">
        <Link to="/">Home</Link>
        {!user && <Link to="/sign-in">Sign In</Link>}
        {user && <Link to="/user-profile">Profile</Link>}
      </div>
    </nav>
  );
};

export default Navbar;
