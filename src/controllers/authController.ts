import axios from "axios";
import { setToken, setUsername } from "../models/slices/authSlice";
import { AppDispatch } from "../models/store";
import { apiLink, developer  } from '../shared/links.json';

const login = (e: React.FormEvent) => async (dispatch: AppDispatch) => {
  e.preventDefault();

  const form = e.target as HTMLFormElement;
  const data = new FormData(form);

  const response = await axios.post(
    apiLink+"/login/"+developer,
    data
  );

  const responseData = response.data;

  if (responseData.status !== "ok") {
    console.error(responseData.message);
    alert("Ошибка авторизации!");
    return;
  }

  dispatch(setToken(responseData.message.token));
  dispatch(setUsername("admin"));

  window.location.href = "/";
  console.log(responseData.message.token)
  document.cookie = `token=${responseData.message.token}; max-age=${60*60*24}; secure`
  clearInputs(form);
}

const tryAuth = () => (dispatch: AppDispatch) => {
  const token = getCookie("token");
  
  if (token) {
    dispatch(setToken(token));
    dispatch(setUsername("admin"));
  }
}

export {
  login,
  tryAuth
}

const clearInputs = (form: HTMLFormElement) => {
  const inputs = form.querySelectorAll("input");

  inputs.forEach(input => input.value = "");
}

function getCookie(name: string) {
  let matches = document.cookie.match(new RegExp(
    // eslint-disable-next-line no-useless-escape
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}