
const mongoose = require("mongoose");


const citaEsquema = mongoose.Schema({
    fechaHora:{
        type: Date,
        default: Date.now
    },
    idUsuario: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true

    },
    estadoCita: {
        type: String,
        enum: ['pendiente', 'completada','cancelada'],
        default: 'pendiente'
    }
});

module.exports = mongoose.model('Citas',citaEsquema);