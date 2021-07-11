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


module.exports = {
    isRoleValid,
    emailExist,
    userByIdExist
}