import { Request, Response } from "express";
import logger from "../utils/logger";
import {
    CreateThoughtInput, 
    ReadThoughtInput
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
