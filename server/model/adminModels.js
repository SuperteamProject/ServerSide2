const knexfile = require('../knexfile');
const knex = require('knex')(knexfile.development);
// const db = require('../connection/db.js')
const bcrypt = require('bcrypt');

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
    return await knex('admin_account').where({ email }).first();
}
const findAdminById = async (id)=>{
    return await knex('admin_account').where({ id }).first();
}

const checkPassword = async (password, hash) => {
    try {
        const isMatch = await bcrypt.compare(password, hash);
        return isMatch;
    } catch (err) {
        console.error(err);
        throw new Error('Password comparison error');
    }
}

module.exports = {registerAdmin,loginAdmin,findAdminByEmail,checkPassword, findAdminById};