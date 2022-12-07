import React, { useState } from "react";
import { initialState } from "../redux/formFunc/formReducer";
import { useDispatch } from "react-redux";
import { addDetails } from "../redux/formFunc/formActions";
import store from "../redux/store";

const FormFunctionalComponent = () => {
  const [data, setData] = useState({});
  const dispatch = useDispatch();

  const fNameHandler = (e) => {
    setData({ ...data, fName: e.target.value });
  };

  const lNameHandler = (e) => {
    setData({ ...data, lName: e.target.value });
  };

  const ageHandler = (e) => {
    setData({ ...data, age: e.target.value });
  };

  const dobHandler = (e) => {
    setData({ ...data, dob: e.target.value });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    console.log(data);
    dispatch(addDetails(data));
    console.log("updated state: ");
    console.log(store.getState());
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <h1>Functional component</h1>
      <input type="text" placeholder="First Name" onChange={fNameHandler} />
      <input type="text" placeholder="Last Name" onChange={lNameHandler} />
      <input type="number" placeholder="Age" onChange={ageHandler} />
      <input type="date" placeholder="DOB" onChange={dobHandler} />

      <button type="submit">Add</button>
    </form>
  );
};

export default FormFunctionalComponent;
