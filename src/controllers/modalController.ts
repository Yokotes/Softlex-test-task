import React from "react";
import { TaskProps } from "../components/Task/Task";
import { setDefaultEmail, setDefaultText, setDefaultUser, setEditMode, setIsShow, setTaskId } from "../models/slices/taskModalSlice";
import { AppDispatch, RootState } from "../models/store";

const showTaskModal = () => (dispatch: AppDispatch) => {
  dispatch(setIsShow(true));
  dispatch(setEditMode(false));
}

const showTaskModalInEdit = (taskId: number) => (dispatch: AppDispatch, getState: () => RootState) => {
  const {tasks} = getState();
  const task: TaskProps = tasks.tasks.filter((task: TaskProps) => task.id === taskId)[0];

  dispatch(setDefaultUser(task.username));
  dispatch(setDefaultEmail(task.email));
  dispatch(setDefaultText(task.text));
  
  dispatch(setTaskId(taskId));
  dispatch(setEditMode(true));
  dispatch(setIsShow(true));
}

const hideTaskModal = (e: React.MouseEvent) => (dispatch: AppDispatch) => {
  dispatch(setDefaultUser(""));
  dispatch(setDefaultEmail(""));
  dispatch(setDefaultText(""));
  dispatch(setIsShow(false));
}

export {
  showTaskModal,
  showTaskModalInEdit,
  hideTaskModal
}