import express, { Request, Response } from 'express';
import * as userController from '../controllers/user.controller';
import validateResource from "../middlewares/validateResource";
import {
    createUserSchema, 
    updateUserSchema, 
    getUserSchema, 
    deleteUserSchema,
    userFriendSchema
} from '../schema/user.schema';

const router = express.Router();

//Get All Users
router.get("/", userController.getUserAllUsersHandler);

//get user by id with thought and friends data
router.get(
    "/:userId", 
    validateResource(getUserSchema),
    userController.getUserByIdHandler
);

//Create new user
router.post(
    "/", 
    validateResource(createUserSchema),
    userController.createUserHandler
    );

//update user
router.put(
    "/:userId",
    validateResource(updateUserSchema),
    userController.updateUserByIdHandler
    );

//Remove user
router.delete(
    "/:userId",
    validateResource(deleteUserSchema),
    userController.deleteUserByIdHandler
    );

//Add new friend to user
router.post(
    "/:userId/friends/:friendId",
    validateResource(userFriendSchema),
    userController.addUserFriendHandler,
    );

//Remove user friend
router.delete(
    "/:userId/friends/:friendId", 
    validateResource(userFriendSchema),
    userController.deleteUserFriendHandler
    );

export = router;