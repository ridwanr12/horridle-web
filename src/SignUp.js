import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const history = useHistory();
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("username123");
  const [passwordInput, setPassword] = useState("");
  const [img_profile, setImgProfile] = useState(
    "https://i.pinimg.com/736x/20/0d/72/200d72a18492cf3d7adac8a914ef3520.jpg"
  );
  const [isPending, setIsPending] = useState(false);

  const registerAPI = "localhost:3000/auth//api/v1/register";

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsPending(true);

    axios
      .post("localhost:3000/auth//api/v1/register", {
        img_profile: img_profile,
        name: nama,
        email: email,
        username: username,
        password: passwordInput,
      })
      .then((res) => {
        console.log("res");
        console.log(res);
        console.log("new riddle added");
        setIsPending(false);
        history.push("/");
      });
  };

  const handleCancel = () => {
    history.push("/");
  };

  const handleLogin = () => {
    history.push("/sign-in");
  };

  return (
    <div className="sign-up">
      <h1>SIGN UP</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          required
          placeholder="Name"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />
        <br />
        <input
          type="text"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          required
          placeholder="Password"
          value={passwordInput}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>
          Already have account? <a href="/sign-in">LOGIN</a>
        </p>
        <a href="/sign-in"></a>
        <div className="sign-up-button">
          {!isPending && <button>REGISTER</button>}
          {isPending && <button disabled>CREATING...</button>}
          <button onClick={handleCancel} className="cancel-regist">
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
