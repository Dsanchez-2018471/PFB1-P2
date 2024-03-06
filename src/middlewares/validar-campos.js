import { validationResult } from "express-validator";

export const validarCampos = (req, res, next) => {
    const erro = validationResult(req);
    if(!erro.isEmpty()){
        return res.status(400).json(error);
    }
}