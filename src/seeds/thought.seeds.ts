import {deleteAllThoughts, createThought} from '../services/thought.service'
import {findUsers} from '../services/user.service'
import logger from '../utils/logger';
import {randNum} from '../utils/rand';
import faker from 'faker';

export async function seedthoughts(numOfThoughts: number = 25) {

    await deleteAllThoughts();

    const users = await findUsers({});
    const userLength = users.length;

    for (let i = 0; i < numOfThoughts; i++) {
        const randUserIndex = randNum(userLength);
        const thoughtWordsNum = randNum(8);

        //Thought Data
        const thoughtText = faker.lorem.words(thoughtWordsNum + 1);
        const username = users[randUserIndex].username;

        const newThought = await createThought({thoughtText, username});

        if(!newThought){
            logger.warn(newThought, "Unable to seed thoughts");
            process.exit(1);
        }

        logger.info(newThought.toJSON(), "New Thought");
    }

    logger.info("Thought Seeded");
} 