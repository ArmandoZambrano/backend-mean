
const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        required: true

    },

    apellidoPaterno: {
        type: String,
        required: true
    },

    apellidoMaterno: {
        type: String
    },

    email: {
        type: String,
        unique: true,
        required: true,
         
    },

    password: {
        type: String,
        required: true
    },

    img: {
        type: String
    },

    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },

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
    },

    empresas:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Usuario'

        }
    ],

    activo: {
        type: Boolean
    }




});

UsuarioSchema.method('toJSON', function() {
    const {__v, _id, password, ...object} = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Usuario', UsuarioSchema);

