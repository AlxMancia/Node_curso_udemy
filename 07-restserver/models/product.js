const { Schema, model } = require('mongoose');

const ProductSchema = Schema ({
    name:{
        type: String,
        required: [true,'El nombre es obligatorio'],
        unique: true
    },
    state : {
        type: Boolean,
        default: true,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    price:{
        type: Number,
        default: 0
    },
    category:{
        type: Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    decription:{
        type: String,
    },
    available:{
        type:Boolean,
        default: true
    },
    img:{
        type:String
    }

});

ProductSchema.methods.toJSON = function(){
    //Se saca __v y password lo demas se guarda en user y ese se retorna
    const { __v, _id,state, ...data } = this.toObject();

    return data
}

module.exports = model( 'Product', ProductSchema );