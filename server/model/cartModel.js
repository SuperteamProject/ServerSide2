const knexfile = require('../knexfile');
const knex = require('knex')(knexfile.development);

const addProductToCart=(product_id)=>{
    return knex('cart').insert({product_id});
}

module.exports={addProductToCart}