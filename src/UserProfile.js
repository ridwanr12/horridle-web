import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const UserProfile = () => {
  const history = useHistory();

  const user = localStorage.getItem("user id");

  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const [userDetail, setUserDetail] = useState(null);
  const [userRiddle, setUserRiddle] = useState(null);
  const [lenRiddles, setLenRiddles] = useState(null);

  const userDetailAPI = "http://localhost:3000/get-user-detail/";
  const userRiddlesAPI = "http://localhost:3000/get-user-riddles/";

  useEffect(() => {
    setTimeout(() => {
      const req1 = axios.post(userDetailAPI, { id_user: user });
      const req2 = axios.post(userRiddlesAPI, { id_user_author: user });
      axios.all([req1, req2]).then(
        axios.spread((...res) => {
          // console.log(res);
          setUserDetail(res[0].data.values[0]);
          setUserRiddle(res[1].data.values);
          setIsPending(false);
          setError(null);
          setLenRiddles(res[1].data.values.length);
          console.log(res[1].data.values.length);
        })
      );
    }, 250);
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("user id");
    window.localStorage.removeItem("role");
    history.push("/");
    window.location.reload();
  };

  const handleEdit = () => {
    history.push("/edit-profile");
  };

  // console.log(lenRiddleComments);
  // console.log(userDetail);
  // console.log(userRiddle);
  // console.log(lenRiddles);
  return (
    <div className="userProfile">
      {isPending && (
        <div className="loading">
          <h2>Loading ....</h2>
        </div>
      )}
      {error && <div>{error}</div>}
      {userDetail ? (
        <div className="user-detail">
          <div className="user-pic">
            <img src={userDetail.img_profile} className="comcircular_image" />
            <div className="user-name">
              <h1>{userDetail.name}</h1>
              {lenRiddles ? (
                <>
                  <p>{lenRiddles} posts of riddle</p>
                </>
              ) : (
                <>
                  <p>0 posts of riddle</p>
                </>
              )}
            </div>
            <div className="user-button">
              <button onClick={handleLogout}>Logout</button>
              <button onClick={handleEdit}>Edit Profile</button>
            </div>
          </div>
          <br />
          <br />
          <div className="posts">
            <h2>Posts</h2>
            <div className="links">
              <Link to={"/create"}>+ Add</Link>
            </div>
          </div>
          <div className="user-riddle">
            {userRiddle?.map((values) => (
              <div className="userRiddle" key={values.id_riddle}>
                <Link to={`/get-detail-riddle/${values.id_riddle}`}>
                  <h2>{values.title}</h2>
                  <br />
                  <p className="user-riddle-body">{values.riddle_text}</p>
                  <br />
                  <div className="riddle-answer">
                    <p>
                      <span>Answer</span>
                    </p>
                    <p>{values.riddle_answer}</p>
                  </div>
                  <br />
                  <p>
                    <i>
                      Written by <span>You</span>
                    </i>
                  </p>
                  <br />
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="no-user">
          <h1>Please Sign In</h1>
          <Link to="/sign-in">Sign In</Link>
        </div>
      )}
      {/* {!userDetail && (
      )} */}
    </div>
  );
};

export default UserProfile;
