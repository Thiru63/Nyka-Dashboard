const mongoose=require('mongoose')

const Schema=mongoose.Schema

const productSchema=mongoose.Schema({
    
    userId:{
      type:Schema.Types.ObjectId,
      required:true,
      ref:'user'
      
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

const Product=mongoose.model('product',productSchema)

module.exports=Product