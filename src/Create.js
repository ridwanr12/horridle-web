import { Link } from "react-router-dom";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const Create = () => {
  const history = useHistory();
  // const [id_user_author, setAuthor] = useState(8);
  const user = localStorage.getItem("user id");

  const [title, setTitle] = useState("");
  const [riddle_text, setBody] = useState("");
  const [answer, setAnswer] = useState("");
  const [isPending, setIsPending] = useState(false);

  const detailAPI = "http://localhost:3000/get-detail-riddle/";

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsPending(true);

    axios
      .post("http://localhost:3000/add-riddle", {
        id_user_author: user,
        title: title,
        riddle_text: riddle_text,
        riddle_answer: answer,
      })
      .then(() => {
        // console.log("new riddle added");
        setIsPending(false);
        history.push("/");
      });
  };

  const handleCancel = () => {
    history.push("/");
  };

  return (
    <div className="body-content">
      <Navbar />
      <br />
      <br />
      <div className="create">
        <h2>CREATE NEW RIDDLE</h2>
        <form onSubmit={handleSubmit}>
          <label>Title: </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Riddle: </label>
          <textarea
            required
            value={riddle_text}
            onChange={(e) => setBody(e.target.value)}
          />

          <label>Answer: </label>
          <input
            type="text"
            required
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <div className="create-button">
            {!isPending && <button>UPLOAD</button>}
            {isPending && <button disabled>UPLOADING....</button>}
            <button onClick={handleCancel} className="cancel-create">
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
