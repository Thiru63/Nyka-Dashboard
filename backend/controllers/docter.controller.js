
const Docter=require('../models/product.model.js')

// create Docter

const createDocter=async (req,res)=>{

    
    try {
        let {name,image,specialization,experience,location,slots,fee}=req.body
     
    
        
        if(!name||!image||!specialization||!experience||!location||!slots||!fee){
            return res.status(400).send({
                message:"Please Fill All Fields"
            })
        }

    await Docter.create({
        userId:req.user._id,
        name,
        image,
        specialization,
        experience,
        location,
        slots,
        fee,
    })

    return res.status(201).send({
        message:'Docter data is created successfully'
    })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message:"Something error occured so please try again later"
        })
    }

}

// retrieve Docter
const getAllDocter=async (req,res)=>{

    try {
        let {searchByName,sortByDate,filterBySpecialization}=req.query
        if(sortByDate){
            if(sortByDate=='asc'){
                sortByDate=1
            }else if(sortByDate=='desc'){
                sortByDate=-1
            }
            
        }
    
   if(searchByName&&sortByDate&&filterBySpecialization){
    let Docters=await Docter.find({name:{$regex:searchByName},specialization:filterBySpecialization}).sort({date:sortByDate})
    if(Docters.length>0){
        return res.status(200).json(Docters)
    }else{
        return res.status(404).send({
            message:'No Docters data'
        })
    }
   }else if(searchByName&&sortByDate){
    let Docters=await Docter.find({name:{$regex:searchByName}}).sort({date:sortByDate})
    if(Docters.length>0){
        return res.status(200).json(Docters)
    }else{
        return res.status(404).send({
            message:'No Docters data'
        })
    }
   }
   else if(sortByDate&&filterBySpecialization){
    let Docters=await Docter.find({specialization:filterBySpecialization}).sort({date:sortByDate})
    if(Docters.length>0){
        return res.status(200).json(Docters)
    }else{
        return res.status(404).send({
            message:'No Docters data'
        })
    }
   }
   else if(searchByName&&filterBySpecialization){
    let Docters=await Docter.find({name:{$regex:searchByName},specialization:filterBySpecialization})
    if(Docters.length>0){
        return res.status(200).json(Docters)
    }else{
        return res.status(404).send({
            message:'No Docters data'
        })
    }

   }else if(searchByName){
    let Docters=await Docter.find({name:{$regex:searchByName}})
    if(Docters.length>0){
        return res.status(200).json(Docters)
    }else{
        return res.status(404).send({
            message:'No Docters data'
        })
    }
   }else if(sortByDate){
    let Docters=await Docter.find({}).sort({date:sortByDate})
    if(Docters.length>0){
        return res.status(200).json(Docters)
    }else{
        return res.status(404).send({
            message:'No Docters data'
        })
    }
   }else if(filterBySpecialization){
    let Docters=await Docter.find({specialization:filterBySpecialization})
    if(Docters.length>0){
        return res.status(200).json(Docters)
    }else{
        return res.status(404).send({
            message:'No Docters data'
        })
    }
   }else{
    let Docters=await Docter.find()
    if(Docters.length>0){
        return res.status(200).json(Docters)
    }else{
        return res.status(404).send({
            message:'No Docters data'
        })
    }

   }
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message:"Something error occured so please try again later"
        })
    }
    



    

}

// update Docter
const updateDocter=async (req,res)=>{

    try {
        let {docterId}=req.params
    let {name,image,specialization,experience,location,slots,fee}=req.body
    
    if(!name&&!image&&!specialization&&!experience&&!location&&!slots&&!fee){
        return res.status(400).send({
            message:"Please add new data"
        })
    }

    if(!docterId){
        return res.status(400).send({
            message:'Invalid request'
        })
    }

    let DocterData=await Docter.findOne({userId:req.user._id,_id:docterId})
    if(!DocterData){
        return res.status(404).send({
            message:'No Docter data'
        })
    }

    await Docter.findOneAndUpdate({userId:req.user._id,_id:docterId},{
        name,
        image,
        specialization,
        experience,
        location,
        date:Date.now(),
        slots,
        fee,
    })

    return res.status(200).send({
        message:'Docter data is updated successfully'
    })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message:"Something error occured so please try again later"
        })
    }


}

// delete Docter
const deleteDocter=async (req,res)=>{

    try {
        let {docterId}=req.params
    
    if(!docterId){
        return res.status(400).send({
            message:'Invalid request'
        })
    }

    let DocterData=await Docter.findOne({userId:req.user._id,_id:docterId})
    if(!DocterData){
        return res.status(404).send({
            message:'No Docter data'
        })
    }

    await Docter.deleteOne({userId:req.user._id,_id:docterId})

    return res.status(200).send({
        message:'Docter data is deleted successfully'
    })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message:"Something error occured so please try again later"
        })
    }


}

module.exports={
    createDocter,
    getAllDocter,
    updateDocter,
    deleteDocter
}