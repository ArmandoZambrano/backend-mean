
const { Schema, model } = require("mongoose");

const MedicoSchema = Schema({

    nombre: {
        type: String,
        required: true

    },
    
    apellidoPaterno: {
        type: String,
        required: true

    },

    apellidoMaterno: {
        type: String,
        required: true

    },

    fechaNacimiento: {
        type: Date,
        required: true

    },

    email: {
        type: String,
        unique: true,
        required: true,
         
    },
    
    usuario: {
        type: String,
        unique: true,
        required: true,
         
    },
    
    password: {
        type: String,
        required: true
    },
    
    lugarNacimiento:{
        type: String
    },

    celular:{
        type: String,
        required: true
    },

    telefonoCasa:{
        type: String
        
    },

    resumenPerfil:{
        type: String
    },

    tipoColaborador: {
        
            type: Schema.Types.ObjectId,
            ref: 'Puesto'
    },

    img: {
        type: String
    },

    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },

    hospitales:[ 
        {
            type: Schema.Types.ObjectId,
            ref: 'Hospital'
        }
    ],
    

    google: {
        type: Boolean,
        default: false
    },

    createAt: { 
        type: Date, 
        default: Date.now 
    },


    updateAt: {
        type: Date
    }




});

MedicoSchema.method('toJSON', function() {
    const {__v, _id, password, ...object} = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Medico', MedicoSchema);

