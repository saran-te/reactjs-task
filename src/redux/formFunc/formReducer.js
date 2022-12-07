import { ADD_DETAILS } from "./actionType";

// export const initialState = {
//   fName: "",
//   lName: "",
//   age: "",
//   dob: ""
// };

// export const formReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case ADD_DETAILS:
//       console.log("inside reducer");
//       // console.log(action.payload);
//       return {
//         // ...action.payload
//         ...state.form1,
//         ...action.payload
//       };

//     default:
//       return state;
//   }
// };

export const initialState = {
  data: [],
};

export const formReducer = (state = initialState.data, action) => {
  switch (action.type) {
    case ADD_DETAILS:
      console.log("inside reducer");
      console.log(action.payload);

      let res = [...state];
      res.push(action.payload);
      console.log(res);
      return res;

    default:
      return state;
  }
};
