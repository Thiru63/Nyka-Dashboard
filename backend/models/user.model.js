const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    
    
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
    avatar:{
        type:String,
        required:true,
       
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
},{
     timestamps: true 
})

const User=mongoose.model('user',userSchema)

module.exports=User