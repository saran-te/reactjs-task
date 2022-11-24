import { ADD_DETAILS2 } from "./actionType";

export const initialState = {
  mob: "",
  email: "",
  city: ""
};

export const form2Reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DETAILS2:
      console.log("inside reducer");
      // console.log(action.payload);
      return {
        // ...action.payload
        ...state.form2,
        ...action.payload
      };

    default:
      return state;
  }
};
