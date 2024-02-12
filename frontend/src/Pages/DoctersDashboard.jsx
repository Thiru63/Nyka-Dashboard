import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react'
import { getDataDocters } from "../Redux/DocterReducer/action";
import { Loading } from "../Components/Loading";
import { DocterCard } from "../Components/DocterCard";
import { putDocter } from "../Redux/DocterReducer/action";

export const DoctersDashboard = () => {

  const [editModal,setEditModal]=useState(false)
  const [stxt,setStxt]=useState("")
  const [searchTxt,setSearchTxt]=useState("")
  const [sortDate,setSortDate]=useState("")
  const [filterSpecial,setFilterSpecial]=useState("")
  const dispatch = useDispatch()
  const state = useSelector(store => store.docterReducer)
  const auth = useSelector(store => store.authReducer)
  console.log(state)
  

  const [formdata, setFormdata] = useState({})
  const handleChange = (e) => {
    let { name, value } = e.target

    if (name == 'experience' || name == 'slots' || name == 'fee') {
      value = Number(value)
    }
    setFormdata({ ...formdata, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setEditModal(false)
    putDocter(dispatch, formdata, auth.token,formdata._id,searchTxt,sortDate,filterSpecial)

  }


  useEffect(()=>{

    if(state.message){
      alert(state.message)
    }
    if(state.error){
      alert(state.error)
    }


  },[state])
  

  

  useEffect(() => {
    getDataDocters(dispatch, auth.token,searchTxt,sortDate,filterSpecial)
  }, [searchTxt,sortDate,filterSpecial])

  // if(!auth.isAuth){
  //   return <Navigate to='/login'/>
  // }

  if (state.loading) {
    return <Loading />
  }

  // if (state.success) {
  //   return <Navigate to='/' />
  // }

 

  return (
    <div style={{ textAlign: "center" }} >
      <h1>Welcome to Masai Hospital Dashboard</h1>
      <div >

        {editModal?(<div>

          <form className="form" onSubmit={handleSubmit}>
        <p className="form-title">Add New Appointment</p>
        <div className="input-container">
          <span>Name</span>
          <input
            type="text"

            placeholder="Enter Docter Name"
            name="name"
            value={formdata.name}
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
            value={formdata.image}
            required
            onChange={handleChange}
          />
        </div>
        <div className="input-container">
          <span>Specialization</span>
          <select name="specialization" value={formdata.specialization} required onChange={handleChange}>
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
            value={formdata.experience}
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
            value={formdata.location}
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
            value={formdata.slots}
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
            value={formdata.fee}
            required
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit">
          Save Appointment
        </button>
        <button onClick={()=>setEditModal(false)} className="submit">
          Cancel
        </button>
      </form>

        </div>):(<div>
          <div>
            <select value={sortDate} onChange={(e)=>setSortDate(e.target.value)}>
              <option value="">Sort By Appointment Date</option>
              <option value="asc">Ascending order</option>
              <option value="desc">Descending order</option>
            </select>
            <div>
              <form onSubmit={(e)=>{e.preventDefault(); setSearchTxt(stxt)}}>
                <input type="text" value={stxt} onChange={(e)=>setStxt(e.target.value)} placeholder="Search by Docter name"/>
                <button type="submit">Search</button>
              </form>
            </div>
            <select value={filterSpecial} onChange={(e)=>setFilterSpecial(e.target.value)}>
            <option value="">Filter By Specialist</option>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Pediatrician">Pediatrician</option>
            <option value="Psychiatrist">Psychiatrist</option>
            </select>
          </div>
          {state.Docters.length>0?state.Docters?.map((docter, i) => {
          return <DocterCard key={docter._id} docter={docter} setEditModal={setEditModal} setFormdata={setFormdata} searchTxt={searchTxt} sortDate={sortDate} filterSpecial={filterSpecial}/>
        }):<h3>No Appointments</h3>}

        </div>)}
        
      </div>
    </div>
  );
};
