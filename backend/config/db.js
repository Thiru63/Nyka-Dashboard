const mongoose = require('mongoose')
const dotenv=require('dotenv')
dotenv.config()

let mongoConnection=mongoose.connect(process.env.MONGO_URI)

module.exports=mongoConnection