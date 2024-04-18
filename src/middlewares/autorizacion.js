const jwt = require('jsonwebtoken');

function protegerRuta(req, res, next) {
    // Obtener el token JWT del encabezado de autorización
    const Atoken = req.headers['authorization'];
    // Verificar si el token existe
    if (!Atoken) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }
const token = Atoken.split(' ')[1];

    // Verificar y decodificar el token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log("Token decodificado:", JSON.stringify(decoded));
            return res.status(401).json({ message: err });
        }

        // Guardar el ID del usuario decodificado en el objeto de solicitud
        req.usuarioId = decoded.usuarioId;
        next();
    });
}

module.exports = { protegerRuta };
