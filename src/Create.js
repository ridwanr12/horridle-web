import { Link } from "react-router-dom";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState("");
  const [riddle_text, setBody] = useState("");
  const [answer, setAnswer] = useState("");
  const [id_user_author, setAuthor] = useState("admin sementara");
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const riddle = { title, riddle_text, answer, id_user_author };

    setIsPending(true);

    fetch("http://localhost:3000/riddles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(riddle),
    }).then(() => {
      console.log("new riddle added");
      setIsPending(false);
      // history.go(-1);
      history.push("/");
    });
  };

  const handleCancle = () => {
    history.push("/");
  };

  return (
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
          <button onClick={handleCancle}>CANCLE</button>
        </div>
      </form>
    </div>
  );
};

export default Create;
