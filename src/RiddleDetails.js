import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const RiddleDetails = () => {
  const history = useHistory();
  const { id_riddle } = useParams();

  const [user, setUser] = useState(8);

  const [data, setData] = useState(null);
  const [comments, setComments] = useState(null);
  const [riddle, setRiddle] = useState(null);

  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const [show, setShow] = useState(false);
  const [jawab, setJawab] = useState("");
  const [edit, setEdit] = useState(false);

  const detailAPI = "http://localhost:3000/get-detail-riddle/";
  const commentsAPI = "http://localhost:3000/get-riddle-comments/";
  const allAPI = "http://localhost:3000/get-all-riddle/";
  // setUser(8);

  useEffect(() => {
    const req1 = axios.post(detailAPI, { id_riddle: id_riddle });
    const req2 = axios.post(commentsAPI, { id_riddle: id_riddle });
    const req3 = axios.post(allAPI, { id_riddle: id_riddle });
    axios.all([req1, req2, req3]).then(
      axios.spread((...res) => {
        // console.log(res);
        setData(res[0].data.values[0]);
        setComments(res[1].data.values);
        setRiddle(res[2].data.values);
        setIsPending(false);
        setError(null);
        if (user === data.id_user) {
          console.log("bener");
          setEdit(true);
        } else {
          console.log("bukan pemilik riddle");
          setEdit(false);
        }
      })
    );
  });

  const handleClick = () => {
    history.push("/");
  };
  // console.log(user);

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      console.log(jawab);
      setShow(true);
      // history.push("");
    }
  };

  const handleDelete = () => {
    axios
      .post("http://localhost:3000/delete-riddle/", {
        id_riddle: id_riddle,
      })
      .then((res) => {
        console.log(res);
        history.push("/");
      });
  };

  // console.log(data);
  // console.log(comments);
  return (
    <div className="page-detail">
      <button onClick={handleClick} className="back-arrow"></button>
      {isPending && <div>Loading ....</div>}
      {error && <div>{error}</div>}
      <div className="column left">
        <div className="horridle-details">
          {data && (
            <article>
              <h1 className="title">{data.title}</h1>
              {edit && (
                <div className="delete-riddle">
                  <button onClick={handleDelete}>Delete</button>
                </div>
              )}
              <div className="profile">
                <img src={data.img_profile} className="circular_image" />
                <h2>{data.name}</h2>
              </div>
              <p>Created at {data.date}</p>
              <br />
              <p>{data.riddle_text}</p>
              <br />
              Komen trus enter buat munculin answer tp ms bug jg si wkwkwk
              <br />
              {show && (
                <p className="answer-detail">Answer : {data.riddle_answer}</p>
              )}
            </article>
          )}
          <div className="commenting">
            <form action=""></form>
            <input
              type="text"
              id="jawab"
              name="jawaban"
              placeholder="Tambahkan Jawaban..."
              onKeyDown={handleEnter}
              required
              value={jawab}
              onChange={(e) => setJawab(e.target.value)}
            />
          </div>
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
            {/* <Link to={`/get-all-riddle/`}></Link> */}
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
