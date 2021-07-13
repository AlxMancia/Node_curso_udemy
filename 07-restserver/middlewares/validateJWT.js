const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async( req = request,res = response, next ) =>{

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: "No hay token en la peticion"
        })
    }

    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY   );

        const user = await User.findById(uid);
        if(!user){
            return res.status(401).json({
                msg: "Usuario no encontrado"
            })
        }


        
        //Verificar si el uid tiene estado en true, osea existe
        if(!user.state){
            return res.status(401).json({
                msg:"Token no valido - user con estado false"
            })
        }
        
        
        req.user = user;
        next();
    } catch (error) {
        // console.log(error);
        res.status(401).json({
            msg: "Token no valido"
        })
    }



}

module.exports = {
    validateJWT
}