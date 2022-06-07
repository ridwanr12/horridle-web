import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "./useFetch";

const RiddleDetails = () => {
  const { id_riddle } = useParams();

  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .post("http://localhost:3000/get-detail-riddle/")
      .then((res) => {
        console.log(res);
        // setData(res.data);
      })
      .then((data) => {
        setData(data.values);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  const history = useHistory();

  const handleDelete = () => {
    fetch("http://localhost:3000/get-detail-riddle/", {
      method: "DELETE",
    }).then(() => {
      history.push("/");
    });
  };

  const handleClick = () => {
    history.push("/");
  };
  // console.log(body);
  console.log(data);
  return (
    <div className="riddle-details" key={data.id_riddle}>
      {isPending && <div>Loading ....</div>}
      {error && <div>{error}</div>}
      {data && (
        <article>
          <h2>{data.title}</h2>
          <p>Writter by {data.id_user_author} </p>
          <div>{data.riddle_text} </div>
          <button onClick={handleClick}>Back</button>
          <br />
          <button onClick={handleDelete}>Delete</button>
        </article>
      )}
    </div>
  );
};

export default RiddleDetails;
