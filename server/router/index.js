const express = require('express');
const router = express.Router();
const {registerAdmin,loginAdmin} = require("../controller/adminController.js");
const {postProduct,getAllProduct,updateProduct,deleteProduct} = require("../controller/productController");
const {registerUser,loginUser} = require("../controller/userController.js");



router.get('/',  (req, res) => {
    res.render('signup_admin');
})
//admin
router.post("/api/v1/admin-register",registerAdmin);
router.post("/api/v1/admin-login",loginAdmin);

//product 
router.post("/api/v1/upload-product",postProduct);
router.get("/api/v1/all-product",getAllProduct);
router.put("/api/v1/:id/update-product",updateProduct);
router.delete("/api/v1/:id/delete-product",deleteProduct);

//user
//Signup User
router.post("/api/v1/user-register", registerUser);
//Login User
router.post("/api/v1/login-user",loginUser);
router.get("/api/v1/user-dashboard")

module.exports = router;