import Navbar from "./Navbar";
import Home from "./Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Create from "./Create";
import EditRiddle from "./EditRiddle";
import RiddleDetails from "./RiddleDetails";
import NotFound from "./NotFound";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import UserProfile from "./UserProfile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/sign-up">
              <SignUp />
            </Route>
            <Route path="/sign-in">
              <SignIn />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/edit/:id_riddle">
              <EditRiddle />
            </Route>
            <Route path="/user-profile">
              <UserProfile />
            </Route>
            <Route path="/get-detail-riddle/:id_riddle">
              <RiddleDetails />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
      <ToastContainer />
    </Router>
  );
}

export default App;
