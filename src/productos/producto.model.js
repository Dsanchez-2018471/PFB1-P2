const {Schema, model} = require('mongoose');
// import mongoose from 'mongoose';
const RoleSchema = Schema ({
    nombreP: {
        type:String,
        require: [true, 'El Nombre es obligatorio para el producto']  
    },

    precioP: {
        type:String,
        require: [true,'el Precio del Producto es Obligatorio'] 
    },

    estadoP: {
        type: String,
        enum: ['Disponible', 'No Disponible'],
        default:'Disponible'
    },
    catalogoP:{
        type: String,
        require: [ true, 'La Categoria es requerida']
    }
});

module.exports = model ('Role', RoleSchema); //exportar la