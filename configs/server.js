'use strict'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { dbConnection } from './mongo.js';
import userRoutes from '../src/user/user.routes.js';
import authRoutes from '../src/auth/auth.routes.js';
import categoriasRoutes from '../src/categorias/categoria.routes.js'
import ProductoRoutes from '../src/productos/producto.routes.js';


class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuarioPath = '/api/v1/users'
        this.authPath = '/api/v1/auth'
        this.categoriaPath = '/api/v1/categoria'
        this.productPath = '/finalAPI/v1/productos';
    

        this.middlewares();
        this.conectarDB();
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    routes(){
        this.app.use(this.usuarioPath, userRoutes);
        this.app.use(this.authPath, authRoutes);
        this.app.use(this.categoriaPath, categoriasRoutes);
        this.app.use(this.productPath, ProductoRoutes);
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('El servidor esta en linea', this.port);
        });
    }
}

export default Server;