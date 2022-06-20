import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  // const [user, setUser] = useState(8);

  const [data, setData] = useState(null);

  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const riddlesAPI = "http://localhost:3000/get-all-riddle";
  useEffect(() => {
    setTimeout(() => {
      axios.post(riddlesAPI).then((res) => {
        // console.log(res);
        setData(res.data.values);
        setIsPending(false);
        setError(null);
      });
    }, 500);
  }, []);

  return (
    <div className="values-list">
      {isPending && <div className="loading"><h2>Loading ....</h2></div>}
      {error && <div>{error}</div>}
      {data?.map((values) => (
        <div className="horridle-preview" key={values.id_riddle}>
          <Link to={`/get-detail-riddle/${values.id_riddle}`}>
            <h2>{values.title}</h2>
            <br />
            <p className="riddle-body">{values.riddle_text}</p>
            <br />
            <p>
              <i>
                Written by <span>{values.name}</span>
              </i>
            </p>
            <br />
          </Link>
        </div>
      ))}
      <div className="plus-create">
        <Link to="/create" className="plus-create">
          +
        </Link>
      </div>
    </div>
  );
};

export default Home;
