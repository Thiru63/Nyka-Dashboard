import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
} from "./actionTypes";

// Initial State
const initialState = {
  token: "",
  isAuth: false,
  loading: false,
  user_data: null,
  error: null,
  success: false,
  message: ""
};

// Reducer
export const authReducer = (state = initialState, { type, payload, message }) => {

  switch (type) {
    case SIGNUP_REQUEST:
      return { ...state, loading: true,token:null,isAuth:false,user_data:null,error:null,success:false,message:"" }
      break;
    case SIGNUP_SUCCESS:
      return { ...state, loading: false, token:null,isAuth:false,user_data:null,error:null,success:true,message:message}
      break;
    case SIGNUP_FAILURE:
      return { ...state, loading: false, token:null,isAuth:false,user_data:null,error:error,success:false,message:"" }
      break;
    case LOGIN_REQUEST:
      return { ...state, loading: true,token:null,isAuth:false,user_data:null,error:null,success:false,message:"" }
      break;
    case LOGIN_SUCCESS:
      return { ...state, loading: false, token: payload.token,message:payload.message, success: true, isAuth: true, error: null, user_data: payload.user }
      break;
    case LOGIN_FAILURE:
      return { ...state, loading: false, token:null,isAuth:false,user_data:null,error:message,success:false,message:""}
      break;
    case LOGOUT:
      return { ...state, loading: false, token:null,isAuth:false,user_data:null,error:null,success:false,message:message }
      break;

    default:
      return state
      break;
  }

};
