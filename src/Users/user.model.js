import mongoose from "mongoose";

const UserShema = mongoose.Shema({
    name: {
        type: String,
        required: [true, 'name is required']
    },

    mail: {
        type: String,
        required: [true, 'mail is required']
    },

    password: {
        type: String,
        required: [true, 'password is required'],
    },

    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },

    estado: {
        type: Boolean,
        default: true
    }
});

UserShema.methods.toJSON = function(){
    const { __v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}

export default mongoose.model('User', UserShema);