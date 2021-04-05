const { response , request} = require('express');

const usuariosGet=(req=request, res = response) => {

    const { q, nombre= ' ',apkey} = req.query;

    res.json({
        id: 'ok',
        msg: 'api get- cpntrolador',
        q,
        nombre,
        apkey
    });
}
//  envian datos tipo json raw json body send
// {
//     "nombre": "Oscar T",
//     "edad": 24,
//     "id": 123,
//     "apellido": "otra cosa"
// }
const usuariosPost=(req, res = response) => {
    // const body= req.body;
    const { nombre, edad }= req.body; // desestricturar para sacar solo los datos deseados 

    res.status(201).json({
        msg: 'api post- cpntrolador',
        // body
        nombre,
        edad
    });
}

const usuariosPut=(req, res = response) => {
    const { id } = req.params;
    
    res.json({
        msg: 'api put- cpntrolador',
        id
    });
}

const usuariosPatch=(req, res = response) => {
    res.json({
        id: 'ok',
        msg: 'api patch- cpntrolador'
    });
}

const usuariosDelete=(req, res = response) => {
    res.json({
        id: 'ok',
        msg: 'api delete- cpntrolador'
    });
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
    

}