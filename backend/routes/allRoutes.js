const express=require('express')
const { userRegister, userLogin } = require('../controllers/user.controller')
const { createDocter, getAllDocter, updateDocter, deleteDocter } = require('../controllers/docter.controller')
const { userAuthenticationMiddleware } = require('../middlewares/userAuthentication.middleware')

const router=express.Router()

// user routes
router.post('/signup',userRegister)
router.post('/login',userLogin)

// appointments routes
router.post('/appointments',userAuthenticationMiddleware,createDocter)
router.get('/appointments',getAllDocter)
router.put('/appointments/:docterId',userAuthenticationMiddleware,updateDocter)
router.delete('/appointments/:docterId',userAuthenticationMiddleware,deleteDocter)

module.exports= {router}