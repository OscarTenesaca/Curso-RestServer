const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');



const usuariosGet = async (req = request, res = response) => {

    // const { q, nombre= ' ',apkey} = req.query;
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true }
// para que funcione secuencialemnte 1 y luego otro 3 seg y 1 seg = 4 seg
    // const usuarios = await Usuario.find(query)
    //     .skip(Number(desde))
    //     .limit(Number(limite));

    // const total = await Usuario.countDocuments(query);

    //  para que se ejecute los dos a la vez 
    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            
    ]);

res.json({
    total,
    usuarios
});
}
//  envian datos tipo json raw json body send
// {
//     "nombre": "Oscar T",
//     "edad": 24,
//     "id": 123,
//     "apellido": "otra cosa"
// }
const usuariosPost = async (req, res = response) => {


    const { nombre, correo, password, rol } = req.body;

    const usuario = new Usuario({ nombre, correo, password, rol });

    // ECRIPTAR LA CONTRASENA 
    const salt = bcryptjs.genSaltSync(); //el numero de vuelta el numero de encriptacion (10 por defecto)
    usuario.password = bcryptjs.hashSync(password, salt);

    //GUARDAR LA CONTRASENA 
    await usuario.save();
    // const { nombre, edad }= req.body; // desestricturar para sacar solo los datos deseados 

    res.status(201).json({
        // msg: 'api post- cpntrolador',
        usuario
        // nombre,
        // edad
    });
}

const usuariosPut = async (req, res = response) => {
    const { id } = req.params;

    const { _id, password, correo, google, ...resto } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);

    }

    const usuarioDB = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuarioDB);
}

const usuariosPatch = (req, res = response) => {
    res.json({
        id: 'ok',
        msg: 'api patch- cpntrolador'
    });
}

const usuariosDelete = async (req, res = response) => {

    const { id }= req.params;

        // borrar fisicamente
        // const user = await Usuario.findByIdAndDelete( id ); 
        const user = await Usuario.findByIdAndUpdate(id, {estado : false});
    



    res.json({
        id,
        user
    });
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,


}