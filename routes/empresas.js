
/*
   Se almacenan todas las rutas de usuarios
   Ruta: /api/empresas 
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const {  getEmpresas, getEmpresa, crearEmpresa, actualizarEmpresa, borrarEmpresa } = require('../controllers/empresas');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

//Listado de Empresas
router.get( '/', 
            validarJWT, 
            getEmpresas 
         
            );

//Devolver datos de una empresa
router.get( '/:id', 
            validarJWT, 
            getEmpresa
         
            );


router.post( 
               '/', 
               [
                  check('nombreComercial', 'El nombre es obligatorio').not().isEmpty(),
                  check('rfc', 'El RFC es obligatorio').not().isEmpty(),
                  validarCampos
               ], 
               validarJWT,
               crearEmpresa 
               
            );


router.put( 
            '/:id',
            [
               validarJWT,
               check('rfc', 'El rfc es obligatorio').not().isEmpty(),
               validarCampos
            ],  
            actualizarEmpresa
         
         );

router.delete(
               '/:id',  
               validarJWT, 
               borrarEmpresa
               
            );




module.exports = router;