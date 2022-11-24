import { ADD_DETAILS } from "./actionType";

export const addDetails = (data) => {
  return {
    type: ADD_DETAILS,
    payload: data
  };
};
