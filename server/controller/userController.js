const {registerUser,loginUser, findUserByEmail} = require("../model/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {getAllProduct} = require("../model/productModel");


exports.registerUser = async (req,res)=>{
    try{   
      const{firstname,lastname,email,password} =req.body;
      const newUser={
          firstname,
          lastname,
          email,
          password
      }
      console.log(newUser,"ini new USer");
      const newregisterUser = await registerUser(newUser);
      console.log(newregisterUser);
      // console.log(newUser ," => Di COntroller ");
      res.render('home_user.ejs');
  }catch(err){
      console.log(err);
  }
}

exports.loginUser = async (req,res)=>{ 
    
    try {
      const { email, password } = req.body;
      const newUser={
        email,
        password
    }
    // console.log(newUser, "=> ini login User");

     
    const users = await findUserByEmail(email);
      console.log(users, "==> cek user by email");
      
      const getProduct = await getAllProduct();
      
      console.log(getProduct, "==> cek fetch product berhasil");

     if(users){
      const validatePassword = users[0].password;
      console.log(validatePassword);
      if(validatePassword === password){
        console.log("login successfully");
        //res render
        res.render('user_dashboard', {getProduct});
      }else{
        console.log("email or password invalid");
      }
     }else{
      console.log("account does not exist");
     }
      
    }catch(err){
      console.log(err);
    }
}