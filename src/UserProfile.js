import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const UserProfile = () => {
  const [user, setUser] = useState(6);

  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const [userDetail, setUserDetail] = useState(null);
  const [userRiddle, setUserRiddle] = useState(null);
  const [lenRiddles, setLenRiddles] = useState(null);

  const userDetailAPI = "http://localhost:3000/get-user-detail/";
  const userRiddlesAPI = "http://localhost:3000/get-user-riddles/";

  useEffect(() => {
    const req1 = axios.post(userDetailAPI, { id_user: user });
    const req2 = axios.post(userRiddlesAPI, { id_user_author: user });
    axios.all([req1, req2]).then(
      axios.spread((...res) => {
        // console.log(res);
        setUserDetail(res[0].data.values[0]);
        setUserRiddle(res[1].data.values);
        setIsPending(false);
        setError(null);
        if (res[1].data.succcess) {
          setLenRiddles(userRiddle.length);
        }
      })
    );
  });

  // console.log(userDetail);
  // console.log(userRiddle);
  // console.log(lenRiddles);
  return (
    <div className="userProfile">
      {isPending && <div>Loading ....</div>}
      {error && <div>{error}</div>}
      {userDetail && (
        <div className="user-detail">
          <div className="comprofile">
            <img src={userDetail.img_profile} className="comcircular_image" />
            <h1>{userDetail.name}</h1>
            {lenRiddles && <p>{lenRiddles} posts of riddle</p>}
          </div>
        </div>
      )}
      <br />
      <h2>Posts</h2>
      <div className="links">
        <Link to={"/create"}>+ Add</Link>
      </div>
      <br />
      {userRiddle?.map((values) => (
        <div className="horridle-preview" key={values.id_riddle}>
          <Link to={`/get-detail-riddle/${values.id_riddle}`}>
            <h2>{values.title}</h2>
            <br />
            <p className="riddle-body">{values.riddle_text}</p>
            <br />
            <p>
              <i>
                Written by <span>{values.name}</span>
              </i>
            </p>
            <br />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default UserProfile;
