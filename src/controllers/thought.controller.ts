import { Request, Response } from "express";
import logger from "../utils/logger";
import {
    CreateThoughtInput, 
    ReadThoughtInput,
    UpdateThoughtInput,
    DeleteThoughtInput
} from '../schema/thought.schema';
import * as thoughtService from '../services/thought.service';

export async function createThoughtHandler(
    req: Request<{}, {}, CreateThoughtInput["body"]>,
    res: Response
) {

    try {
        const thought = await thoughtService.createThought(req.body);
        return res.json(thought);

    } catch (error: any) {
        logger.error(error);
        return res.status(409).json(error.message);
    }

}

export async function getAllToughtsHandler(req: Request, res: Response){
    try {
        const thoughts = await thoughtService.findThoughts({}, "reactions");
        return res.json(thoughts);
        
    } catch (error: any) {
        logger.error(error);
        return res.status(409).json(error.message);
    }
}

export async function getThoughtByIdHandler (
    req: Request<ReadThoughtInput["params"]>,
    res: Response
){
    const thoughtId = req.params.thoughtId;
    try {
        const thought = await thoughtService.findThought({_id: thoughtId}, "reactions");
        return res.json(thought); 
        
    } catch (error: any) {
        logger.error(error);
        return res.status(409).json(error.message);
    }
}

export async function updateThoughtByIdHandler(
    req: Request<UpdateThoughtInput["params"]>,
    res: Response
){
    const thoughtId = req.params.thoughtId;
    const update = req.body;

    try {

        const thought = await thoughtService.findThought({_id: thoughtId}).catch((e) => false);

        if(!thought) res.sendStatus(404);

        const updatedThought = await thoughtService.updateThought({_id: thoughtId}, update, {new: true}).catch((e) => false)
        
        if(!updatedThought) res.sendStatus(400);

        return res.json(updatedThought);

    } catch (error: any) {
        logger.error(error);
        return res.status(409).json(error.message);
    }
}

export async function deleteThoughtByIdHandler(
    req: Request<DeleteThoughtInput["params"]>,
    res: Response
){
    const thoughtId = req.params.thoughtId;

    try {

        const thought = await thoughtService.findThought({_id: thoughtId}).catch((e) => false);

        if(!thought) return res.sendStatus(404);
        
        const deletedThought = await thoughtService.deleteThought({_id: thoughtId}).catch((e) => false);

        if(!deletedThought) return res.sendStatus(400);

        return res.json(deletedThought);
        
    } catch (error: any) {
        logger.error(error);
        return res.status(409).json(error.message);
    }
}
