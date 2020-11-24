
/*
   Se almacenan todas las rutas de usuarios
   Ruta: /api/hospitales
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const {  getHospitales, crearHospital, actualizarHospital, borrarHospital } = require('../controllers/hospitales');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();


router.get( '/', 
            validarJWT, 
            getHospitales 
         
            );

router.post( 
               '/', 
               [
                  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
                  validarCampos
               ], 
               validarJWT,
               crearHospital 
               
            );

router.put( 
            '/:id',
            [
               validarJWT,
               check('nombre', 'El nombre es obligatorio').not().isEmpty(),
               check('email', 'El correo electronico es obligatorio').isEmail().normalizeEmail(),
               validarCampos
            ],  
            actualizarHospital
         
         );

router.delete(
               '/:id',  
               validarJWT, 
               borrarHospital
               
            );




module.exports = router;