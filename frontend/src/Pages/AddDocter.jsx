import { useDispatch, useSelector } from "react-redux";
import { postDocter } from "../Redux/DocterReducer/action";
import { useState,useEffect } from 'react'
import { Navigate } from "react-router-dom";
import { Loading } from "../Components/Loading";



export const AddDocter = () => {

  const dispatch = useDispatch()
  const auth = useSelector(store => store.authReducer)
  const docter = useSelector(store => store.docterReducer)

  const [formdata, setFormdata] = useState({

    name: "",
    image: "",
    specialization: "",
    experience: "",
    location: "",
    slots: "",
    fee: ""

  })

  const handleChange = (e) => {
    let { name, value } = e.target

    if (name == 'experience' || name == 'slots' || name == 'fee') {
      value = Number(value)
    }
    setFormdata({ ...formdata, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    postDocter(dispatch, formdata, auth.token)

  }
  useEffect(()=>{

    if(docter.message){
      alert(docter.message)
    }
    if(docter.error){
      alert(docter.error)
    }


  },[docter])


  if (docter.success) {
    return <Navigate to='/' />
  }

  if (docter.loading) {
    return <Loading />
  }

  return (
    <div >
      <form className="form" onSubmit={handleSubmit}>
        <p className="form-title">Add New Appointment</p>
        <div className="input-container">
          <span>Name</span>
          <input
            type="text"

            placeholder="Enter Docter Name"
            name="name"
            required
            onChange={handleChange}
          />
        </div>
        <div className="input-container">
          <span>Docter image url</span>
          <input
            type="url"

            placeholder="Docter image url"
            name="image"
            required
            onChange={handleChange}
          />
        </div>
        <div className="input-container">
          <span>Specialization</span>
          <select name="specialization"required onChange={handleChange}>
            <option value="">Select Docter Specialization</option>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Pediatrician">Pediatrician</option>
            <option value="Psychiatrist">Psychiatrist</option>
          </select>

        </div>
        <div className="input-container">
          <span>Experience</span>
          <input
            type="number"

            placeholder="Enter Docter Experience in no of years"
            name="experience"
            required
            onChange={handleChange}
          />
        </div>
        <div className="input-container">
          <span style={{ color: "black" }}>Location</span>
          <input
            type="text"

            placeholder="Enter Location"
            name="location"
            required
            onChange={handleChange}
          />
        </div>
        <div className="input-container">
          <span>Slots per Day</span>
          <input
            type="number"

            placeholder="Enter Slots per day"
            name="slots"
            required
            onChange={handleChange}
          />
        </div>
        <div className="input-container">
          <span>Docter Fee</span>
          <input
            type="number"

            placeholder="Enter Docter Fee in $"
            name="fee"
            required
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit">
          Add Appointment
        </button>
      </form>
    </div>
  );
};
