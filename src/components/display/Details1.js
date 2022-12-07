import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Details1 = () => {
  const navigate = useNavigate();
  const data = useSelector((state) => state.form1);

  return (
    <>
      <h1>Details 1</h1>
      <p>{data.fName}</p>
      <p>{data.lName}</p>
      <p>{data.age}</p>
      <p>{data.dob}</p>

      <button type="button" onClick={() => navigate("/grid-data")}>
        Go to Grid
      </button>
      <button type="button" onClick={() => navigate("/update-data")}>
        Go to Grid Update
      </button>
    </>
  );
};

export default Details1;
