

const {Schema, model} = require('mongoose');

const RoleSachema = Schema({
    rol:{
        type: String,
        required: [ true, 'El rol es obligatorio']
    }
});


module.exports = model( 'ROLE' , RoleSachema );