const knexfile = require('../knexfile');
const knex = require('knex')(knexfile.development);
// const db = require('../connection/db.js')
const bcrypt = require('bcrypt');

const registerUser=async(user) =>{
    try{
        console.log(user, "Test");
        const dbKnex = await knex('user_account').insert(user);
        console.log(dbKnex);
    }catch(err){
        console.log(err, "ini catch register User")
     }
}

const loginUser =(email,password)=>{
    return knex('user_account').select('*').where({
        email:email,
        
    });
}

const findUserByEmail = async (email)=>{
    return await knex('user_account').where({ email }).first();
}

module.exports = {registerUser,loginUser,findUserByEmail};