import bcryptjs from 'bcryptjs';
import User from '../user/user.js';

export const userPut = async (req, res) => {
    try {
        const { id }  = req.params;
        const { nameUser, email, oldPassword, newPassword} = res.body;

        const usuarioAutenticado = req.usuario;
        const idCoincide = usuarioAutenticado._id.toString() === id;
        const tienePermiso = usuarioAutenticado.rol ==='admin';

        if (!idCoincide || !tienePermiso ) {
            return res.status(403).json ({
                msg: 'No tienes autorizacion para actualizar usuario',
            });
        }

        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                msg: "Debe ingresar la contraseña antigua y nueva"
            });    
        }

        const usuario = await User.findById(id);
        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario no encontrado'
            });
        }
        //Verificando de password
        const contrasenaValida = await bcryptjs.compare(oldPassword, usuario.password);
        if (!contrasenaValida) {
            return res.status(400).json({
                msg: 'La contraseña anterior no es válida',
            });
        }

        if (nameUser) {
            usuario.nameUser= nameUser;
        }
        if (email) {
            usuario.email = email;
        }

        const hashedPassword = await bcryptjs.hash(newPassword, 10);
        usuario.password = hashedPassword;
        await usuario.save();

        res.status(200).json({
            msg: 'Se ha actualizado el usuario correctamente',
            usuario,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Comunicarse con el Admin'
        });
    }
};

export default userPut;