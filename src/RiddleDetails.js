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
  // console.log("id riddle", id_riddle);
  useEffect(() => {
    axios
      .post("http://localhost:3000/get-detail-riddle/", {
        id_riddle: id_riddle,
      })
      .then((res) => {
        // console.log("isi res: \n", res);
        setData(res.data.values);
        setIsPending(false);
        setError(null);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  // console.log(data);
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
  // console.log(id_riddle);
  // console.log(data);
  // console.log(data[0].values);
  
  return (
    <div className="horridle-details" key={id_riddle}>
      {isPending && <div>Loading ....</div>}
      {error && <div>{error}</div>}
      {data && (
        <article>
          <h1 className="title">{data[0].title}</h1>
          <br />
          <h2>Penulis dengan id : {data[0].id_user_author}</h2>
          <p>Writter by {data[0].id_user_author} </p>
          <div>{data[0].riddle_text} </div>
          <div>{data[0].riddle_text} </div>
          <button onClick={handleClick}>Back</button>
          <br />
          <button onClick={handleDelete}>Delete</button>
        </article>
      )}
    </div>
  );
};

export default RiddleDetails;
