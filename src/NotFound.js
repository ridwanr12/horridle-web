import { Link } from "react-router-dom/cjs/react-router-dom.min";

const NotFound = () => {
  return (
    <div className="page-not-found">
      <div className="not-found">
        <h2>Maaf</h2>
        <p>Halaman yang Anda tuju tidak tersedia</p>
        <Link to="/">Kembali ke halaman utama ...</Link>
      </div>
    </div>
  );
};

export default NotFound;
