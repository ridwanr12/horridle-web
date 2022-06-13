import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [passwordInput, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);

  const [eye, seteye] = useState(true);
  const [password, setpassword] = useState("password");

  // const registerAPI = "localhost:3000/auth//api/v1/register";

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsPending(true);

    axios
      .post("localhost:3000/auth//api/v1/login", {
        email: email,
        password: passwordInput,
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

  // const handlePassword = () => {
  //   history.push("/");
  // };

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
    <div className="sign-in">
      <h1>SIGN IN</h1>
      <form onSubmit={handleSubmit}>
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
          Don't have any account? <a href="/sign-up">SIGN UP</a>
        </p>
        <div className="sign-in-button">
          {!isPending && <button>LOGIN</button>}
          {isPending && <button disabled>LOGIN...</button>}
          <button onClick={handleCancel} className="cancel-login">
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
