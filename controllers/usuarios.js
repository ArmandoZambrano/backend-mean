

const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');



const getUsuarios = async( request, response ) => {

    const usuarios = await Usuario.find({}, 'nombre email role google createAt updateAt');

    response.json({
        ok:true,
        usuarios
    })

}

const crearUsuario = async( request, response ) => {

    //recibir los parametros y deestructuramos los datos recibidos
    const { email, password, nombre } = request.body;
     
    try{

        const usuario = new Usuario( request.body );
   
        const existeEmail = await Usuario.findOne({email})
        if( existeEmail ){
            return response.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado',
            });
        }

        //encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password , salt);


        //generar el insert
        await usuario.save();

        if (!usuario)
        {
            return response.status(400).json({
                ok:false,
                msg: "No se creo el usuario"
            });
        }else
        {
            const token = await generarJWT(usuario.id);
            
            if(!token){
                return response.status(400).json({
                    ok:false,
                    msg: "No se pudo generar el token"
                });
            }else{
                 //devolver la respuesta
        return response.json({
            ok:true,
            msg: "Usuario Creado",
            usuario,
            token 
        });
            }

        }
        
       
    }catch (error){
        
        return response.status(500).json({
            ok: false,
            msg: 'Error al generar la peticion',
            error
        });

    }



   
}

const actualizarUsuario = async( request, response ) => {

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


const borrarUsuario = async( request, response ) => {

        
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

    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario,

}