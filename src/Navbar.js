import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Navbar = () => {
  const history = useHistory();
  const user = localStorage.getItem("user id");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    window.localStorage.removeItem("user id");
    window.localStorage.removeItem("role");
    history.push("/");
    window.location.reload();
  };

  const handleClick = () => {
    history.push("/");
  };

  return (
    <nav className="navbar">
      <div className="title-navbar">
        <h1 onClick={handleClick}>HORRIDLE</h1>
      </div>
      <div className="links">
        <Link to="/">Home</Link>
        {!user && <Link to="/sign-in">Sign In</Link>}
        {role == 1 && (
          <>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
        {role == 2 && <Link to="/user-profile">Profile</Link>}
      </div>
    </nav>
  );
};

export default Navbar;
