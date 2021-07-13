const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const { generateJWT } = require('../helpers/generateJWT');
const { googleVerify } = require('../helpers/google-verify');


const login = async (req, res = response) =>{
    const { email, password } = req.body;

    try {

        //Verifican si el email existe
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                msg:"User/Password no son correctos - Email no existe"
            });
        }

        //Verificar si el usuario sigue activo
        if(!user.state){
            return res.status(400).json({
                msg:"User/Password no son correctos - state: false"
            });
        }

        //Verificar password
        const validPassword = bcryptjs.compareSync(password, user.password);
        if(!validPassword){
            return res.status(400).json({
                msg:"User/Password no son correctos - password: incorrecto"
            });
        }

        //Generar el JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Error algo salio mal'
        })
    }
}

const googleSignIn = async (req = request,res = response) =>{
    const { id_token } = req.body;

    try {
        const {email,name,img } = await googleVerify( id_token );

        let user = await User.findOne({email});

        if(!user){
            const data = {
                name,
                email,
                password: ':V',
                img,
                google : true
            }
            user = new User(data);
            await user.save();
        }

        //Si el user no esta en bd
        if(!user.state){
            res.status(401).json({
                msg:'Hable con admin, user blocked'
            });
        }

        //Generar JWT
        const token = await generateJWT(user.id);

        res.json({
            msg:'Todo OK google Sign In',
            user,
            token
        })
    } catch (error) {
        res.status(400).json({
            msg:'Token de google no es valido'
        })
    }

    
}

module.exports = {
    login,
    googleSignIn
}