const mongoose=require('mongoose')

const Schema=mongoose.Schema

const docterSchema=mongoose.Schema({
    
    userId:{
      type:Schema.Types.ObjectId,
      required:true,
      
    },
    id:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true,
        maxLength: 50,
       
    },
    picture:{
        type:String,
        required:true,
    },
    description :{
        type:String,
        required:true, 
    },
    gender:{
        type:String,
        enum:["male", "female"],
        required:true,
    },
    category:{
        type:String,
        enum:["makeup", "skincare","haircare"],
        required:true,
    },
    price:{
        type:Number,
        required:true,
    }
    
},
{
    timestamps: true 
})

const Docter=mongoose.model('docter',docterSchema)

module.exports=Docter