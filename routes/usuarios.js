/*
   Se almacenan todas las rutas de usuarios
   Ruta: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getUsuarios, getUsuario, crearUsuario, actualizarUsuario, borrarUsuario } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

//Listado de Usuarios
router.get('/', validarJWT, getUsuarios );

//Regresa un usuario
router.get('/:id', validarJWT, getUsuario );

//Alta de Usuarios
router.post( 
   '/', 
   [
      check('nombres', 'El nombre es obligatorio').not().isEmpty(),
      check('apellidoPaterno', 'El Apellido Paterno es obligatorio').not().isEmpty(),
      check('apellidoMaterno', 'El Apellido Materno es obligatorio').not().isEmpty(),
      check('password', 'la contraseña es obligatorio').not().isEmpty().isLength({ min: 8 }),
      check('email', 'El correo electronico es obligatorio').isEmail().normalizeEmail(),
      validarCampos

   ], 
   crearUsuario );

//Actualizacion de un Usuario
router.put('/:id',
   [
      validarJWT,
      check('nombre', 'El nombre es obligatorio').not().isEmpty(),
      check('email', 'El correo electronico es obligatorio').isEmail().normalizeEmail(),
      validarCampos

   ],  actualizarUsuario);

//Eliminar un Usuario
router.delete('/:id', validarJWT, borrarUsuario);




module.exports = router;