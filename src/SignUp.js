import { Link } from "react-router-dom";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [riddle_text, setBody] = useState("");
  const [answer, setAnswer] = useState("");
  const [id_user_author, setAuthor] = useState(8);
  const [isPending, setIsPending] = useState(false);

  const detailAPI = "http://localhost:3000/get-detail-riddle/";

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsPending(true);

    axios
      .post("http://localhost:3000/add-riddle", {
        id_user_author: id_user_author,
        title: title,
        riddle_text: riddle_text,
        riddle_answer: answer,
      })
      .then(() => {
        console.log("new riddle added");
        setIsPending(false);
        history.push("/");
      });
  };

  const handleCancle = () => {
    history.push("/");
  };

  return (
    <div className="sign-up">
      <h1>SIGN UP</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          required
          placeholder="Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <input
          type="text"
          required
          placeholder="Email"
          value={riddle_text}
          onChange={(e) => setBody(e.target.value)}
        />
        <br />
        <input
          type="password"
          required
          placeholder="Password"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        w/>
        Sudah punya akun?
        <br />
        <div className="sign-up-button">
          {!isPending && <button>CREATE ACCOUNT</button>}
          {isPending && <button disabled>CREATING...</button>}
          <button onClick={handleCancle}>LOGIN</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
