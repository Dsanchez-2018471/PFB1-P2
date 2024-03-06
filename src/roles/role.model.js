import mongoose from "mongoose";

const RoleShema = mongoose.Schema({
    role:{
        type:String,
        required:[true,"Please provide a role"]
    }
});

export default mongoose.model('Role', RoleShema);