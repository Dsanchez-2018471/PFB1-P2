import { Request, request, response } from "express";
import User from '../models/User';

export const tieneRole = (...roles) => {
    return async (req = request, res = response, next) => {
        if(!req.usuario) {
            return res.status(500).json({
                msg:  "No hay un usuario autenticado"
            });
        }


        if (!roles.includes(req.usuario.role)) {
            return res.status(401).json({
                msg: `Este rol no pertenece al siguiente usuario: ${roles}`,
            });
        }

        next();
    };
};

// Comprueba si el token es correcto y devuelve el usuario