const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: [true, 'el nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'el correo es obligatorio'],
        unique: true
    },

    password: {
        type: String,
        required: [true, 'el contrasena es obligatorio']
    },

    img: {
        type: String,
    },

    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USR_ROLE']
    },

    estado: {
        type: Boolean,
        default: true
    },

    google: {
        type: Boolean,
        default: false
    },

});
UsuarioSchema.methods.toJSON = function (){
    const { __v, password , ...usuario } = this.toObject(); //sacando la version y la clave ... es para que todos los demas se guarden en usuario
    return usuario;
}


module.exports = model('Usuario', UsuarioSchema);

