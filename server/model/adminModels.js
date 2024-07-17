const knexfile = require('../knexfile');
const knex = require('knex')(knexfile.development);
// const db = require('../connection/db.js')
const registerAdmin=async(admin) =>{
    
    try{
        
        console.log(admin, "Test");
        const dbKnex = await knex('admin_account').insert(admin);
        console.log(dbKnex);
    }catch(err){
        console.log(err, "ini catch register admin")
     }
    
}

const loginAdmin =async(admin)=>{
    try{
        console.log(admin, "ini model");

        const dbKnex = await knex('admin_account').select(admin);
        console.log(dbKnex);
    }catch(err){
        console.log(err, "catch login admin")
    }
    
}

const findAdminByEmail = async (email)=>{
    return knex('admin_account').select('*').where({email:email});
}

module.exports = {registerAdmin,loginAdmin,findAdminByEmail};