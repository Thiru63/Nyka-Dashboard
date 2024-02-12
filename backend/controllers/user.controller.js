const User=require('../models/user.model.js')
const bcrypt=require('bcrypt')
const { generateToken } = require('../utils/commonFunctions.js')


// user register

const userRegister= async (req,res)=>{
   
    try {
        
        let {email,password,confirm_password}=req.body
        
        if(!email||!password||!confirm_password){
            return res.status(400).send({
                message:"Please Fill All Fields"
            })
        }

        if(password !==confirm_password){
            return res.status(400).send({
                message:"Passwords does not match"
            })
        }
       
        let existUserEmail=await User.findOne({email:email})
        if(existUserEmail){
            return res.status(400).send({
                message:"user already exists so please login"
            })
        }
        

        const salt = await bcrypt.genSalt(6)
        const hashedpassword = await bcrypt.hash(password, salt)


        await User.create({
            
            email,
            password:hashedpassword,
            
        })


        
           
            return res.status(201).json({
                message:"Registration Successfull Please Login",
               
            })
        

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message:"Something error occured so please try again later"
        })
        
    }

}

// user login

const userLogin= async (req,res)=>{
   
    try {
        
        let {email,password}=req.body
        
        if(!email||!password){
            return res.status(400).send({
                message:"Please Fill All Fields"
            })
        }
       
        let user=await User.findOne({email:email})
        


        if(user){
           
            if(await bcrypt.compare(password, user.password)){
                let token=generateToken(user._id)
              return res.status(201).json({
                message:"Login Successfull",
                user:{
                    
                email:user.email,
                

                },
                
                token:token,
            })
            }else{
                return res.status(400).send({
                    message:"Invalid credentials"
                })
            }

            
        }else{
            return res.status(404).send({
                message:"user not exists so please register"
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message:"Something error occured so please try again later"
        })
        
    }

}

module.exports= {userRegister,userLogin}