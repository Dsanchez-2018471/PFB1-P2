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
    state: {
        type: Boolean,
        default: true
    }
});

export default mongoose.model('User', UserShema);