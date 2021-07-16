const { Schema, model } = require('mongoose');

const CategorySchema = Schema ({
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
    }
});
//Elimina la contra
CategorySchema.methods.toJSON = function(){
    //Se saca __v y password lo demas se guarda en user y ese se retorna
    const { __v, _id,state, ...category } = this.toObject();

    return category
}

module.exports = model( 'Category', CategorySchema );