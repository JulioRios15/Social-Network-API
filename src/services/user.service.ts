import { FilterQuery, UpdateQuery } from "mongoose";
import { omit } from "lodash";
import UserModel, { UserDocument, UserInput } from "../models/user.model";

export async function createUser(input: UserInput){
    try {       
        const user = await UserModel.create(input);
        return user;

    } catch (e: any) {
        throw new Error(e);
    }
}

export async function validatePassword({
    email, 
    password
}: {
    email: string, 
    password: string
}){
    const user = await UserModel.findOne({email});

    if(!user) return false;
    
    const validPassword = await user.comparePassword(password);

    if(!validPassword) return false;

    return omit(user.toObject(), "password");
}

export async function findUser(query: FilterQuery<UserDocument>){
    return UserModel.findOne(query).lean();
}

export async function findUsers(query: FilterQuery<UserDocument>){
    return UserModel.find(query).lean();
}

export async function updateUser( 
    query: FilterQuery<UserDocument>,
    update: UpdateQuery<UserDocument>
) {
    return UserModel.updateOne(query, update);
}

export async function deleteUser(query: FilterQuery<UserDocument>){
    return await UserModel.deleteOne(query);
}

export async function deleteAllUsers(){
    return await UserModel.deleteMany({});
}