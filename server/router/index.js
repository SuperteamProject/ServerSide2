const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin, logoutAdmin } = require("../controller/adminController.js");
const { postProduct, getAllProduct, updateProduct, deleteProduct } = require("../controller/productController");
const { registerUser, loginUser, logoutUser } = require("../controller/userController.js");

const upload = require('../middleware/multer.js');


function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/api/v1/user-login');
}

router.get('/', (req, res) => {
    res.render('signin_admin');
})

// Admin routes
router.post("/api/v1/admin-register", registerAdmin);
router.post("/api/v1/admin-login", loginAdmin);
router.get("/api/v1/admin-logout", logoutAdmin);
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard', { user: req.user });
});

// Product routes 
router.post("/api/v1/upload-product",upload.single('image'), postProduct);
router.get("/api/v1/all-product", getAllProduct);
router.put("/api/v1/:id/update-product",upload.single('image'), updateProduct);
router.delete("/api/v1/:id/delete-product", deleteProduct);

// User routes
router.post("/api/v1/user-register", registerUser);
router.get("/api/v1/user-register", (req,res) => {res.render('user-register')});
router.post("/api/v1/user-login", loginUser);
router.get("/api/v1/user-login", (req,res) => {res.render('user-login')});

router.get('/api/v1/home', ensureAuthenticated, async (req, res) => {
    const products = await getAllProduct();
    console.log(products);
    
    res.render('home-user', { user: req.user, products });
});
router.get("/api/v1/user-logout", logoutUser);


module.exports = router;
