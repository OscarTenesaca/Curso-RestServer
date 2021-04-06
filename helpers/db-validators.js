const Role = require('../models/role');
const Usuario = require('../models/usuario');




const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la BD`)
    }
}

const emailExiste = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`Este correo: ${correo} ya esta regostrado`)
    }
}

const existeUserPorId = async (id = '') => {
    const existeusuario = await Usuario.findById(id );
    if (!existeusuario) {
        throw new Error(`el Id : ${id} no existe`)
    }
}


module.exports = {
    esRolValido,
    emailExiste,
    existeUserPorId
}