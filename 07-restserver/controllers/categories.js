const { request, response } = require("express");
const { Category, User } = require('../models/index');

//borrar categoria - state false

const categoryGet = async (req, res = response) =>{
    const {id} = req.params;
    const categoria = await Category.findById(id).populate('user','name');
    res.json(categoria)
}

const categoriesGet = async (req ,res = response) =>{
    const { limit = 5, from = 0} = req.query;
    const query = {state: true};

    const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .populate('user', 'name')
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        categories
    });

}

const categoryCreate = async (req,res = response) =>{

    const name = req.body.name.toUpperCase();
    const categorydb = await Category.findOne({name});

    if(categorydb){
        return res.status(400).json({
            msg: `La categoria ${categorydb.name} ya existe`
        })
    }

    //Generar la data a guardar
    const data = {
        name,
        user: req.user._id
    }

    const category = new Category(data);

    await category.save();

    res.status(201).json(category);

}

const categoryUpdate = async (req,res = response ) => {
    const { id } = req.params;
    const { _id, state, user,...data } = req.body;
    if(data.name){

        data.name = data.name.toUpperCase();
    }
    
    const category = await Category.findByIdAndUpdate(id,data).populate('user','name');

    res.status(200).json({
        msg: 'PUT API - Controlador',
        category
    });
}
//60ea269a3d1268164f80151a
//60ea269a3d1268164f80151a

const categoryDelete = async (req,res = response) => {
    const { id } = req.params;
    const query = {state:false};

 

    //borrar fisicamente
    // const user = await User.findByIdAndDelete(id);

    const category = await Category.findByIdAndUpdate(id,query,{new:true});

    res.json({
        category
    });
}

module.exports = {
    categoryGet,
    categoriesGet,
    categoryCreate,
    categoryUpdate,
    categoryDelete
}