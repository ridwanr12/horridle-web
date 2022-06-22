import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

const EditProfile = () => {
  const history = useHistory();

  const user = localStorage.getItem("user id");

  const [nameEdit, setNameEdit] = useState(null);
  const [emailEdit, setEmailEdit] = useState(null);
  const [imgEdit, setImgEdit] = useState(null);
  const [passwordEdit, setPassEdit] = useState("");
  const [confPassEdit, setConfPassEdit] = useState("");

  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  const [confPassMessage, setConfPassMessage] = useState(null);

  const [userDetail, setUserDetail] = useState(null);

  const userDetailAPI = "http://localhost:3000/get-user-detail/";
  const editProfileAPI = "http://localhost:3000/edit-profile/";

  useEffect(() => {
    setTimeout(() => {
      axios
        .post(userDetailAPI, {
          id_user: user,
          name: nameEdit,
          email: emailEdit,
          img_profile: imgEdit,
          password: passwordEdit,
        })
        .then((res) => {
          // console.log("res", res);
          setUserDetail(res.data.values);
          setUserDetail(res.data.values[0]);
          setNameEdit(res.data.values[0].name);
          setEmailEdit(res.data.values[0].email);
          setImgEdit(res.data.values[0].img_profile);
          setIsPending(false);
          setError(null);
        });
    }, 250);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (imgEdit == null) {
      console.log("ga ubah gambar");
      setImgEdit(userDetail.img_profile);
      console.log(imgEdit);
    }
    if (passwordEdit == "") {
      console.log(passwordEdit);
      console.log("Password ga diubah");
    }

    setIsPending(true);

    axios
      .post(editProfileAPI, {
        id_user: user,
        name: nameEdit,
        email: emailEdit,
        img_profile: imgEdit,
        password: passwordEdit,
      })
      .then((res) => {
        console.log("res", res);
        setIsPending(false);
        yesToast();
        history.push("/");
      });
  };
  const handleCancel = () => {
    history.push("/user-profile");
  };

  const handleFileSelect = (pics) => {
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "notezipper");
      data.append("cloud_name", "piyushproj");
      fetch("https://api.cloudinary.com/v1_1/piyushproj/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setImgEdit(data.url.toString());
          console.log(imgEdit);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Tolong pilih file Image");
    }
  };

  const handleConfirm = (e) => {
    setConfPassEdit(e.target.value);
    if (passwordEdit != confPassEdit) {
      setConfPassMessage("Confirm Password not match with password");
    } else {
      setConfPassMessage("");
    }
  };

  const yesToast = () => {
    toast.success("Edit Profile Sukses!", {
      position: "top-right",
      autoClose: 1000,
      draggable: false,
      theme: "colored",
    });
  };

  return (
    <div className="page-edit-profile">
      <div className="editUser">
        {isPending && (
          <div className="loading">
            <h2>Loading ....</h2>
          </div>
        )}
        {error && <div>{error}</div>}
        {userDetail && (
          <div className="user-detail">
            <h2>Preview</h2>
            <h3>Refresh untuk reset</h3>
            <br />
            {picMessage && <h2>{picMessage}</h2>}
            <div className="user-pic">
              <label htmlFor="imgfile">
                <img src={imgEdit} className="comcircular_image" />
              </label>
              <label htmlFor="imgfile" className="img-file">
                <FontAwesomeIcon
                  icon={faPen}
                  className="icon"
                ></FontAwesomeIcon>
              </label>
              <div className="user-name">
                <h1>{nameEdit}</h1>
                <p>N posts of riddle</p>
              </div>
            </div>
            <div className="form-edit">
              <form onSubmit={handleSubmit}>
                <div className="form-edit-user">
                  <div className="edituser name-email">
                    <h2>Identity</h2>
                    <label>Name</label>
                    <input
                      type="text"
                      required
                      value={nameEdit}
                      onChange={(e) => setNameEdit(e.target.value)}
                    />

                    <label>Email</label>
                    <input
                      type="text"
                      required
                      value={emailEdit}
                      onChange={(e) => setEmailEdit(e.target.value)}
                    />

                    <input
                      id="imgfile"
                      type="file"
                      accept="image/png, image/jpeg"
                      onChange={(e) => handleFileSelect(e.target.files[0])}
                    />
                  </div>
                  <div className="edituser pass">
                    <h2>Change Password</h2>
                    <label>New Password</label>
                    <input
                      type="password"
                      placeholder="Kosongkan = tidak diubah"
                      value={passwordEdit}
                      onChange={(e) => setPassEdit(e.target.value)}
                    />
                    <label>Confirm New Password</label>
                    <input
                      type="password"
                      value={confPassEdit}
                      onChange={(e) => setConfPassEdit(e.target.value)}
                      onBlur={(e) => handleConfirm(e)}
                    />
                    <p style={{ color: "red" }}>{confPassMessage}</p>
                    <div className="edit-profile-button">
                      {confPassMessage ? (
                        <>{!isPending && <button disabled>SAVE</button>}</>
                      ) : (
                        <>{!isPending && <button>SAVE</button>}</>
                      )}
                      {isPending && <button disabled>SAVING....</button>}
                      <button
                        onClick={handleCancel}
                        className="cancel-edit-profile"
                      >
                        CANCEL
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
