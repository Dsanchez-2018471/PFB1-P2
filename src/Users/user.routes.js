import { Router } from 'express';
import { check } from 'express-validator';
import {
    userPost
} from './user.controller.js';

import {
    existMail,
    isValidRole,
    existsUser

} from '../helpers/db-validators.js';
import { validarCampos } from '../middlewares/validar-campos.js';

