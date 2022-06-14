import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Navbar from "./Navbar";

const NotFound = () => {
  return (
    <div className="body-content">
      <Navbar />
      <br />
      <br />
      <div className="not-found">
        <h2>Sorry</h2>
        <p>That page cannot be found</p>
        <Link to="/">Back to homepage ...</Link>
      </div>
    </div>
  );
};

export default NotFound;
