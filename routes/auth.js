/*
   Path: '/api/login'
*/

const { Router } = require("express");
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { loginUsuario } = require('../controllers/auth')


const router = Router();

router.post('/',
    [
       check('email', 'El correo electronico es obligatorio').isEmail(),
       check('password', 'la contraseña es obligatorio').not().isEmpty().isLength({ min: 8 }),
        validarCampos
    ],
    loginUsuario
)


module.exports = router;