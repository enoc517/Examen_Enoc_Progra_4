const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const usuarioEsquema = mongoose.Schema({
    nombre:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required: true
    },
    contrasena: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        enum: ['administrador', 'usuario'],
        default: 'usuario'
    },
    fechaRegistro: {
        type: Date,
        default: Date.now
    }
});

// Antes de guardar el usuario, cifra la contraseña
usuarioEsquema.pre('save', async function(next) {
    try {
        if (!this.isModified('contrasena')) {
            return next();
        }
        const hashedPassword = await bcrypt.hash(this.contrasena, 10);
        this.contrasena = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

// Generar un token JWT
usuarioEsquema.methods.generarToken = function() {
    return jwt.sign({ usuarioId: this._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports = mongoose.model('Usuario', usuarioEsquema);
