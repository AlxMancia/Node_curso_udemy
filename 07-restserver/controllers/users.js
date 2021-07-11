const {response} = require('express');
//Paquete para encriptar contraseña
const bcryptjs = require('bcryptjs');



//Se importa el modelo o clase desde user y se instancia como una variable para despues crear una instancia de esto
const User = require('../models/user');


const usersGet = async (req, res = response)=> {
    
    //aca se agarra la queryparams
    const { limit = 5, from = 0} = req.query;
    const query = {state: true};


    //Metodo de wait es mas lento porque trabaja una y despues la otra
    // const users = await User.find(query)
    //     .skip(Number(from))
    //     .limit(Number(limit));
    // const total = await User.countDocuments(query);


    //Metodo de promesas es mejor porque pide los dos awaits de una vez
    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        users
    });
}


const usersPost = async (req, res = response)=> {
    


    //Se lee el body de la request para trabajarlo
    const {name,email,password,role} = req.body;


    //Nueva instancia de usuario que viene desde linea 3
    const user = new User({name,email,password,role});


    //Encriptar password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password , salt);


    //Guardar en db
    await user.save();

    
    //Se retorna la response
    res.status(201).json({
        msg: 'POST API - Controller',
        user
    });
}

const usersPut = async (req, res = response)=> {

    const { id } = req.params;
    const { _id, password, google, ...resto } = req.body;
    
    //TODO validar contra db
    if(password){
    
        //Encriptar password
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password , salt);
    }
    
    const user = await User.findByIdAndUpdate(id,resto);

    res.status(200).json({
        msg: 'PUT API - Controlador',
        user
    });
}

const usersDelete = async (req, res = response)=> {
    const { id } = req.params;
    const query = {state:false}

    //borrar fisicamente
    // const user = await User.findByIdAndDelete(id);

    const user = await User.findByIdAndUpdate(id,query);

    res.json({
        user,
        id
    });
}

const usersPatch =  (req, res = response)=> {
    res.json({
        ok: true,
        msg: 'PATCH API - Controler'
    });
}

module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersPatch,
    usersDelete,

}