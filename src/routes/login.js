// routes/auth.js

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../modelos/usuario');

const router = express.Router();

router.post('/login', async (req, res) => {
    const { nombre, contrasena } = req.body;

    try {
        // Buscar el usuario en la base de datos
        const usuario = await Usuario.findOne({ nombre });

        // Verificar si el usuario existe y la contraseña es válida
        if (!usuario || !(await bcrypt.compare(contrasena, usuario.contrasena))) {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

        // Generar un token JWT con el ID del usuario
        const token = jwt.sign({ usuarioId: usuario.id }, process.env.JWT_SECRET, { expiresIn: '7h' });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

module.exports = router;
