

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

    const id = request.params.id;
        
    try{

        const hospital = await Hospital.findById( id );
        if(!hospital){
            response(404).json({
                ok:false,
                msg: "No se encontro el hospital",
                err });

        }

        const campos = request.body;
        
        
        campos.updateAt = new Date();
        console.log(campos);
        
        const actualizar = await Hospital.findByIdAndUpdate( {_id: id} , campos , { new:true });
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
                        hospital: actualizar
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
        const id = request.params.id;

        

        const hospitalDB = await Hospital.findById( id );
        if(!hospitalDB){
            return response.status(400).json({
                ok:false,
                msg: 'Existe ningun hospital con ese id'
            });
        }else{
            
            await Hospital.findByIdAndDelete( id );
            return response.status(200).json({
                ok:true,
                msg: "Hospital Eliminado",
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