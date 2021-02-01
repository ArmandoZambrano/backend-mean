

const { response, request } = require('express');

const Empresas = require('../models/empresa');

const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');



const getEmpresas = async( request, response ) => {

    const empresas = await Empresas.find({}, 'nombreComercial logo razonSocial regimenFiscal direccionFiscal telefono giro createAt updateAt');

    response.json({
        ok:true,
        empresas
    })

}

const getEmpresa = async( request, response ) => {

    const uid = request.params.id;
    
    const empresa = await Empresas.findById( uid ,  'nombreComercial logo razonSocial regimenFiscal direccionFiscal telefono giro createAt updateAt');

    response.json({
        ok:true,
        empresa
    })

}


const crearEmpresa = async( request, response ) => {

    //recibir los parametros y deestructuramos los datos recibidos
    const { nombreComercial, logo, razonSocial, rfc, regimenFiscal, direccionFiscal, telefono, giro } = request.body;
     
    
   try{

        const empresa = new Empresas( request.body );
   
        const existeEmpresa = await Empresas.findOne({rfc})
        if( existeEmpresa ){
            return response.status(400).json({
                ok: false,
                msg: 'El RFC ya esta registrado',
            });
        }

       
        //generar el insert
        await empresa.save();

        if (!empresa)
        {
            return response.status(400).json({
                ok:false,
                msg: "No se creo la empresa"
            });
        }
        
        return response.json({
                ok:true,
                msg: "Empresa Creada",
                empresa
                });
                     
       
   }catch (error){
       
        return response.status(500).json({
            ok: false,
            msg: 'Error al generar la peticion',
            error
        });

    }



   
}


const actualizarEmpresa = async( request, response ) => {

    const id = request.params.id;
        
 try{

  const empresa = await Empresas.findById( id );
        if(!empresa){
            return response.status(404).json({
                ok:false,
                msg: "No se encontro la empresa",
            });

        }

        const campos = request.body;
        campos.updateAt = new Date();
                
        const actualizar = await Empresas.findByIdAndUpdate( {_id: id} , campos , { new:true });
        if(!actualizar)
        {
            return response.status(404).json({
                        ok:false,
                        msg: "No se pudo actualizar correctamente",
                    });
        }else{
            return response.json({
                        ok: true,
                        msg: "Empresa Actualizada",
                        empresa: actualizar
                    });
        }
        
  }
  catch (error){
        
        return response.status(500).json({
            ok: false,
            msg: 'Error al generar la peticion',
            error
        });

    }
}


const borrarEmpresa = async( request, response ) => {
        
    try{
        const id = request.params.id;

        const empresa = await Empresas.findById( id );
        if(!empresa){
            return response.status(400).json({
                ok:false,
                msg: 'Existe ninguna empresa con ese id'
            });
        }else{
            
            await Empresas.findByIdAndDelete( id );
            return response.status(200).json({
                ok:true,
                msg: "Empresa Eliminada",
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

    getEmpresas,
    getEmpresa,
    crearEmpresa,
    actualizarEmpresa,
    borrarEmpresa,

  /*  crearHospital,
    actualizarHospital,
    borrarHospital,*/

}