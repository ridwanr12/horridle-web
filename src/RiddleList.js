import { Link } from "react-router-dom";

const RiddleList = ({ values }) => {
  return (
    <div className="values-list">
      {values?.map((values) => (
        <div className="horridle-preview" key={values.id_riddle}>
          <Link to={`/get-detail-riddle/${values.id_riddle}`}>
            <h2>{values.title}</h2>
            <br />
            <p className="riddle-body">{values.riddle_text}</p>
            <br />
            <p>
              <i>
                Written by <span>{values.id_user_author}</span>
              </i>
            </p>
          </Link>
        </div>
      ))}
      <div className="plus-create">
        <Link to="/create" className="plus-create">
          +
        </Link>
      </div>
    </div>
  );
};

export default RiddleList;