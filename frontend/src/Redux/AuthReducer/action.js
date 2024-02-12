import axios from "axios";
import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
} from "./actionTypes";


const signupReq = () => {
  return { type: SIGNUP_REQUEST }
}

const signupSuc = (message) => {
  return { type: SIGNUP_SUCCESS, message: message }
}

const signupFai = (message) => {
  return { type: SIGNUP_FAILURE, message: message }
}

const loginReq = () => {
  return { type: LOGIN_REQUEST }
}

const loginSuc = (payload) => {
  return { type: LOGIN_SUCCESS, payload: payload }
}

const loginFai = (message) => {
  return { type: LOGIN_FAILURE, message: message }
}

const logoutSuc = (message) => {
  return { type: LOGOUT,message:message }
}


export const signup = async (dispatch, payload) => {
  try {
    dispatch(signupReq())
    console.log(payload)
    let res = await axios.post('https://masai-hospital-app-9i9a.onrender.com/user/signup', payload)
    console.log(res)
    if (res.status == 201) {
      dispatch(signupSuc(res.data.message))
    } else {
      dispatch(signupFai(res.data.message))
    }
  } catch (error) {
    console.log(error)
    dispatch(signupFai("error occurred"))
  }
};

export const login = async (dispatch, payload) => {
  try {
    dispatch(loginReq())
    console.log(payload)
    let res = await axios.post('https://masai-hospital-app-9i9a.onrender.com/user/login', payload)
    console.log(res)
    if (res.status == 201) {
      dispatch(loginSuc(res.data))
    } else {
      dispatch(loginFai(res.data.message))
    }

  } catch (error) {
    console.log(error)
    dispatch(loginFai("error occurred"))
  }
};

export const logout = (dispatch) => {
  dispatch(logoutSuc("Logout Successfull"))
};
