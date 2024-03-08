const {Schema, model} = require('mongoose');

const RoleSchema = Schema ({
    nombreC:{
        type: String,  
        required: [true, 'Nombre es requerido']
    },
    descripcionC:{
        type:String,
        require: [true, 'Describir la categoria']
    }


});

module.exports = model ('Role', RoleSchema);