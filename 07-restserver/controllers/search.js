const { response } = require("express");
const { ObjectId } = require('mongoose').Types;
const { User, Category, Product, Role } = require('../models')

const collectionPermitted = [
    'categories',
    'products',
    'users',
    'roles'
];

const searchUser = async (termino = '',res = response) =>{
    const esMongoId = ObjectId.isValid(termino);
    if(esMongoId){
        const user = await User.findById(termino);
        return res.json({
            results: (user) ? [user] : []
        })
    }
    const regex = new RegExp( termino, 'i' )

    const users = await User.find({
        $or:[{name: regex},{email: regex}],
        $and:[{state:true}]
    });

    res.json({
        results: users
    })
}

const searchCategory = async (termino = '',res = response) =>{
    const esMongoId = ObjectId.isValid(termino);
    if(esMongoId){
        const category = await Category.findById(termino).populate('user','name');
        return res.json({
            results: (category) ? [category] : []
        })
    }
    const regex = new RegExp( termino, 'i' )

    const categories = await Category.find({
        $or:[{name: regex}],
        $and:[{state:true}]
    }).populate('user','name');

    res.json({
        results: categories
    })
}

const searchProduct = async (termino = '',res = response) =>{
    const esMongoId = ObjectId.isValid(termino);
    if(esMongoId){
        const product = await Product.findById(termino).populate('category','name');
        return res.json({
            results: (product) ? [product] : []
        })
    }
    const regex = new RegExp( termino, 'i' )

    const products = await Product.find({
        $or:[{name: regex}],
        $and:[{state:true}]
    }).populate('category','name');

    res.json({
        results: products
    })
}



const search = async (req, res = response) =>{
    const { colecciones, termino } = req.params;

    if(!collectionPermitted.includes(colecciones)){
        return res.status(400).json({
            msg:`Las colecciones permitidas son: ${collectionPermitted}`
        })
    }

    switch (colecciones) {
        case 'users':
            searchUser(termino,res);
        break;
        case 'categories':
            searchCategory(termino,res);
        break;
        case 'products':
            searchProduct(termino,res);
        break;
        case 'roles':

        break;
        default:
            res.status(500).json({
                msg:'Se me olvido hacer esta busqueda'
            })
        
        break;
    }

    
}

module.exports = {
    search
}