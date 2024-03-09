import User from '../user/user.js';
import bcryptjs from 'bcryptjs';
import { generarJWT } from '../helpers/generar-jwt.js';

export const registrarse = async (req, res) => {
    const { nameUser, email, password, role } = req.body;
    const usuario = new User({ nameUser, email, password, role })

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();
    res.status(200).json({
        usuario
    });
}

export const login = async (req, res) => {

    const { email, password } = req.body;

    try {

        const usuario = await User.findOne({ email });


        if (!usuario) {
            return res.status(400).json({
                msg: "El correo electronico es incorrectos."
            });
        }

        // Muestra el mensaje de no encontrar el usuario
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Este usuario es inexistente'
            });
        }
        // Comprobamos la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'La contrasena es incorrecta'
            });
        }


        const token = await generarJWT(usuario.id);
        

        res.status(200).json({
            msg: 'Secion iniciada',
            usuario,
            token
        });


    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({
            msg: 'Error, comunicarse con admin'
        });
    }
}
