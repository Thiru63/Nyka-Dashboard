
const Product=require('../models/product.model.js')
const {v1 }=require('uuid')

// create Product

const createProduct=async (req,res)=>{

    
    try {
        let {name,picture,description,gender,category,price}=req.body
     
    
        
        if(!name||!picture||!description||!gender||!category||!price){
            return res.status(400).send({
                message:"Please Fill All Fields"
            })
        }

        if(!name.toString().length<=50){
            return res.status(400).send({
                message:"name should be 50 characters long"
            })  
        }
       gender=gender.toLowerCase()
       category=category.toLowerCase()
        let genderEnum=["male", "female"]
        let categoryEnum=["makeup", "skincare","haircare"]
        if(genderEnum.includes(gender)){
            return res.status(400).send({
                message:"gender should be not any other than given option"
            })
        }

        if(categoryEnum.includes(category)){
            return res.status(400).send({
                message:"category should be not any other than given option"
            })
        }

        let product_id=`user${v1().replaceAll("-","")}`;

    await Product.create({
        userId:req.user._id,
        id:product_id,
        name,
        picture,
        description,
        gender,
        category,
        price
       
    })

    return res.status(201).send({
        message:'Product data is created successfully'
    })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message:"Something error occured so please try again later"
        })
    }

}

// retrieve Product
const getAllProduct=async (req,res)=>{

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
    let Products=await Product.find({name:{$regex:searchByName},specialization:filterBySpecialization}).sort({date:sortByDate})
    if(Products.length>0){
        return res.status(200).json(Products)
    }else{
        return res.status(404).send({
            message:'No Products data'
        })
    }
   }else if(searchByName&&sortByDate){
    let Products=await Product.find({name:{$regex:searchByName}}).sort({date:sortByDate})
    if(Products.length>0){
        return res.status(200).json(Products)
    }else{
        return res.status(404).send({
            message:'No Products data'
        })
    }
   }
   else if(sortByDate&&filterBySpecialization){
    let Products=await Product.find({specialization:filterBySpecialization}).sort({date:sortByDate})
    if(Products.length>0){
        return res.status(200).json(Products)
    }else{
        return res.status(404).send({
            message:'No Products data'
        })
    }
   }
   else if(searchByName&&filterBySpecialization){
    let Products=await Product.find({name:{$regex:searchByName},specialization:filterBySpecialization})
    if(Products.length>0){
        return res.status(200).json(Products)
    }else{
        return res.status(404).send({
            message:'No Products data'
        })
    }

   }else if(searchByName){
    let Products=await Product.find({name:{$regex:searchByName}})
    if(Products.length>0){
        return res.status(200).json(Products)
    }else{
        return res.status(404).send({
            message:'No Products data'
        })
    }
   }else if(sortByDate){
    let Products=await Product.find({}).sort({date:sortByDate})
    if(Products.length>0){
        return res.status(200).json(Products)
    }else{
        return res.status(404).send({
            message:'No Products data'
        })
    }
   }else if(filterBySpecialization){
    let Products=await Product.find({specialization:filterBySpecialization})
    if(Products.length>0){
        return res.status(200).json(Products)
    }else{
        return res.status(404).send({
            message:'No Products data'
        })
    }
   }else{
    let Products=await Product.find()
    if(Products.length>0){
        return res.status(200).json(Products)
    }else{
        return res.status(404).send({
            message:'No Products data'
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

// update Product
const updateProduct=async (req,res)=>{

    try {
        let {ProductId}=req.params
    let {name,image,specialization,experience,location,slots,fee}=req.body
    
    if(!name&&!image&&!specialization&&!experience&&!location&&!slots&&!fee){
        return res.status(400).send({
            message:"Please add new data"
        })
    }

    if(!ProductId){
        return res.status(400).send({
            message:'Invalid request'
        })
    }

    let ProductData=await Product.findOne({userId:req.user._id,_id:ProductId})
    if(!ProductData){
        return res.status(404).send({
            message:'No Product data'
        })
    }

    await Product.findOneAndUpdate({userId:req.user._id,_id:ProductId},{
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
        message:'Product data is updated successfully'
    })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message:"Something error occured so please try again later"
        })
    }


}

// delete Product
const deleteProduct=async (req,res)=>{

    try {
        let {ProductId}=req.params
    
    if(!ProductId){
        return res.status(400).send({
            message:'Invalid request'
        })
    }

    let ProductData=await Product.findOne({userId:req.user._id,_id:ProductId})
    if(!ProductData){
        return res.status(404).send({
            message:'No Product data'
        })
    }

    await Product.deleteOne({userId:req.user._id,_id:ProductId})

    return res.status(200).send({
        message:'Product data is deleted successfully'
    })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message:"Something error occured so please try again later"
        })
    }


}

module.exports={
    createProduct,
    getAllProduct,
    updateProduct,
    deleteProduct
}