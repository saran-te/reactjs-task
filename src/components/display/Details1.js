import { useSelector } from "react-redux";

const Details1 = () => {
  const data = useSelector((state) => state.form1);

  return (
    <>
      <h1>Details 1</h1>
      <p>{data.fName}</p>
      <p>{data.lName}</p>
      <p>{data.age}</p>
      <p>{data.dob}</p>
    </>
  );
};

export default Details1;
