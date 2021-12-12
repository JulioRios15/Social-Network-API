import {findUsers} from '../services/user.service';
import {addReaction, findThoughts} from '../services/thought.service'
import faker from 'faker';
import logger from '../utils/logger';
import {randNum} from '../utils/rand';

export async function seedReactions(numOfReactions: number = 100){
    const users = await findUsers({});
    const userLength = users.length;

    const thoughts = await findThoughts({});
    const thoughtLength = thoughts.length;

    for (let i = 0; i < numOfReactions; i++) {

        const randUserIndex = randNum(userLength);
        const randThoughtIndex = randNum(thoughtLength);
        const reactionBodyWordsNum = randNum(15);

        //ReactionData
        const reactionBody = faker.lorem.words(reactionBodyWordsNum + 1);
        const username = users[randUserIndex].username;
        const thoughtId = thoughts[randThoughtIndex]._id;

        const newReaction = await addReaction(thoughtId, {reactionBody, username});

        if(!newReaction){
            logger.warn(newReaction, "Unable to seed thoughts");
            process.exit(1);
        }

        logger.info({reactionBody, username}, "New Reaction");
        
    }


}