import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// axios.defaults.withCredentials=true;

const SignIn = () => {
  const history = useHistory();
  const [logEmail, setLogEmail] = useState("");
  const [logPasswordInput, setLogPassword] = useState("");

  const [isPending, setIsPending] = useState(false);
  // const [loginStatus, setLoginStatus] = useState(false);
  const [responServer, setResponServer] = useState("");
  const [my_id, setMyId] = useState("");

  const [eye, seteye] = useState(true);
  const [password, setpassword] = useState("password");

  const loginAPI = "http://localhost:3000/auth//api/v1/login";

  const yesToast = () => {
    toast.success("Login Successfull!", {
      position: "top-right",
      autoClose: 2000,
      draggable: false,
      theme: "colored",
      // pauseOnFocusLoss: false,
    });
  };
  const noToast = () => {
    toast.error("Login Failed!", {
      position: "top-right",
      autoClose: 3000,
      draggable: false,
      theme: "colored",
      pauseOnFocusLoss: false,
    });
  };

  // axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();

    setIsPending(true);

    axios
      .post(loginAPI, {
        email: logEmail,
        password: logPasswordInput,
      })
      .then((res) => {
        console.log("res", res);
        if (res.data.success) {
          console.log(res.data.message);
          setResponServer(res.data.message);
          localStorage.setItem("user id", res.data.my_user_id);
          localStorage.setItem("role", res.data.my_role);
          // setLoginStatus(true);
          setIsPending(false);
          history.push("/");
          window.location.reload();
          // yesToast();
        } else if (!res.data.success) {
          console.log(res.data.message);
          setResponServer(res.data.message);
          setIsPending(false);
          noToast();
        }
      });
  };

  const handleCancel = () => {
    history.push("/");
  };

  const Eye = () => {
    if (password === "password") {
      setpassword("text");
      seteye(false);
    } else {
      setpassword("password");
      seteye(true);
    }
  };

  return (
    <div className="page-sign-in">
      <div className="sign-in">
        <h1>{responServer}</h1>
        {my_id && <h1>My user ID: {my_id}</h1>}
        <h1>SIGN IN</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            required
            placeholder="Email"
            value={logEmail}
            name="loginEmail"
            onChange={(e) => setLogEmail(e.target.value)}
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
              value={logPasswordInput}
              name="loginPassword"
              onChange={(e) => setLogPassword(e.target.value)}
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
    </div>
  );
};

export default SignIn;
