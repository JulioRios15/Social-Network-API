import { Request, Response } from "express";
import logger from "../utils/logger";
import {
    CreateUserInput, 
    DeleteUserInput, 
    ReadUserInput, 
    UpdateUserInput
} from '../schema/user.schema'
import {FriendInput} from '../schema/friend.schema'
import * as userService from '../services/user.service';

export async function createUserHandler(
    req: Request<{}, {}, CreateUserInput["body"]>,
    res: Response
    ) {

    try {

        const user = await userService.createUser(req.body);
        return res.json(user);
        
    } catch (error: any) {
        logger.error(error);
        return res.status(409).json(error.message);
    }
} 

export async function getUserAllUsersHandler(req: Request, res: Response) {
    try {
        const users = await userService.findUsers({}, "friends");
        return res.json(users);
        
    } catch (error: any) {
        logger.error(error);
        return res.status(409).json(error.message);
    }
} 

export async function getUserByIdHandler(
    req: Request<ReadUserInput["params"]>,
    res: Response
    ) {
    const userId = req.params.userId;

    try {
        const user = await userService.findUser({_id: userId}, "friends thoughts");
        return res.json(user);
        
    } catch (error: any) {
        logger.error(error);
        return res.status(409).json(error.message);
    }
} 

export async function updateUserByIdHandler(
    req: Request<UpdateUserInput["params"]>,
    res: Response
) {
    const userId = req.params.userId;
    const update = req.body;

    const user = await userService.findUser({_id: userId});

    if(!user){
        res.sendStatus(404);
    }

    const updatedUser = await userService.updateUser({_id: userId}, update, {new: true});
    return res.json(updatedUser);     
}

export async function deleteUserByIdHandler(    
    req: Request<DeleteUserInput["params"]>,
    res: Response
    ) {
    
        const userId = req.params.userId;

        const user = await userService.findUser({_id: userId});

        if(!user){
            return res.sendStatus(404);
        }

        const deletedUser = await userService.deleteUser({_id: userId});
        return res.json(deletedUser);
        
}

export async function addUserFriendHandler(
    req: Request<FriendInput["params"]>,
    res: Response
){
    const {userId, friendId} = req.params;

    const user = await userService.findUser({_id: userId}).catch((e) => false);
    const friend = await userService.findUser({_id: friendId}).catch((e) => false);

    if(!user || !friend){
        return res.sendStatus(404);
    }

    await userService.updateUser({_id: userId},{
        $addToSet: {friends: friendId}
    });   

    return res.json(friend);
}

export async function deleteUserFriendHandler(
    req: Request<FriendInput["params"]>,
    res: Response
){
    const {userId, friendId} = req.params;

    const user = await userService.findUser({_id: userId}).catch((e) => false);
    const friend = await userService.findUser({_id: friendId}).catch((e) => false);

    if(!user || !friend){
        return res.sendStatus(404);
    }

    const removedFriend = await userService.updateUser(
        {_id: userId},
        {$pull: {friends: friendId}}
        );   

    return res.json(removedFriend);
}

