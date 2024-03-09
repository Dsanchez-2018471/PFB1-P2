import mongoose from 'mongoose';

const CategoriaSchema = new mongoose.Schema({
    nombreCat:{
        type: String,  
        required: [true, 'Nombre es requerido']
    },
    descripcionC:{
        type:String,
        require: [true, 'Describir la categoria']
    },
    estado: {
        type: Boolean,
        default: true
    }


});

export default mongoose.model ('Categoria', CategoriaSchema);
