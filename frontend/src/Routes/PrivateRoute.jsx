
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom/dist";

export const PrivateRoute = ({ children }) => {
  const state = useSelector(store => store.authReducer)

  if (state.isAuth && state.token) {
    return children
  } else {
    return <Navigate to='/login' />
  }

};
