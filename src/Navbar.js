import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>HORRIDLE</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/sign-up">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;
