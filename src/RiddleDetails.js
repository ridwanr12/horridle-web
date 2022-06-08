import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const RiddleDetails = () => {
  const { id_riddle } = useParams();

  const [data, setData] = useState(null);
  const [comments, setComments] = useState(null);
  const [riddle, setRiddle] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const detailAPI = "http://localhost:3000/get-detail-riddle/";
  const commentsAPI = "http://localhost:3000/get-riddle-comments/";
  const allAPI = "http://localhost:3000/get-all-riddle/";

  useEffect(() => {
    const req1 = axios.post(detailAPI, { id_riddle: id_riddle });
    const req2 = axios.post(commentsAPI, { id_riddle: id_riddle });
    const req3 = axios.post(allAPI, { id_riddle: id_riddle });
    axios.all([req1, req2, req3]).then(
      axios.spread((...res) => {
        console.log(res);
        setData(res[0].data.values[0]);
        setComments(res[1].data.values);
        setRiddle(res[2].data.values);
        setIsPending(false);
        setError(null);
      })
    );
  });

  const history = useHistory();

  const handleClick = () => {
    history.push("/");
  };

  // const handleDelete = () => {
  //   fetch("http://localhost:3000/get-detail-riddle/", {
  //     method: "DELETE",
  //   }).then(() => {
  //     history.push("/");
  //   });
  // };

  console.log(data);
  console.log(comments);

  return (
    // <div className="apa" key={id_riddle}>
    <div className="page-detail">
      <button onClick={handleClick} className="back-arrow"></button>
      {isPending && <div>Loading ....</div>}
      {error && <div>{error}</div>}
      <div className="column left">
        <div className="horridle-details">
          {data && (
            <article>
              <h1 className="title">{data.title}</h1>
              <div className="profile">
                <img src={data.img_profile} className="circular_image" />
                <h2>{data.name}</h2>
              </div>
              <p>Created at {data.date}</p>
              <br />
              <p>{data.riddle_text}</p>
              <br />
              <p className="answer-detail">Answer : {data.riddle_answer}</p>

              {/* <button onClick={handleClick}>Back</button> */}
              {/* <br /> */}
              {/* <button onClick={handleDelete}>Delete</button> */}
            </article>
          )}
          {comments?.map((comments) => (
            // <div className="comments" key={comments.id_riddle}>
            <div className="comments" key={comments.id_comment}>
              <div className="comprofile">
                <img src={comments.img_profile} className="comcircular_image" />
                <h1>{comments.name}</h1>
                <p className="date">dibuat {comments.date}</p>
              </div>
              <p>{comments.comment}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="column right">
        <h2>Riddle Lainnya</h2>
        {riddle?.map((values) => (
          <div className="other-riddle" key={values.id_riddle}>
            <Link to={`/get-detail-riddle/${values.id_riddle}`}>
              <h2>{values.title}</h2>
              <p>
                <i>
                  Written by <span>{values.name}</span>
                </i>
              </p>
              <br />
              <p className="other-riddle-body">{values.riddle_text}</p>
              <br />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiddleDetails;
