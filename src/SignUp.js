import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const history = useHistory();
  const [regNama, setRegNama] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const username = "username123";
  const [regPasswordInput, setRegPassword] = useState("");
  const img_profile =
    "https://i.pinimg.com/736x/20/0d/72/200d72a18492cf3d7adac8a914ef3520.jpg";
  const [isPending, setIsPending] = useState(false);
  const [my_id, setMyId] = useState("");

  const [eye, seteye] = useState(true);
  const [password, setpassword] = useState("password");

  const registerAPI = "http://localhost:3000/auth//api/v1/register";

  const yesToast = () => {
    toast.success("Register Successfull!", {
      position: "top-right",
      autoClose: 2000,
      draggable: false,
      theme: "colored",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsPending(true);

    axios
      .post(registerAPI, {
        img_profile: img_profile,
        name: regNama,
        email: regEmail,
        username: username,
        password: regPasswordInput,
      })
      .then((res) => {
        console.log("res", res);
        setIsPending(false);
        localStorage.setItem("user id", res.data.my_user_id);
        setMyId(localStorage.getItem("user id"));
        history.push("/");
        window.location.reload();
        yesToast();
        yesToast();
        yesToast();
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
    <div className="page-sign-up">
      <div className="sign-up">
        <h1>SIGN UP</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            required
            placeholder="Name"
            value={regNama}
            onChange={(e) => setRegNama(e.target.value)}
          />
          <br />
          <br />
          <input
            type="text"
            required
            placeholder="Email"
            value={regEmail}
            onChange={(e) => setRegEmail(e.target.value)}
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
              value={regPasswordInput}
              onChange={(e) => setRegPassword(e.target.value)}
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
    </div>
  );
};

export default SignUp;
