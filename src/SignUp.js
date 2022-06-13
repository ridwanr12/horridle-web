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

  const [eye, seteye] = useState(true);
  const [password, setpassword] = useState("password");

  const registerAPI = "http://localhost:3000/auth//api/v1/register";

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsPending(true);

    axios
      .post(registerAPI, {
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

  const Eye = () => {
    if (password == "password") {
      setpassword("text");
      seteye(false);
    } else {
      setpassword("password");
      seteye(true);
    }
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
        <br /><br />
        <input
          type="text"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <div className="input-password">
          <i
            onClick={Eye}
            className={`fa ${eye ? "fa-eye-slash" : "fa-eye"}`}
          ></i>
          <input
            type={password}
            required
            placeholder="Password"
            value={passwordInput}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p>
          Already have account? <a href="/sign-in">LOGIN</a>
        </p>
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
