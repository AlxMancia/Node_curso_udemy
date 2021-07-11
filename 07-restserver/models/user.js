const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name:{
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email:{
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'El password es obligatorio']
    },
    img: {
        type: String,
    },
    role:{
        type: String,
        required: true,
        enum: ['ADMIN_ROLE','USER_ROLE']
    },
    state: {
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }
});
//Elimina la contra
UserSchema.methods.toJSON = function(){
    //Se saca __v y password lo demas se guarda en user y ese se retorna
    const { __v, password, ...user } = this.toObject();
    return user
}

module.exports = model('User', UserSchema);