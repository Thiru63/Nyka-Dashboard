//   action for get request
import {
  GET_DOCTERS_FAILURE,
  GET_DOCTERS_SUCCESS,
  GET_DOCTERS_REQUEST,
  POST_DOCTER_REQUEST,
  POST_DOCTER_SUCCESS,
  POST_DOCTER_FAILURE,
  PUT_DOCTER_FAILURE,
  PUT_DOCTER_REQUEST,
  PUT_DOCTER_SUCCESS,
  DELETE_DOCTER_FAILURE,
  DELETE_DOCTER_REQUEST,
  DELETE_DOCTER_SUCCESS
} from "./actionTypes";
import axios from "axios";

export const getDocterRequest = () => {
  return { type: GET_DOCTERS_REQUEST }

};

export const getDocterSuccess = (payload) => {
  return { type: GET_DOCTERS_SUCCESS, payload: payload }

};

export const getDocterFailure = () => {
  return { type: GET_DOCTERS_FAILURE }
};

// method to get data from an api
export const getDataDocters = async (dispatch, token,searchByName,sortByDate,filterBySpecialization) => {
  try {
    dispatch(getDocterRequest())

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    let res = await axios.get(`https://masai-hospital-app-9i9a.onrender.com/user/appointments?searchByName=${searchByName}&sortByDate=${sortByDate}&filterBySpecialization=${filterBySpecialization}`)
    console.log(res)
    if (res.status == 200) {
      dispatch(getDocterSuccess(res.data))
    } else {
      dispatch(getDocterFailure(res.data.message))
    }

  } catch (error) {
    console.log(error)
    dispatch(getDocterFailure())
  }
};

//  POST REQUEST

export const postDocterRequest = () => {
  return { type: POST_DOCTER_REQUEST }
}


export const postDocterSuccess = (message) => {
  return { type: POST_DOCTER_SUCCESS, message: message }
};

export const postDocterFailure = (message) => {
  return { type: POST_DOCTER_FAILURE, message }
};

// method for post DOCTER

export const postDocter = async (dispatch, newDocter, token) => {
  try {
    dispatch(postDocterRequest())
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    console.log(newDocter)
    let res = await axios.post(`https://masai-hospital-app-9i9a.onrender.com/user/appointments`, newDocter, config)
    console.log(res)
    if (res.status == 201) {
      dispatch(postDocterSuccess(res.data.message))
      getDataDocters(dispatch, token)


    } else {
      dispatch(postDocterFailure(res.data.message))
    }

  } catch (error) {
    console.log(error)
    dispatch(postDocterFailure())
  }

}


//  PUT REQUEST

export const putDocterRequest = () => {
  return { type: PUT_DOCTER_REQUEST }
}


export const putDocterSuccess = (message) => {
  return { type: PUT_DOCTER_SUCCESS, message: message }
};

export const putDocterFailure = (message) => {
  return { type: PUT_DOCTER_FAILURE, message }
};

// method for post DOCTER

export const putDocter = async (dispatch, newDocter, token,id,searchByName,sortByDate,filterBySpecialization) => {
  try {
    dispatch(putDocterRequest())
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    console.log(newDocter)
    let res = await axios.put(`https://masai-hospital-app-9i9a.onrender.com/user/appointments/${id}`, newDocter, config)
    console.log(res)
    if (res.status == 200) {
      dispatch(putDocterSuccess(res.data.message))
      getDataDocters(dispatch, token,searchByName,sortByDate,filterBySpecialization)


    } else {
      dispatch(putDocterFailure(res.data.message))
    }

  } catch (error) {
    console.log(error)
    dispatch(putDocterFailure())
  }

}

//  DELETE REQUEST

export const deleteDocterRequest = () => {
  return { type: DELETE_DOCTER_REQUEST }
}


export const deleteDocterSuccess = (message) => {
  return { type: DELETE_DOCTER_SUCCESS, message: message }
};

export const deleteDocterFailure = (message) => {
  return { type: DELETE_DOCTER_FAILURE, message }
};

// method for post DOCTER

export const deleteDocter = async (dispatch, token,id,searchByName,sortByDate,filterBySpecialization) => {
  try {
    dispatch(deleteDocterRequest())
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    
    let res = await axios.delete(`https://masai-hospital-app-9i9a.onrender.com/user/appointments/${id}`, config)
    console.log(res)
    if (res.status == 200) {
      dispatch(deleteDocterSuccess(res.data.message))
      getDataDocters(dispatch, token,searchByName,sortByDate,filterBySpecialization)


    } else {
      dispatch(deleteDocterFailure(res.data.message))
    }

  } catch (error) {
    console.log(error)
    dispatch(deleteDocterFailure())
  }

}
