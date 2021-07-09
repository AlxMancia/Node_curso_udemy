const {response} = require('express')

const usersGet = (req, res = response)=> {
    //aca se agarra la queryparams
    const { q, nombre = "NoName", apikey } = req.query;
    res.json({
        ok: true,
        msg: 'GET API - Controlador',
        q,
        nombre, 
        apikey
    });
}

const usersPut =  (req, res = response)=> {
    const { id } = req.params;

    res.status(200).json({
        ok: true,
        msg: 'PUT API - Controlador',
        id
    });
}

const usersPost = (req, res = response)=> {
    //Se lee el body de la request para trabajarlo
    const {nombre, edad} = req.body;
    //Se retorna la response
    res.status(201).json({
        ok: true,
        msg: 'POST API - Controller',
        nombre,
        edad
       
    });
}

const usersDelete = (req, res = response)=> {
    res.json({
        ok: true,
        msg: 'DELETE API - Controler'
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