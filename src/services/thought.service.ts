import { FilterQuery, UpdateQuery, QueryOptions } from "mongoose";
import {updateUser} from './user.service';
import ThoughtModel, { ThoughtDocument, UserInput } from "../models/thought.model";

export async function createThought(input: UserInput){
    try {       
        const thought = await ThoughtModel.create(input);

        const updatedUser = await updateUser(
            {username: thought.username},
            {$addToSet: {thoughts: thought._id}}
            ).catch((e) => false);

        return thought;

    } catch (e: any) {
        throw new Error(e);
    }
}

export async function findThought(query: FilterQuery<ThoughtDocument>, populatePath: string = ""){
    return ThoughtModel.findOne(query).populate(populatePath).lean();
}

export async function findThoughts(query: FilterQuery<ThoughtDocument>, populatePath: string = ""){
    return ThoughtModel.find(query).populate(populatePath).lean();
}

export async function updateThought( 
    query: FilterQuery<ThoughtDocument>,
    update: UpdateQuery<ThoughtDocument>,
    options: QueryOptions = {}
) {
    return ThoughtModel.updateOne(query, update, options);
}

export async function deleteThought(query: FilterQuery<ThoughtDocument>){
    return await ThoughtModel.deleteOne(query);
}

export async function deleteAllThoughts(){
    return await ThoughtModel.deleteMany({});
}

export async function deleteUserThoughts(username: string){
    return await ThoughtModel.deleteMany({username});
}