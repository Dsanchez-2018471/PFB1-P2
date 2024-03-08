const { Schema, model} = require('mongoose');

const UsuarioSchema = Schema ({
    usuarioF: {
        type: String,  
        required: [true, 'Usuario Obligatorio']
    },
    productoF: {
        type: String,
        required: [true,  'Producto es obligatorio'] 
    },
    fecha: {
        type: String,
        required: [true, 'Fecha es requerida'],
    },
    descipcionF: {
        type: String,
        required: [true, 'Descripcion obligatoria']
    }    
});

UsuarioSchema.methods.toJSON = function(){
    const { __v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model("Usuarios", UsuarioSchema);