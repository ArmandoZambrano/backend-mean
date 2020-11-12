/*
   Se almacenan todas las rutas de usuarios
   Ruta: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getUsuarios, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();


router.get('/', validarJWT, getUsuarios );
router.post( 
   '/', 
   [
      check('nombre', 'El nombre es obligatorio').not().isEmpty(),
      check('password', 'la contraseña es obligatorio').not().isEmpty().isLength({ min: 8 }),
      check('email', 'El correo electronico es obligatorio').isEmail().normalizeEmail(),
      validarCampos

   ], 
   crearUsuario );

router.put('/:id',
   [
      validarJWT,
      check('nombre', 'El nombre es obligatorio').not().isEmpty(),
      check('email', 'El correo electronico es obligatorio').isEmail().normalizeEmail(),
      validarCampos

   ],  actualizarUsuario);

router.delete('/:id', validarJWT, borrarUsuario);




module.exports = router;