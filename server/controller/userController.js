const {registerUser,loginUser, findUserByEmail} = require("../model/userModel");
const bcrypt = require('bcryptjs');
const {getAllProduct} = require("../model/productModel");
const passport = require('passport');


exports.registerUser = async (req,res)=>{

  try {
      const { firstname, lastname, email , password } = req.body;
      console.log(email);
      
      const existingUser = await findUserByEmail(email);
      if (existingUser) {
          return res.status(400).json({ error: 'Email sudah terdaftar' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = {
          firstname,
          lastname,
          email,
          password: hashedPassword
      };

      await registerUser(newUser);
      console.log(newUser, " => Di Controller");

      // res.status(201).json({ message: 'User berhasil terdaftar', data: newUser });
      res.redirect('/api/v1/user-register')
      
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

exports.loginUser = (req, res, next) => {
  passport.authenticate('user-local',
    
  {
      successRedirect: '/api/v1/home',
      failureRedirect: '/api/v1/user-login',// Jika Anda ingin menggunakan flash messages
      session: true, // Pastikan hanya menyimpan sesi jika login berhasil
      failureMessage: true,
             
  }),(req, res, next) =>{    
  };
}

exports.logoutUser = (req, res) => {
  req.logout(err => {
      if (err) return res.status(500).json({ error: 'Internal Server Error' });
      res.redirect('/api/v1/user-login');
  });
}