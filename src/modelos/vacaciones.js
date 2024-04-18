const mongoose = require("mongoose");


const vacacionesEsquema = mongoose.Schema({
    idUsuario: {
        type: String,
        required: true
    },
    fechaInicio:{
        type: Date,
        default: Date.now,
        require:true
    },
    fechaFin:{
        type: Date,
        require:true
    },
    estadoVacaciones: {
        type: String,
        enum: ['aprobado', 'pendiente','rechazado'],
        default: 'pendiente'
    },
    Comentarios: {
        type: String
    }
});

module.exports = mongoose.model('Vacaciones',vacacionesEsquema);