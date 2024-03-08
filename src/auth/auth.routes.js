import { Router } from "express";
import { check } from "express-validator";
import { login, registrarse } from '../auth/auth.controller.js';
import { validarCampos } from "../middlewares/validar-campos";
import { existMail } from "../helpers/db-validators";

const router = Router();

router.post(
    '/registrarse', 
    [
        check('nameUser', 'Nombre requerido').not().isEmpty(),
        check('password', 'Su contraseña debe contener al menos 6 digitos').isLength({ min: 6 }),
        check('email', 'Correo electronico invalido').isEmail(),
        check('email').custom(existenteEmail),
        validarCampos
    ],
    registrarse
);

router.post(
    '/login',
    [
        check('email', 'Este correo no es valido').isEmail(),
        check('password', 'Por favor ingresar contraseña').not().isEmpty(),
        validarCampos
    ],
    login
);

export default router;
