import { useEffect, useState } from "react";
import axios from "axios";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";

const EditRiddle = () => {
  const history = useHistory();
  const { id_riddle } = useParams();
  const user = localStorage.getItem("user id");

  const [data, setData] = useState(null);

  const [titleEdit, setTitleEdit] = useState("");
  const [riddle_textEdit, setBodyEdit] = useState("");
  const [riddle_answerEdit, setAnswerEdit] = useState("");
  const [isPending, setIsPending] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

  const detailRiddleAPI = "http://localhost:3000/get-detail-riddle/";
  const editAPI = "http://localhost:3000/edit-riddle/";

  useEffect(() => {
    setTimeout(() => {
      axios
        .post(detailRiddleAPI, {
          id_riddle: id_riddle,
        })
        .then((res) => {
          // console.log(res);
          setData(res.data.values[0]);
          setIsPending(false);
          console.log(res.data.values[0]);
          if (user == res.data.values[0].id_user) {
            console.log("pemilik");
            setIsOwner(true);
            setTitleEdit(res.data.values[0].title);
            setBodyEdit(res.data.values[0].riddle_text);
            setAnswerEdit(res.data.values[0].riddle_answer);
          }
        });
    }, 500);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsPending(true);

    axios
      .post(editAPI, {
        id_riddle: id_riddle,
        title: titleEdit,
        riddle_text: riddle_textEdit,
        riddle_answer: riddle_answerEdit,
      })
      .then((res) => {
        console.log("res", res);
        setIsPending(false);
        history.push("/");
      });
  };

  const handleCancel = () => {
    history.push("/");
  };

  return (
    <div className="page-edit">
      {isPending && (
        <div className="loading">
          <h2>Loading ....</h2>
        </div>
      )}
      {isOwner && (
        <div className="edit">
          <h2>EDIT RIDDLE</h2>
          <form onSubmit={handleSubmit}>
            <label>Title: </label>
            <input
              type="text"
              required
              value={titleEdit}
              onChange={(e) => setTitleEdit(e.target.value)}
            />

            <label>Riddle: </label>
            <textarea
              required
              value={riddle_textEdit}
              onChange={(e) => setBodyEdit(e.target.value)}
            />

            <label>Answer: </label>
            <input
              type="text"
              required
              value={riddle_answerEdit}
              onChange={(e) => setAnswerEdit(e.target.value)}
            />
            <div className="edit-button">
              {!isPending && <button>EDIT</button>}
              {isPending && <button disabled>EDITING....</button>}
              <button onClick={handleCancel} className="cancel-edit">
                CANCEL
              </button>
            </div>
          </form>
        </div>
      )}
      {!isOwner && (
        <div className="not-owner">
          You're not the <b>owner</b>
        </div>
      )}
    </div>
  );
};

export default EditRiddle;
