import Role from '../roles/role.model.js';
import User from '../Users/user.model.js';

export const isValiRole = async (role = '') => {
    const existsRol = await Role.findOne({ role });
    if (!existsRol) {
        throw new Error(`The ${role} role does not exist`);
    }
}

export const existMail = async (mail = '') => {
    const existMail = await User.findOne({ mail });
    if (existMail) {
        throw new Error(`the mail ${mail} has already been registered`)
    }
}

export const existUserById = async (id = '') => {
    const existUser = await User.findById(id);
    if(!existUser){
        throw new Error(`The user with id:${id}, doesn't exist in the database`);
    }
}