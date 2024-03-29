import jwt from 'jsonwebtoken';
import Usuario from '../user/user.js';

export const validarJWT = async (req, res, next) => {
    const token = req.header("x-auth-token");
    // Verificando si el token está vacío o no existe
    if (!token) {
        return res.status(401).json({
            msg: "No hay un Token proporcionado",
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const usuario = await Usuario.findById(uid);
        if (!usuario) {
            return res.status(401).json({
                msg: "El usuario con este token no existe",
            });
        }
        if (!usuario.estado) {
            return res.status(401).json({
                msg: "Este usuario se encuentra inactivo",
            });
        }
        req.usuario = usuario;
        next();
    } catch (error) {
        console.log(error),
            res.status(401).json({
                msg: "Token inválido"
            });
    }
};
