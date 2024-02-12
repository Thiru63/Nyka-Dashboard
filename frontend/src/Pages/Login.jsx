import React, { useState, useEffect } from "react";
// import "./login.css";
import { login, signup } from "../Redux/AuthReducer/action";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom/dist";
import { Loading } from "../Components/Loading";

export const Login = () => {

  const [loginst, setLogin] = useState(true)

  const dispatch = useDispatch()
  const state = useSelector(store => store.authReducer)

  const [formdata, setFormdata] = useState({})
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormdata({ ...formdata, [name]: value })
  }

  const handleSubmitLogin = (e) => {
    e.preventDefault()
    login(dispatch, formdata)
  }

  const handleSubmitSignUp = (e) => {
    e.preventDefault()
    signup(dispatch, formdata)
  }

  useEffect(() => {
    console.log(state)
    if (state.success) {
      setLogin(true)
    }
    if(state.message){
      alert(state.message)
    }
    if(state.error){
      alert(state.error)
    }

  }, [state])

  if (state.isAuth && state.token) {
    return <Navigate to='/' />
  }

  if (state.loading) {
    return <Loading />
  }

  return (
    <div>
      {loginst ? (<div >
        <div className="card">
          <h4 className="title">Login Form</h4>
          <div className="field">

            <button


              className="input-field"

              onClick={(e) => setLogin(true)}
            >Login</button>
            <button


              className="input-field"

              onClick={(e) => setLogin(false)}
            >Signup</button>
          </div>
          <form onSubmit={handleSubmitLogin}>
            <div className="field">

              <input

                placeholder="Email"
                className="input-field"
                type="email"
                name="email"
                required
                onChange={handleChange}
              />
            </div>
            <div className="field">

              <input

                placeholder="Password"
                className="input-field"
                name="password"
                type="password"
                required
                onChange={handleChange}
              />
            </div>
            <p>Forgot password?</p>
            <button className="btn" type="submit">
              Login
            </button>
            <p>Not a member? <span onClick={(e) => setLogin(false)}>Signup now</span></p>
          </form>
        </div>
      </div>) :
        (<div >
          <div className="card">
            <h4 className="title">Signup Form</h4>
            <div className="field">

              <button


                className="input-field"

                onClick={(e) => setLogin(true)}
              >Login</button>
              <button


                className="input-field"

                onClick={(e) => setLogin(false)}
              >Signup</button>
            </div>
            <form onSubmit={handleSubmitSignUp}>
              <div className="field">

                <input

                  placeholder="Email"
                  className="input-field"
                  type="email"
                  name="email"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="field">

                <input

                  placeholder="Password"
                  className="input-field"
                  type="password"
                  name="password"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="field">

                <input

                  placeholder="Confirm password"
                  className="input-field"
                  type="password"
                  name="confirm_password"
                  required
                  onChange={handleChange}
                />
              </div>
              <button className="btn" type="submit">
                Signup
              </button>
            </form>
          </div>
        </div>)}
    </div>
  );
};
