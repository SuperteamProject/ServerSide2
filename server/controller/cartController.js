const cartModel = require("../model/cartModel.js");

exports.addProductToCart = async(req,res)=>{
    console.log("This is cart");
    
    const {user_id, product_id, quantity} = req.body;
    console.log(user_id,product_id,quantity, " => Test parameters");

    try{
        await cartModel.addProductToCart(user_id, product_id, quantity);
        
        
        res.status(201).json({message:"Product has been add to cart"});
    }catch(err){
       // console.log(err);
        
        res.status(500).json({message:"Failed to add product to cart"});
    }

}

exports.getProductToCartById = async(req,res)=>{
//    console.log("test");
   
    try{
        const user_id = req.body;
        const getCart = await cartModel.getProductToCartById(user_id);
        
        // console.log(getCart, "==> Test Get Cart");
        res.status(200).json(getCart);
       
    }catch(err){
        // console.log(err);
        
        res.status(500).json({message:"Failed to fetch product to cart"});
    }
}


