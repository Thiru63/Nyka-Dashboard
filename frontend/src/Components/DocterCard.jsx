import { deleteDocter } from "../Redux/DocterReducer/action";
import { useDispatch, useSelector } from "react-redux";

export const DocterCard = ({ docter ,setEditModal,setFormdata,searchTxt,sortDate,filterSpecial}) => {

  setFormdata(docter)
  
  const dispatch = useDispatch()
  const auth = useSelector(store => store.authReducer)
  
  const dateConvert=(date)=>{
    
    

    return date.slice(0,10)
  }

  return (
    <div className="docter_card">

      <div>
        <img src={docter.image} alt={docter.name} />
        <h2 className="docter-name">{docter.name}</h2>
        <p >Specialization : {docter.specialization}</p>
        <p>Experience : {docter.experience}</p>
        <p>Location : {docter.location}</p>
        <p>Date : {dateConvert(docter.date)}</p>
        <p>Slots : {docter.slots}</p>
        <p>Fee : ${docter.fee}</p>
        <button onClick={()=>setEditModal(true)}>EDIT</button>
        <button onClick={()=>deleteDocter(dispatch,auth.token,docter._id,searchTxt,sortDate,filterSpecial)}>DELETE</button>
      </div>
    </div>
  );
};
