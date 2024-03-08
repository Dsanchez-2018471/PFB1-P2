import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    titulo: {
        type:  String,
        required: [true, 'El título es obligatorio']
    },
    categoria: {
        type: String,
        required: [true, 'La categoría es obligatoria'],
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    estado: {
        type: Boolean,
        default: true
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
    comment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});
postSchema.methods.toJSON = function (){
    const { __v, _id, ...post } = this.toObject();
    post.id = createAt;
    return post;
}

export default mongoose.model('Post', postSchema);