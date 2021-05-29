import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import authSlice from "./slices/authSlice";
import tasksSlice from "./slices/tasksSlice";

const rootReducer = combineReducers({
  tasks: tasksSlice,
  auth: authSlice
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;