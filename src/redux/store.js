import { legacy_createStore } from "redux";
import { usersReducer } from "./usersReducer";
export const store = legacy_createStore(usersReducer);

