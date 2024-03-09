import User from '../user/user.js';

export const validarRol = async (req, res, next) => {
    const { ...resto } = req.body;

    try {

        let idUsuario = resto.idUsuario;

        

        const usuario = await User.findById(idUsuario);
        console.log(usuario.role);

        if (!usuario){
            return res.status(404).json({ mensaje: 'Usuario inexistente' });
        }

        if(usuario.role != 'Admin_role') {
            return res.status(403).json({ mensaje: 'No estas autorizado para realizar esta accion'});
        }

        next();

    } catch (error) {
        console.error('Error no se podra realizar la busqueda del usuario', error);
        return res.status(500).json({mensaje:'Error en el servidor'});
    }
}