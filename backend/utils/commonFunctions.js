const jwt=require('jsonwebtoken')
require("dotenv").config();
const cloudinary = require("cloudinary");


// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    })
  }



  
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME ,
  api_key: process.env.CLOUD_API_KEY ,
  api_secret: process.env.CLOUD_API_SECRET ,
});

const imageUpload=(file) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      (result) => {
        resolve({ url: result.url });
      },
      { resource_type: "auto" }
    );
  });
};



  module.exports= {generateToken,imageUpload}