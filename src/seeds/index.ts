import { connectToMongo } from "../database/connection";
import {seedUsers} from './user.seeds';
import { seedFriends } from "./friend.seeds";
import {seedthoughts} from './thought.seeds';
import {seedReactions} from './reaction.seeds';


function endConnection(){
    return process.exit(0);
}

async function initializeSeeds() {
    await connectToMongo();

    await seedUsers(30);

    await seedFriends();

    await seedthoughts(100);

    await seedReactions(1000);

}

initializeSeeds().then(() => endConnection());