import { createStore } from "redux";
import { combineReducers, applyMiddleware } from "redux";
import { formReducer } from "./formFunc/formReducer";
import { form2Reducer } from "./formClass/form2Reducer";
import { userReducer } from "./usersData/userReducer";
import thunk from "redux-thunk";
import logger from "redux-logger";

const rootReducer = combineReducers({
  form1: formReducer,
  form2: form2Reducer,
  user: userReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk, logger));
console.log(store.getState());
export default store;
