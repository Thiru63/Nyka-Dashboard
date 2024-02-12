const express=require('express')
const dotenv=require('dotenv')
const cors=require('cors')
const mongoConnection=require('./config/db.js')
const {router} = require('./routes/allRoutes.js')

dotenv.config()

const port=process.env.PORT || 8000

const app=express()
app.use(express.json())
app.use(cors())



app.use('/api',router)



app.listen(port, async ()=>{
    try {
        await mongoConnection
        console.log('Mongodb is connected')
    } catch (error) {
        console.log(`Mongodb is not connected dut to this error:${error}`)
    }


    console.log(`server is running at port no: ${port}`)
})