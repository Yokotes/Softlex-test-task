import axios from "axios";
import React from "react";
import { TaskProps } from "../components/Task/Task";
import { addTask, clearTasks, setPage, setSortBy, setSortOrder, setTaskStatus, setTaskText, setTotalTaskCount } from "../models/slices/tasksSlice";
import { AppDispatch, RootState } from "../models/store";
import { clearInputs } from "../shared/formHelper";
import { apiLink, developer } from '../shared/links.json';

const fetchTasks = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  const { tasks } = getState();
  const params = `&sort_field=${tasks.sortBy}&sort_direction=${tasks.sortOrder}&page=${tasks.page}`;

  dispatch(clearTasks());

  const {data} = await axios.get(apiLink+developer+params);

  if (data.status === 'ok') {
    const { tasks, total_task_count } = data.message;

    dispatch(setTotalTaskCount(total_task_count));
    for (const task in tasks) {
      dispatch(addTask(tasks[task]));
    }
    return;
  }

  alert("Ошибка при попытке получить список задач!");
  console.error(data.message);
}

const addNewTask = (form: HTMLFormElement) => async (dispatch: AppDispatch) => {
  const formData = new FormData(form);

  const {data} = await axios.post(
    apiLink+'/create'+developer,
    formData
  )

  if (data.status === 'ok') {
    dispatch(fetchTasks());
    return;
  }

  alert("Ошибка при попытке создать задачу!");
  console.error(data.message);
  clearInputs(form);
}

const setSortByAndFetchTasks = (e: React.ChangeEvent) => (dispatch: AppDispatch) => {
  const select = e.target as HTMLSelectElement;
  const field = parseInt(select.value);
  let fieldName = '';

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

  dispatch(setSortBy(fieldName));
  dispatch(fetchTasks());
}

const setSortOrderAndFetchTasks = (e: React.ChangeEvent) => (dispatch: AppDispatch) => {
  const select = e.target as HTMLSelectElement;
  const orderValue = parseInt(select.value);
  let order = '';

  switch (orderValue) {
    case 1: 
      order = "asc";
      break;
    default:
      order = "desc";
      break;
  }

  dispatch(setSortOrder(order));
  dispatch(fetchTasks());
}

const setPageAndFetchTasks = (page: number) => (dispatch: AppDispatch) => {
  dispatch(setPage(page));
  dispatch(fetchTasks());
}

const changeStatus = (taskId: number, currentStatus: number) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const newStatus = currentStatus >= 10 ? currentStatus - 10 : currentStatus + 10;
  const {tasks, auth} = getState();
  const {text} = tasks.tasks.filter((task: TaskProps) => task.id === taskId)[0];
  
  const formData = new FormData();
  formData.append("text", text);
  formData.append("status", newStatus.toString());
  formData.append("token", auth.profile.token);

  const { data } = await axios.post(
    apiLink+`/edit/${taskId}`+developer,
    formData
  );
  
  if (data.status === 'ok') {
    dispatch(setTaskStatus({
      id: taskId,
      status: newStatus
    }));
    return;
  }

  alert("Ошибка при попытке поменять статус!");
  console.error(data.message);
}

const changeText = (form: HTMLFormElement) => async (dispatch: AppDispatch, getState: () => RootState) => {
  const {taskModal, tasks, auth} = getState();
  const task: TaskProps = tasks.tasks.filter((task: TaskProps) => task.id === taskModal.modal.taskId)[0];
  const newStatus = task.status === 0 || task.status === 10 ? task.status + 1 : task.status;

  const fullData = new FormData(form);
  const formData = new FormData();
  formData.append("text", fullData.get("text") as string);
  formData.append("status", newStatus.toString());
  formData.append("token", auth.profile.token);

  const { data } = await axios.post(
    apiLink+`/edit/${taskModal.modal.taskId}`+developer,
    formData
  );
  
  if (data.status === 'ok') {
    dispatch(setTaskText({
      id: taskModal.modal.taskId,
      text: fullData.get("text")
    }));
    return;
  }

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