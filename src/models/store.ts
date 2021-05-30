import { AnyAction, applyMiddleware, combineReducers, createStore } from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import authSlice from "./slices/authSlice";
import taskModalSlice from "./slices/taskModalSlice";
import tasksSlice from "./slices/tasksSlice";

const rootReducer = combineReducers({
  tasks: tasksSlice,
  auth: authSlice,
  taskModal: taskModalSlice
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, void, AnyAction>;