import {createUser, deleteAllUsers} from '../services/user.service';
import faker from 'faker';
import logger from '../utils/logger';

export async function seedUsers(numOfUsers: number = 15) {

    await deleteAllUsers();

    for (let i = 0; i < numOfUsers; i++) {
        const newUser = await createUser(generateUserData());

        if(!newUser){
            logger.warn(newUser, "Unable to seed users");
            process.exit(1);
        }

        logger.info(newUser.toJSON(), "New User");
    }

    logger.info("Users Seeded");
}

function generateUserData(){

    const userInfo: Faker.Card = faker.helpers.createCard();
    const email = userInfo.email;
    const username = userInfo.username;

    return {
        email,
        username,
        password: "123456789"
    }
}
