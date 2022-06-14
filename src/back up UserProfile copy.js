import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const UserProfile = () => {
  // const { user } = useParams();


  // const [user, setUser] = useState(8);
  const user = localStorage.getItem("user id");

  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const [userDetail, setUserDetail] = useState(null);
  const [userRiddle, setUserRiddle] = useState(null);
  // const [riddleComments, setRiddleComments] = useState(null);
  const [lenRiddles, setLenRiddles] = useState(null);
  // const [lenRiddleComments, setLenRiddleComments] = useState(null);

  const userDetailAPI = "http://localhost:3000/get-user-detail/";
  const userRiddlesAPI = "http://localhost:3000/get-user-riddles/";
  // const riddleCommentsAPI = "http://localhost:3000/get-riddle-comments/";

  useEffect(() => {
    const req1 = axios.post(userDetailAPI, { id_user: user });
    const req2 = axios.post(userRiddlesAPI, { id_user_author: user });
    // const req3 = axios.post(riddleCommentsAPI, { id_riddle: userRiddle.id_riddle });
    axios.all([req1, req2]).then(
      axios.spread((...res) => {
        // console.log(res);
        setUserDetail(res[0].data.values[0]);
        setUserRiddle(res[1].data.values);
        // setRiddleComments(res[2].data.values);
        setIsPending(false);
        setError(null);
        if (res[1].data.succcess) {
          setLenRiddles(userRiddle.length);
          // console.log(lenRiddles);
        }
        // if (res[2].data.succcess) {
        //   setLenRiddleComments(riddleComments.length);
        // }
      })
    );
    // axios
    //   .post(riddleCommentsAPI, {
    //     id_riddle: userRiddle.id_riddle,
    //   })
    //   .then(
    //     (res) => {
    //       console.log(res);
    //       setRiddleComments(res[2].data.values);
    //     },
    //     (error) => {
    //       console.log(error);
    //     }
    //   );

    // axios
    //   .post(riddleCommentsAPI, {
    //     id_riddle: userRiddle.id_riddle,
    //   })
    //   .then(res);
    // setRiddleComments(res[2].data.values);
  }, []);

  // console.log(lenRiddleComments);
  // console.log(userDetail);
  // console.log(userRiddle);
  // console.log(lenRiddles);
  return (
    <div className="userProfile">
      {isPending && <div>Loading ....</div>}
      {error && <div>{error}</div>}
      {userDetail && (
        <div className="user-detail">
          <img src={userDetail.img_profile} className="comcircular_image" />
          <h1>{userDetail.name}</h1>
          {lenRiddles && <p>{lenRiddles} posts of riddle</p>}
        </div>
      )}
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
  );
};

export default UserProfile;
