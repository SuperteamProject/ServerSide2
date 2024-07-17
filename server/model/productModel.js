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

const getAllProduct = async()=>{

    try{
       const dbKnex = await knex('product').select('*');  
       return dbKnex;
       //    console.log(dbKnex);
    }catch(err){
        console.log(err,"ini Catch");
    }
    
}

const updateProduct =(id,products)=>{
    return knex('product').where({id}).update(products).returning('*');
}

const deleteProduct = (id)=>{
    return knex('product').where({id}).del();
}

module.exports = {postProduct,getAllProduct,updateProduct, deleteProduct}