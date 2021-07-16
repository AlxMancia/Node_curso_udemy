const { Category, Product } = require('../models');
const Role = require('../models/role');
const User = require('../models/user')


const isRoleValid = async (role = '') =>{
    const roleExist = await Role.findOne({role});
    if(!roleExist){
        throw new Error(`EL ${ role } no esta registrado en la base de datos`);
    }
}

const emailExist = async (email = '')=>{
    const emailExiste = await User.findOne({ email });
    if(emailExiste) {
        throw new Error('El correo ya existe');
    }
}

const userByIdExist = async (id )=>{
    const userExiste = await User.findById( id );
    if(!userExiste) {
        throw new Error(`El id ${id} no existe`);
    }
}

const categoryByIdExist = async ( id )=>{
    const categoryExiste = await Category.findById( id );
    if(!categoryExiste) {
        throw new Error(`El id ${id} no existe`);
    }
}

const productByIdExist = async ( id )=>{
    const productExiste = await Product.findById( id );
    if(!productExiste) {
        throw new Error(`El producto ${id} no existe`);
    }
}



module.exports = {
    isRoleValid,
    emailExist,
    userByIdExist,
    categoryByIdExist,
    productByIdExist
}