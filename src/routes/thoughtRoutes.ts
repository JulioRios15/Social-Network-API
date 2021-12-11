import express from 'express';
import * as thoughtController from '../controllers/thought.controller';
import validateResource from "../middlewares/validateResource";
import {
    createThoughtSchema,
    getThoughtSchema
} from '../schema/thought.schema';

const router = express.Router();

//API endpoint "api/thoughts"

// Create new Thought
router.post(
    "/", 
    validateResource(createThoughtSchema),
    thoughtController.createThoughtHandler
    );

//Get all thoughts
router.get(
    "/",
    thoughtController.getAllToughtsHandler
    );

//Get thought by id
router.get(
    "/",
    validateResource(getThoughtSchema),
    thoughtController.getThoughtByIdHandler
    )



export = router;