const User=require('../models/user.model.js')
const jwt = require('jsonwebtoken')

const userAuthenticationMiddleware = async (req, res, next) => {
    let token
  
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        
        token = req.headers.authorization.split(' ')[1]
  
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
  
        
        req.user = await User.findById(decoded.id).select('-password')
  
        next()
      } catch (error) {
        console.log(error)
        return res.status(401).send({
          message:"Not authorized"
        })
      }
    }
  
    if (!token) {
      return res.status(401).send({
        message:"Not authorized"
      })
    }
  }
  
  module.exports = { userAuthenticationMiddleware }