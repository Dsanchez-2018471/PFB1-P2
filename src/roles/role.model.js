import mongoose from "mongoose";

const RoleShema = mongoose.Schema({
    role:{
        type:String,
        required:[true,"Por favor su role es obligatorio"]
    }
});

export default mongoose.model('Role', RoleShema);