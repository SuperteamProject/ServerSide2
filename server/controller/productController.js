const  db = require('../connection/db.js'); 
const product = require("../model/productModel.js");
const {getAllProduct} = require("../model/productModel");

exports.postProduct = async(req,res)=>{
    try{
        const{image,name,price} = req.body;
        const newProduct = {
            image,
            name,
            price
        }
        console.log(newProduct, "ini new product");
       const Products= await product.postProduct(newProduct)
       const getProduct = await product.getAllProduct();
        // console.log(newProduct, "=> Di Controller");
        // console.log(req.body.image,"test reqbody");
        // res.json(Products);
       console.log(Products)
       res.render('admin_editProduct',{getProduct});
    }
    catch(err){
        console.log(err);
    }
}

exports.getAllProduct = async(req,res)=>{
    console.log("Masuk ke sini");
    // try {
    //     const products = await product.getAllProduct();
    //     return products;
    //     } catch (error) {
    //     res.status(500).json({ error: error.message });
    //     }
        
    
}

exports.updateProduct = async(req,res) =>{
    const{id} = req.params; 
    const{image,name,price} = req.body;
    const newProduct ={
        image,
        name,
        price
    }
    try {
        const update_product = await product.updateProduct(id,newProduct);
        if (update_product) {
            res.status(200).json(update_product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update product' });
    }
    
}

exports.deleteProduct = async(req,res)=>{
    try{
        const deleted = await product.deleteProduct(req.params.id);
        if (deleted) {
            res.status(200).json({ message: 'Product deleted' });
        } 
        else 
        {
            res.status(404).json({ message: 'Product not found' });
        }
        } catch (error) {
        res.status(500).json({ error: error.message });
        }
}

