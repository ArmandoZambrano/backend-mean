'use strict';

const { response, request } = require('express');
const bcrypt = require('bcryptjs');


const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const loginUsuario = async ( req, res = response ) => {

  try{

    
    const { email , password } = req.body;

    const usuarioDB = await Usuario.findOne({email});

        if(!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'credenciales invalidas'
            });
        }
        const validaPassword = await bcrypt.compareSync(password, usuarioDB.password);
        
        if(!validaPassword)
        {
            return  res.status(404).json({
                        ok:false,
                        msg:'credenciales invalidas'
                    });
        }

       const token = await generarJWT( usuarioDB.id );
        
       res.json({
        ok:true,
        token
    })
       
    }catch(error){
        
        response.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })

    }
    

}

module.exports = {
    loginUsuario
}