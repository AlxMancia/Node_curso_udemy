const path = require('path');
const fs = require('fs');

const { response, json } = require("express");
const { uploadFile } = require("../helpers");
const { User, Product } = require('../models')


const loadFiles = async (req,res = response) =>{
    
    try {
        const name = await uploadFile(req.files,undefined,'imgs');
        res.json({
            name
        })
    } catch (msg) {
        res.status(400).json({
            msg
        })
    }
}

const updateImg = async (req,res=response)=>{
    const {id,coleccion} = req.params;

    let model;

    switch (coleccion) {
        case 'users':
            model = await User.findById(id);
            console.log(model)

            if(!model){
                return res.status(400).json({
                    msg:`No existe un usuario con el id ${id}`
                })
            }
        break;

        case 'products':
            model = await Product.findById(id);
            console.log(model)
            if(!model){
                return res.status(400).json({
                    msg:`No existe un producto con el id ${id}`
                })
            }
        break;
        
        default:
            return res.status(500).json({msg:'Se olvido validar esto'})
        break;
    }

    //limpiar imagenes previas
    if(model.img){
        //Borrar la img del server
        const pathImg = path.join(__dirname,'../uploads',coleccion,model.img);
        if(fs.existsSync(pathImg)){
            fs.unlinkSync(pathImg);
        }
    }

    const name = await uploadFile(req.files,undefined,coleccion);
    model.img = name;

    await model.save();

    res.json({
        model
    })

}

const showImg = async(req,res=response)=>{
    const {id,coleccion} = req.params;

    let model;

    switch (coleccion) {
        case 'users':
            model = await User.findById(id);

            if(!model){
                return res.status(400).json({
                    msg:`No existe un usuario con el id ${id}`
                })
            }
        break;

        case 'products':
            model = await Product.findById(id);
            if(!model){
                return res.status(400).json({
                    msg:`No existe un producto con el id ${id}`
                })
            }
        break;
        
        default:
            return res.status(500).json({msg:'Se olvido validar esto'})

    }

    //limpiar imagenes previas
    if(model.img){
        //Borrar la img del server
        const pathImg = path.join(__dirname,'../uploads',coleccion,model.img);
        if(fs.existsSync(pathImg)){
            return res.sendFile(pathImg)
        }
    }
    const pathImgNotFound = path.join(__dirname,'../assets/no-image.jpg');
    
    res.sendFile(pathImgNotFound);
    
}


module.exports = {
    loadFiles,
    updateImg,
    showImg
}