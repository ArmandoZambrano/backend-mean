
const { Schema, model } = require("mongoose");

const HospitalSchema = Schema({

    nombre: {
        type: String,
        required: true, 
        unique: true

    },
    
    img: {
        type: String
    },

    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },

    direccion: {
        calle: {
            type: String,
            required: true
        },
        numeroExterior: {
            type: String,
            required: true
        },
        numeroInterior:{
            type: String
        },
        colonia:{
            type: String
        },
        ciudad:{
            type: String
        },
        estado:{
            type: String
        }, 
        pais: {
            type:String
        },
        codigoPostal: {
           type: String
       }
    },

    numeroConsultorios : {
        type: Number
    },

    numeroCamas: {
        type: Number
    },

    telefono:{
        type: String
    },

    createAt: { 
        type: Date, 
        default: Date.now 
    },

    updateAt: {
        type: Date
    }




},
{
    collection: 'hospitales'
});

HospitalSchema.method('toJSON', function() {
    const {__v, ...object} = this.toObject();
    
    return object;
})

module.exports = model('Hospital', HospitalSchema);

