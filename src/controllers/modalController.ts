import React from "react";
import { TaskProps } from "../components/Task/Task";
import { setDefaultEmail, setDefaultText, setDefaultUser, setEditMode, setIsShow, setTaskId } from "../models/slices/taskModalSlice";
import { AppDispatch, RootState } from "../models/store";

// Show task modal function
const showTaskModal = () => (dispatch: AppDispatch) => {
  dispatch(setIsShow(true));
  dispatch(setEditMode(false));
}

// Show task modal in edit mode
const showTaskModalInEdit = (taskId: number) => (dispatch: AppDispatch, getState: () => RootState) => {
  
  // Get task with the same taskId
  const {tasks} = getState();
  const task: TaskProps = tasks.tasks.filter((task: TaskProps) => task.id === taskId)[0];

  // Set form default values for inputs
  dispatch(setDefaultUser(task.username));
  dispatch(setDefaultEmail(task.email));
  dispatch(setDefaultText(task.text));
  
  // Show task and turn on edit mode
  dispatch(setTaskId(taskId));
  dispatch(setEditMode(true));
  dispatch(setIsShow(true));
}

// Hide task modal function
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