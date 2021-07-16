const { request, response } = require("express");
const { Product, Category, User } = require('../models/index');


const productGet = async (req, res = response) =>{
    const {id} = req.params;
    const product = await Product.findById(id).populate('user','name').populate('category','name');
    res.json(product)
}

const productsGet = async (req ,res = response) =>{
    const { limit = 5, from = 0} = req.query;
    const query = {state: true};

    const [total, products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .populate('user', 'name')
            .populate('category','name')
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        products
    });

}

const productCreate = async (req,res = response) =>{

    const {name, price, category, description, available,state,user} = req.body;
    const productdb = await Product.findOne({name});

    if(productdb){
        return res.status(400).json({
            msg: `El Producto ${productdb.name} ya existe`
        })
    }

    //Generar la data a guardar
    const data = {
        name: name.toUpperCase(),
        price,
        category,
        description,
        available,
        user: req.user._id
    }

    const product = new Product(data);

    await product.save();

    res.status(201).json(product);

}

const productUpdate = async (req,res = response ) => {
    const { id } = req.params;
    const { _id, state, ...data } = req.body;

    if(data.name){
        data.name = data.name.toUpperCase();
    }

    data.user = req.user._id;
    const product = await Product.findByIdAndUpdate(id,data).populate('user','name').populate('category','name');
    console.log(_id)
    res.status(200).json({
        msg: 'PUT API - Controlador',
        product,
        _id
    });
}

const productDelete = async (req,res = response) => {
    const { id } = req.params;
    const query = {state:false};

 

    //borrar fisicamente
    // const user = await User.findByIdAndDelete(id);

    const product = await Product.findByIdAndUpdate(id,query,{new:true});

    res.json({
        product
    });
}

module.exports = {
    productGet,
    productsGet,
    productCreate,
    productUpdate,
    productDelete
}