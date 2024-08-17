const knexfile = require('../knexfile');
const knex = require('knex')(knexfile.development);

const addProductToCart=(user_id,product_id,quantity)=>{
    return knex('cart').insert({user_id,product_id,quantity});
}

const getProductToCartById=(user_id)=>{
    return knex('cart')
    .join('product', 'cart.product_id', 'product.id')
    .select('product.name', 'product.price','cart.quantity');
}

const deleteCart =(id)=>{
    return knex('cart').where({id}).del();
}
module.exports={addProductToCart,getProductToCartById,deleteCart}