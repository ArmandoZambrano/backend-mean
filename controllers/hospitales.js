

const { response, request } = require('express');
const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');



const getHospitales = async( request, response ) => {

    const hospitales = await Hospital.find({}, 'nombre img usuario createAt updateAt');

    response.json({
        ok:true,
        hospitales
    })

}

const crearHospital = async( request, response ) => {

    //recibir los parametros y deestructuramos los datos recibidos
    //const { nombre, img, usuario  } = request.body;

    const { nombre, img, usuario, direccion, telefono } = request.body;
     
    
    try{

        const hospital = new Hospital( request.body );
   
        const existeHospital = await Hospital.findOne({nombre})
        if( existeHospital ){
            return response.status(400).json({
                ok: false,
                msg: 'El Hospital ya ha sido registrado',
            });
        }

       
        //generar el insert
        await hospital.save();

        if (!hospital)
        {
            return response.status(400).json({
                ok:false,
                msg: "No se creo el hospital"
            });
        }
        
        return response.json({
                ok:true,
                msg: "Hospital Creado",
                hospital
                });
                     
       
    }catch (error){
        
        return response.status(500).json({
            ok: false,
            msg: 'Error al generar la peticion',
            error
        });

    }



   
}

const actualizarHospital = async( request, response ) => {

    const uid = request.params.id;
        
    try{

        const usuario = await Usuario.findById( uid );
        if(!usuario){
            response(404).json({
                ok:false,
                msg: "No se encontro el usuario",
                err });

        }

        const campos = request.body;
        
        
        if( usuario.email !== campos.email)
        {
            const existeEmail = await Usuario.findOne({ email : campos.email})
            if( existeEmail ){
                return response.status(400).json({
                    ok:false,
                    msg: 'No se puede usar ese correo'
                });
            }
        }else{
           delete campos.email;
        }
        delete campos.password;
        delete campos.google;
        delete campos.createAt;
        
        
        campos.updateAt = new Date();
        console.log(campos);
        
        const actualizar = await Usuario.findByIdAndUpdate( {_id: uid} , campos , { new:true });
        if(!actualizar)
        {
            return response(404).json({
                        ok:false,
                        msg: "No se pudo actualizar correctamente",
                        err 
                    });
        }else{
            return response.json({
                        ok: true,
                        usuario: actualizar
                    });
        }
        

     }catch (error){
        
        return response.status(500).json({
            ok: false,
            msg: 'Error al generar la peticion',
            error
        });

    }
}


const borrarHospital = async( request, response ) => {

        
    try{
        const uid = request.params.id;

        

        const usuarioDB = await Usuario.findById( uid );
        if(!usuarioDB){
            return response.status(400).json({
                ok:false,
                msg: 'Existe ningun usuario con ese id'
            });
        }else{
            
            await Usuario.findByIdAndDelete( uid );
            return response.status(200).json({
                ok:true,
                msg: "Usuario Eliminado",
             });

        }

            
    }catch (error){
        
        return response.status(500).json({
            ok: false,
            msg: 'Error al generar la peticion',
            error
        });

    }

}



module.exports = {

    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital,

}