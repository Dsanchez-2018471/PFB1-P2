import bcryptjs from 'bcryptjs';
import User from '../user/user.js';

export const userPutAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const { nameUser, email, password, role, estado } = req.body;

        const usuarioAutenticado = req.usuario;
        const tienePermisoAdmin = usuarioAutenticado.role === 'ADMIN_ROLE';

        if (!tienePermisoAdmin) {
            return res.status(403).json({
                msg: 'No estas autorizado para realizar esta accion',
            });
        }

        const usuario = await User.findById(id);
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario no encontrado',
            });
        }

        if (nameUser) {
            usuario.nameUser = nameUser;
        }
        if (email) {
            usuario.email = email;
        }
        if (password) {
            const hashedPassword = await bcryptjs.hash(password, 10); // Nueva contraseña
            usuario.password = hashedPassword;
            console.log(`La contraseña se actualizo para el usuario con ID ${id}`);
        }
        if (role) {
            usuario.role = role; 
        }
        if (estado !== undefined) { 
            usuario.estado = estado;
        }
        // Guardar los cambios en la base de datos
        await usuario.save(); 

        res.status(200).json({
            msg: 'Se realizo la actualizacion correctamente',
            usuario,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Comunicarse con el administrador',
        });
    }
};

export const userPutClient = async (req, res) => {
    try {
        const { id } = req.params;
        const {nameUser, oldPassword, newPassword} = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                msg: 'Ingresar la contraseña anterior y la nueva para actualizar',
            });
        }

        const usuario = await User.findById(id);
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario no encontrado',
            });
        }

        const contrasenaValida = await bcryptjs.compare(oldPassword, usuario.password);
        if (!contrasenaValida) {
            return res.status(400).json({
                msg: 'La contraseña anterior no es válida',
            });
        }

        if (nameUser) {
            usuario.nameUser = nameUser;
        }

        const hashedPassword = await bcryptjs.hash(newPassword, 10);
        usuario.password = hashedPassword;
        await usuario.save();

        res.status(200).json({
            msg: 'Se actualizó el perfil correctamente',
            usuario,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await User.findById(id);

        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario no existe'
            });
        }
        const usuarioAutenticado = req.usuario;
        if (usuarioAutenticado.role !== 'ADMIN_ROLE') {
            return res.status(403).json({
                msg: 'Unicamente los administradores estan autorizados para eliminar perfiles'
            });
        }
        usuario.estado = false;
        await usuario.save();

        res.status(200).json({
            msg: 'Se elimino el perfil',
            usuario
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al eliminar el usuario',
        });
    }
};



