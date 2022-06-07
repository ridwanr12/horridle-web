import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

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

  // console.log(data[0]);
  // console.log(data[0]);
  return (
    <div className="apa" key={id_riddle}>
      <button onClick={handleClick} className="back-arrow"></button>
      {isPending && <div>Loading ....</div>}
      {error && <div>{error}</div>}
      {data && (
        <article className="horridle-details">
          <h1 className="title">{data[0].title}</h1>
          <br />
          <div className="profile">
            <img src={data[0].img_profile} className="circular_image" /><h2>{data[0].name}</h2>
          </div>
          <p>Created at {data[0].date}</p>
          <br />
          <p>{data[0].riddle_text}</p>
          <br />
          <p className="answer-detail">Answer : {data[0].riddle_answer}</p>

          {/* <button onClick={handleClick}>Back</button> */}
          {/* <br /> */}
          {/* <button onClick={handleDelete}>Delete</button> */}
        </article>
      )}
    </div>
  );
};

export default RiddleDetails;
