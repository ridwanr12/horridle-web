import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const RiddleDetails = () => {
  const history = useHistory();
  const { id_riddle } = useParams();

  // const [user, setUser] = useState(8);
  const user = localStorage.getItem("user id");

  const [data, setData] = useState(null);
  const [comments, setComments] = useState(null);
  const [riddle, setRiddle] = useState(null);

  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const [show, setShow] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [del, setDel] = useState(false);

  const detailAPI = "http://localhost:3000/get-detail-riddle/";
  const allCommentsAPI = "http://localhost:3000/get-riddle-comments/";
  const allAPI = "http://localhost:3000/get-all-riddle/";

  useEffect(() => {
    const req1 = axios.post(detailAPI, { id_riddle: id_riddle });
    const req2 = axios.post(allCommentsAPI, { id_riddle: id_riddle });
    const req3 = axios.post(allAPI, { id_riddle: id_riddle });
    axios.all([req1, req2, req3]).then(
      axios.spread((...res) => {
        // console.log(res);
        setData(res[0].data.values[0]);
        setComments(res[1].data.values);
        setRiddle(res[2].data.values);
        setIsPending(false);
        setError(null);
        // console.log(data);
        if (user == data.id_user) {
          console.log("bener");
          setDel(true);
        } else {
          console.log("bukan pemilik riddle");
          setDel(false);
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
      console.log(commentInput);
      setShow(true);
    }
  };

  const handleComment = (e) => {
    e.preventDefault();

    setIsPending(true);

    axios
      .post("localhost:3000/comment-riddle", {
        id_riddle: id_riddle,
        id_user: user,
        comment: commentInput,
      })
      .then((res) => {
        console.log("res");
        console.log(res);
        console.log("new riddle added");
        setIsPending(false);
        history.push("/");
      });
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
  // console.log(allComments);
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
              <div className="riddle-user-profile">
                <img src={data.img_profile} />
                <div className="riddle-user-name">
                  <h2>{data.name}</h2>
                  <p>Created at {data.date}</p>
                </div>
                {del && (
                  <div className="delete-riddle">
                    <button onClick={handleDelete}>Delete</button>
                  </div>
                )}
              </div>
              <br />
              <p>{data.riddle_text}</p>
              <br />
              Komen trus enter buat munculin answer tp ms bug jg si wkwkwk
              <br />
              {show && (
                <p className="answer-detail">Answer : {data.riddle_answer}</p>
              )}
              {del && (
                <p className="answer-detail">Answer : {data.riddle_answer}</p>
              )}
            </article>
          )}
          {!del && (
            <div className="commenting">
              <form action=""></form>
              <input
                type="text"
                // id="commentInput"
                // name="commentInput"
                placeholder="Tambahkan Jawaban..."
                onKeyDown={handleEnter}
                required
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
              />
            </div>
          )}
          {comments?.map((comments) => (
            // <div className="comments" key={comments.id_riddle}>
            <div className="comments" key={comments.id_comment}>
              <div className="comprofile">
                <img src={comments.img_profile} className="comcircular_image" />
                <div className="com-name">
                  <h1>{comments.name}</h1>
                  <p className="date">dibuat {comments.date}</p>
                </div>
              </div>
              {/* <br /> */}
              <p className="comments-text">{comments.comment}</p>
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
