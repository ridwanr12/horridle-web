import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RiddleDetails = () => {
  const history = useHistory();
  const { id_riddle } = useParams();

  const user = localStorage.getItem("user id");
  const role = localStorage.getItem("role");

  const [data, setData] = useState(null);
  const [comments, setComments] = useState(null);
  const [riddle, setRiddle] = useState(null);

  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const [show, setShow] = useState(false);
  const [pernah, setPernah] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [isAuthor, setIsAuthor] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const detailAPI = "http://localhost:3000/get-detail-riddle/";
  const allCommentsAPI = "http://localhost:3000/get-riddle-comments/";
  const allAPI = "http://localhost:3000/get-all-riddle/";
  const commentAPI = "http://localhost:3000/comment-riddle/";

  useEffect(() => {
    setTimeout(() => {
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
          // beberapa cek untuk handle show jawaban & komentar
          if (role == 1) {
            console.log("admin");
            setIsAuthor(true);
            setShow(true);
            setIsLogin(true);
          } else if (role == 2) {
            if (user == res[0].data.values[0].id_user) {
              console.log("Pemilik riddle");
              setIsAuthor(true);
              setShow(true);
              setIsLogin(true);
            } else if (localStorage.getItem("user id") === null) {
              console.log("Belum login");
              setIsLogin(false);
              setIsAuthor(false);
              setShow(false);
            } else if (user != res[0].data.values[0].id_user) {
              if (comments.length >= 1) {
                for (let i = 0; i < comments.length; i++) {
                  if (comments[i].id_user == user) {
                    // console.log("pernah???");
                    setPernah(true);
                    break;
                  }
                  setPernah(false);
                }
                if (pernah) {
                  console.log("bukan pemilik tapi sudah pernah menjawab");
                  setShow(true);
                  setIsAuthor(false);
                  setIsLogin(true);
                } else if (!pernah) {
                  console.log("belum jawab");
                  setShow(false);
                  setIsAuthor(false);
                  setIsLogin(true);
                }
              } else if (comments.length == 0) {
                console.log(
                  "bukan pemilik riddle dan bahkan belum ada jawaban"
                );
                setShow(false);
                setIsAuthor(false);
                setIsLogin(true);
              }
            }
          }
        })
      );
    }, 500);
  });

  const handleClick = () => {
    history.push("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.reload();
    console.log(commentInput);

    setIsPending(true);

    axios
      .post(commentAPI, {
        id_riddle: id_riddle,
        id_user: user,
        comment: commentInput,
      })
      .then((res) => {
        console.log("res", res);
        setIsPending(false);
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

  const handleComDelete = (id_com) => {
    console.log(id_com);
    axios
      .post("http://localhost:3000/delete-comment/", {
        id_comment: id_com,
      })
      .then((res) => {
        console.log(res);
        window.location.reload();
      });
  };

  const handlePoin = (id_user) => {
    console.log(id_user);
    axios
      .post("http://localhost:3000/add-points/", {
        id_user: id_user,
        points: 10,
      })
      .then((res) => {
        console.log(res);
        yesToast();
      });
  };

  const yesToast = () => {
    toast.success("Sukses memberikan poin", {
      position: "top-right",
      autoClose: 2000,
      draggable: false,
      theme: "colored",
    });
  };

  return (
    <div className="page-detail">
      <button onClick={handleClick} className="back-arrow"></button>
      {isPending && (
        <div className="loading">
          <h2>Loading ....</h2>
        </div>
      )}
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
                {isAuthor && (
                  <div className="button-riddle">
                    <Link to={`/edit/${data.id_riddle}`}>
                      <button>Edit</button>
                    </Link>
                    <button onClick={handleDelete}>Delete</button>
                  </div>
                )}
              </div>
              <br />
              <p>{data.riddle_text}</p>
              {show && (
                <p className="answer-detail">Answer : {data.riddle_answer}</p>
              )}
              {/* {isAuthor && (
                <p className="answer-detail">Author Answer : {data.riddle_answer}</p>
              )} */}
            </article>
          )}
          {isLogin ? (
            <>
              {!isAuthor && (
                <div className="commenting">
                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      placeholder="Tambahkan Jawaban..."
                      required
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                    />
                    <div className="comment">
                      {!isPending && <button>Comment</button>}
                      {isPending && <button disabled>Commenting...</button>}
                    </div>
                  </form>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="commenting">
                <input type="text" placeholder="Please Sign In" disabled />
              </div>
            </>
          )}
          {show && (
            <>
              {comments?.map((comments) => (
                <div className="comments" key={comments.id_comment}>
                  <div className="comprofile">
                    <img
                      src={comments.img_profile}
                      className="comcircular_image"
                    />
                    <div className="com-name">
                      <h1>{comments.name}</h1>
                      <p className="date">dibuat {comments.date}</p>
                    </div>
                    {role == 2 && (
                      <>
                        {isAuthor && (
                          <>
                            <button
                              onClick={() => handlePoin(comments.id_user)}
                            >
                              Berikan poin
                            </button>
                          </>
                        )}
                      </>
                    )}
                    {role == 1 && (
                      <>
                        <button
                          onClick={() => handleComDelete(comments.id_comment)}
                        >
                          Delete Comment
                        </button>
                      </>
                    )}
                  </div>
                  <p className="comments-text">{comments.comment}</p>
                </div>
              ))}
            </>
          )}
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
