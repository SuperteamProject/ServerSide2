const knexfile = require('../knexfile');
const knex = require('knex')(knexfile.development);

const registerUser=(newUser) =>{
    const {firstname,lastname,email,password} = newUser;
    return knex ('user_account').insert({firstname,lastname,email,password});
}

const loginUser =(email,password)=>{
    return knex('user_account').select('*').where({
        email:email,
        
    });
}

const findUserByEmail = (email)=>{
    return knex('user_account').select('*').where({email:email});
}

module.exports = {registerUser,loginUser,findUserByEmail};