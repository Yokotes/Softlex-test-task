import axios from "axios";
import { setToken, setUsername } from "../models/slices/authSlice";
import { AppDispatch } from "../models/store";
import { clearInputs } from "../shared/formHelper";
import { apiLink, developer  } from '../shared/links.json';

// Login function
const login = (e: React.FormEvent) => async (dispatch: AppDispatch) => {
  e.preventDefault();

  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);

  // Send request to the server and receive response data 
  const {data} = await axios.post(
    apiLink+"/login"+developer,
    formData
  );

  // Check response status
  if (data.status !== "ok") {
    console.error(data.message);
    alert("Ошибка авторизации!");
    return;
  }

  // Set token and username
  dispatch(setToken(data.message.token));
  dispatch(setUsername("admin"));

  // Save token to the cookies for 24 hours and clear form inputs
  window.location.href = "/";
  document.cookie = `token=${data.message.token}; max-age=${60*60*24}; secure`
  clearInputs(form);
}

// Try auth function (call when Auth component is rendered)
const tryAuth = () => (dispatch: AppDispatch) => {

  // Get token from cookies
  const token = getCookie("token");
  
  // If token exist then set token and username
  if (token) {
    dispatch(setToken(token));
    dispatch(setUsername("admin"));
  }
}

// Sign out function
const signOut = () => (dispatch: AppDispatch) => {

  // Clear token from cookies
  document.cookie = `token= ; max-age=${60*60*24}; secure`;

  // Clear token and username
  dispatch(setToken(""));
  dispatch(setUsername(""));
}

export {
  login,
  tryAuth,
  signOut
}

function getCookie(name: string) {
  let matches = document.cookie.match(new RegExp(
    // eslint-disable-next-line no-useless-escape
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}