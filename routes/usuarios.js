const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido , emailExiste, existeUserPorId} = require('../helpers/db-validators');

const { usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch } = require('../controllers/usuarios');
const { validate } = require('../models/role');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id',[
    check('id', 'no es un ID valido').isMongoId(),
    check('id').custom( existeUserPorId ),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPut);

router.post('/',[
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('password', 'el password es obligatorio debe ser mas de 6 letras').isLength({min:6}),
    // check('correo', 'el correo no es valido').isEmail(),
    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('correo').custom(emailExiste),//(rol)=>esRolValido(rol) son iguales ya que tiene el mismo nombre rol
    check('rol').custom(esRolValido),//(rol)=>esRolValido(rol) son iguales ya que tiene el mismo nombre rol
    
    validarCampos
    
], usuariosPost);

router.delete('/:id',[
    check('id', 'no es un ID valido').isMongoId(),
    check('id').custom( existeUserPorId ),
    validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);

module.exports = router;