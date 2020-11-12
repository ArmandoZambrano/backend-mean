const { response, request } = require('express');
const { validationResult } = require('express-validator');

const validarCampos = (req, res = response, next) => {

    const errores = validationResult( req ); 
    //validar los datos 
    if( !errores.isEmpty())
    {
        return res.status(400).json({
            ok: false,
            msg: 'Error al generar la peticion',
            errores
        });
    }
    
    next();

}


module.exports = {
    validarCampos
}