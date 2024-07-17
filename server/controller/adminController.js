// const  db = require('../connection/db.js');
const {registerAdmin,loginAdmin,findAdminByEmail} =require("../model/adminModels.js");


exports.registerAdmin= async (req,res) =>{
   
    try{
        const{username,email,password} =req.body;
        const newAdmin={
            username,
            email,
            password

        }
        await registerAdmin(newAdmin);
        console.log(newAdmin ," => Di COntroller ");
        res.render('signin_admin.ejs');
    }catch(err){
        console.log(err);
    }
}

exports.loginAdmin = async(req,res) => {
    try{
        const {email,password} = req.body;

        const newAdmin = {
            email,
            password
        }
        const admins = await findAdminByEmail(email);
        console.log(admins);

       if(admins){
        const validatePassword = admins[0].password;
        console.log(validatePassword);

        if(validatePassword === password){
            console.log("login successfully");
            res.render('admin_dashboard');
        }else{
            console.log("email or password invalid");
        }
       }else{
        console.log("account doesn't exist"); 
       }
    }catch(err){
        console.log(err);
    }

}

