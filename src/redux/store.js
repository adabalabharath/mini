import { applyMiddleware, legacy_createStore } from "redux";
import { usersReducer } from "./usersReducer";
import { thunk } from "redux-thunk";

export const store = legacy_createStore(usersReducer,applyMiddleware(thunk));

