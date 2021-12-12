import express from 'express';
import * as thoughtController from '../controllers/thought.controller';
import validateResource from "../middlewares/validateResource";
import {
    createThoughtSchema,
    deleteThoughtSchema,
    getThoughtSchema,
    updateThoughtSchema
} from '../schema/thought.schema';
import {createReactionSchema, deleteReactionSchema} from '../schema/reaction.schema'

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

//Update thought
router.put(
    "/:thoughtId",
    validateResource(updateThoughtSchema),
    thoughtController.updateThoughtByIdHandler
);

//Delete thought
router.delete(
    "/:thoughtId",
    validateResource(deleteThoughtSchema),
    thoughtController.deleteThoughtByIdHandler
);

//Create thought reaction
router.post(
    "/:thoughtId/reactions",
    validateResource(createReactionSchema),
    thoughtController.createReactionHandler
);

//Create thought reaction
router.delete(
    "/:thoughtId/reactions/:reactionId",
    validateResource(deleteReactionSchema),
    thoughtController.deleteReactionHandler
);

export = router;