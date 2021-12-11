import { connectToMongo } from "../database/connection";
import {seedUsers} from './user.seeds';

function endConnection(){
    return process.exit(0);
}

async function initializeSeeds() {
    await connectToMongo();

    await seedUsers();

    endConnection();
}

initializeSeeds();