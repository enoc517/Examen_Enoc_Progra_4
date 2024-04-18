// authMiddleware.js

const jwt = require('jsonwebtoken');
const Usuario = require('./modelos/Usuario');

async function protegerRuta(req, res, next) {
    // Obtener el token JWT del encabezado de autorización
    const token = req.headers.authorization;

    // Verificar si el token existe
    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    // Verificar y decodificar el token
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        try {
            // Buscar al usuario en la base de datos
            const usuario = await Usuario.findById(decoded.usuarioId);

            if (!usuario) {
                return res.status(401).json({ message: 'Usuario no encontrado' });
            }

            // Guardar el usuario decodificado en el objeto de solicitud
            req.usuario = usuario;
            next();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    });
}

module.exports = { protegerRuta };

