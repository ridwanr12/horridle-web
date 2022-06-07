import RiddleList from "./RiddleList";
import useFetch from "./useFetch";

const Home = () => {
  const {error, isPending, data: values,} = useFetch("http://localhost:3000/get-all-riddle");
  // console.log("test home");
  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {values && <RiddleList values={values} />}
    </div>
  );
};

export default Home;
