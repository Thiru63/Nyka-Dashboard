import { Link } from "react-router-dom/dist";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/AuthReducer/action";
import { postDocterFailure } from "../Redux/DocterReducer/action";


export const Navbar = () => {

  const state = useSelector(store => store.authReducer)
  const dispatch = useDispatch()
  console.log(state)

  const logot = () => {
    logout(dispatch)
  }

  return (
    <div className="nav" >
      <Link to='/'>
        <div >
          <h1>+</h1>
          <h2
            style={{
              color: "#FF5722",
              fontFamily: "cursive",
              fontWeight: "800",
              margin: "5px 5px 0 10px",
            }}
          >
            Masai Hospital
          </h2>
        </div>
      </Link>

      <div className="nav-links">
        {(state.isAuth && state.token) ? <>
          <Link to='/addappointment'>
            <button className="button" onClick={() => dispatch(postDocterFailure())}>
              Add Appointment
            </button>
          </Link>
          <button onClick={logot}>Logout</button>
          <h5 >{state.user_data.email}</h5>
        </> : <>
          <Link to='/login'>
            <button className="button">
              Login
            </button>
          </Link>

        </>}



      </div>
    </div>
  );
};
