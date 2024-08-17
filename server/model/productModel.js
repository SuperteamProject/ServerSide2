const knexfile = require('../knexfile');
const knex = require('knex')(knexfile.development);
// const db = require('../connection/db.js');

const postProduct = async (product) =>{
    try{
        console.log(product, "test product");
        const dbKnex = await knex ('product').insert(product);
        console.log(dbKnex);
    }catch(err){
        console.log(err, "catch upload product");
    }
     
    
}

// model/productModel.js

const getAllProduct = async () => {
    try {
        const products = await knex('product').select('*');
        return products; // Pastikan ini adalah array
    } catch (error) {
        throw new Error('Error fetching products from database');
    }
};


const updateProduct =(id,products)=>{
    return knex('product').where({id}).update(products).returning('*');
}

const deleteProduct = (id)=>{
    return knex('product').where({id}).del();
}

module.exports = {postProduct,getAllProduct,updateProduct, deleteProduct}