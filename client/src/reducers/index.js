import { combineReducers } from "redux";
import data from "./data";
import loading from "./loading";
import form from "./form";

const reducer = combineReducers({
  data,
  loading,
  form
});

export default reducer;
