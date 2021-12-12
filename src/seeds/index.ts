import { connectToMongo } from "../database/connection";
import {seedUsers} from './user.seeds';
import {seedthoughts} from './thought.seeds';
import {seedReactions} from './reaction.seeds';

function endConnection(){
    return process.exit(0);
}

async function initializeSeeds() {
    await connectToMongo();

    await seedUsers(20);

    await seedthoughts(50);

    await seedReactions(200);

}

initializeSeeds().then(() => endConnection())