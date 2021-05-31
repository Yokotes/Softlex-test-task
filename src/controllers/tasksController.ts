import axios from "axios";
import React from "react";
import { TaskProps } from "../components/Task/Task";
import { addTask, clearTasks, setPage, setSortBy, setSortOrder, setTaskStatus, setTaskText, setTotalTaskCount } from "../models/slices/tasksSlice";
import { AppDispatch, RootState } from "../models/store";
import { clearInputs } from "../shared/formHelper";
import { apiLink, developer } from '../shared/links.json';

// Fetch tasks function
const fetchTasks = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  
  // Get and form tasks display params (sort direction, sort field, page)
  const { tasks } = getState();
  const params = `&sort_field=${tasks.sortBy}&sort_direction=${tasks.sortOrder}&page=${tasks.page}`;

  // Clear all tasks
  dispatch(clearTasks());

  // Receive data from server response
  const {data} = await axios.get(apiLink+developer+params);

  // Check data status
  if (data.status === 'ok') {
    const { tasks, total_task_count } = data.message;

    // Set total tasks count and fill tasks
    dispatch(setTotalTaskCount(total_task_count));
    for (const task in tasks) {
      dispatch(addTask(tasks[task]));
    }
    return;
  }

  // Show error message if status === "error"
  alert("Ошибка при попытке получить список задач!");
  console.error(data.message);
}

// Add new task function
const addNewTask = (form: HTMLFormElement) => async (dispatch: AppDispatch) => {
  
  // Form data from html form
  const formData = new FormData(form);

  // Send new task data and receive data from server response
  const {data} = await axios.post(
    apiLink+'/create'+developer,
    formData
  )

  // Check data status
  if (data.status === 'ok') {

    // Fetch tasks
    dispatch(fetchTasks());
    return;
  }

  // Show error message if status === "error"
  alert("Ошибка при попытке создать задачу!");
  console.error(data.message);
  clearInputs(form);
}

// Set sort field function
const setSortByAndFetchTasks = (e: React.ChangeEvent) => (dispatch: AppDispatch) => {
  
  // Get sort select value
  const select = e.target as HTMLSelectElement;
  const field = parseInt(select.value);
  let fieldName = '';

  // Form field string from value
  switch (field) {
    case 1: 
      fieldName = "username";
      break;
    case 2: 
      fieldName = "email";
      break;
    case 3: 
      fieldName = "status";
      break;
    default:
      fieldName = "id";
      break;
  }

  // Change sort by field and fetch tasks
  dispatch(setSortBy(fieldName));
  dispatch(fetchTasks());
}

// Set sort order function
const setSortOrderAndFetchTasks = (e: React.ChangeEvent) => (dispatch: AppDispatch) => {

  // Get sort select value
  const select = e.target as HTMLSelectElement;
  const orderValue = parseInt(select.value);
  let order = '';

  // Form sort order string from value
  switch (orderValue) {
    case 1: 
      order = "asc";
      break;
    default:
      order = "desc";
      break;
  }

  // Change sort order field and fetch tasks
  dispatch(setSortOrder(order));
  dispatch(fetchTasks());
}

// Set page function
const setPageAndFetchTasks = (page: number) => (dispatch: AppDispatch) => {
  dispatch(setPage(page));
  dispatch(fetchTasks());
}

// Change task status
const changeStatus = (taskId: number, currentStatus: number) => async (dispatch: AppDispatch, getState: () => RootState) => {
  
  // Form new status
  const newStatus = currentStatus >= 10 ? currentStatus - 10 : currentStatus + 10;

  // Get task text
  const {tasks, auth} = getState();
  const {text} = tasks.tasks.filter((task: TaskProps) => task.id === taskId)[0];
  
  // Construct form data
  const formData = new FormData();
  formData.append("text", text);
  formData.append("status", newStatus.toString());
  formData.append("token", auth.profile.token);

  // Send form data to server and receive data from response
  const { data } = await axios.post(
    apiLink+`/edit/${taskId}`+developer,
    formData
  );
  
  // Check status
  if (data.status === 'ok') {

    // Set task status
    dispatch(setTaskStatus({
      id: taskId,
      status: newStatus
    }));
    return;
  }

  // Show error message if status === "error"
  alert("Ошибка при попытке поменять статус!");
  console.error(data.message);
}

// Change text function
const changeText = (form: HTMLFormElement) => async (dispatch: AppDispatch, getState: () => RootState) => {

  // Get text and form new status
  const {taskModal, tasks, auth} = getState();
  const task: TaskProps = tasks.tasks.filter((task: TaskProps) => task.id === taskModal.modal.taskId)[0];
  const newStatus = task.status === 0 || task.status === 10 ? task.status + 1 : task.status;

  // Construct form data
  const fullData = new FormData(form);
  const formData = new FormData();
  formData.append("text", fullData.get("text") as string);
  formData.append("status", newStatus.toString());
  formData.append("token", auth.profile.token);

  // Send form data to server and receive data from response
  const { data } = await axios.post(
    apiLink+`/edit/${taskModal.modal.taskId}`+developer,
    formData
  );
  
  // Check status
  if (data.status === 'ok') {

    // Set task status
    dispatch(setTaskText({
      id: taskModal.modal.taskId,
      text: fullData.get("text")
    }));
    return;
  }

  // Show error message if status === "error"
  alert("Ошибка при попытке поменять текст!");
  console.error(data.message);
}

export {
  fetchTasks,
  addNewTask,
  setSortByAndFetchTasks,
  setSortOrderAndFetchTasks,
  setPageAndFetchTasks,
  changeStatus,
  changeText
}