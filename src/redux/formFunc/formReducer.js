import { ADD_DETAILS } from "./actionType";

export const initialState = {
  fName: "",
  lName: "",
  age: "",
  dob: ""
};

export const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DETAILS:
      console.log("inside reducer");
      // console.log(action.payload);
      return {
        // ...action.payload
        ...state.form1,
        ...action.payload
      };

    default:
      return state;
  }
};
