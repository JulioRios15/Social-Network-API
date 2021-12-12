import {findUsers, addFriend} from '../services/user.service';
import { randNum } from '../utils/rand';
import logger from '../utils/logger';


export async function seedFriends(){
    const users = await findUsers({});
    const userLength = users.length;

    //For each user
    for (let i = 0; i < userLength; i++) {
        const userId = users[i]._id;
        const friendLength = randNum(5) + 2;
        
        //For each random friends length
        for (let b = 0; b < friendLength; b++) {
            const randFriendId = users[randNum(userLength)]._id;

            if(userId === randFriendId) continue;

            const newFriend = await addFriend(userId, randFriendId);

            if(!newFriend){
                logger.warn(newFriend, "Unable to seed friends");
                process.exit(1);
            }
        }
    }
}