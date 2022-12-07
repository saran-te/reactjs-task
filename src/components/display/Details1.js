import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Details1 = () => {
  const navigate = useNavigate();
  const datas = useSelector((state) => state.form1);

  let displayData = datas.map((data) => {
    return (
      <div>
        <p>{data.fName}</p>
        <p>{data.lName}</p>
        <p>{data.age}</p>
        <p>{data.dob}</p>
      </div>
    );
  });

  return (
    <>
      <h1>Details 1</h1>

      {displayData}

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
