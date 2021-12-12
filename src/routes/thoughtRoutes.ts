import express from 'express';
import * as thoughtController from '../controllers/thought.controller';
import validateResource from "../middlewares/validateResource";
import {
    createThoughtSchema,
    deleteThoughtSchema,
    getThoughtSchema,
    updateThoughtSchema
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
    "/:thoughtId",
    validateResource(getThoughtSchema),
    thoughtController.getThoughtByIdHandler
);

router.put(
    "/:thoughtId",
    validateResource(updateThoughtSchema),
    thoughtController.updateThoughtByIdHandler
);

router.delete(
    "/:thoughtId",
    validateResource(deleteThoughtSchema),
    thoughtController.deleteThoughtByIdHandler
);


export = router;