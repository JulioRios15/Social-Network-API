import {createUser, deleteAllUsers} from '../services/user.service';
import {uniqueNamesGenerator, names, adjectives, colors, animals } from 'unique-names-generator'
import logger from '../utils/logger';

export async function seedUsers() {
    const count = 15;

    await deleteAllUsers();

    for (let i = 0; i < count + 1; i++) {
        const newUser = await createUser(generateUserData());

        if(!newUser){
            logger.warn(newUser, "Unable to seed users");
            process.exit(1);
        }
    }

    logger.info("Users Seeded");
}

function generateUserData(){
    const firstName = generateName();
    const lastName = generateName();
    const email = `${firstName}.${lastName}@gmail.com`;
    const username = `${firstName}_The_${generateUsername()}`;

    return {
        email,
        username,
        password: "123456789"
    }
}

function generateName(): string{
    return uniqueNamesGenerator({dictionaries: [names]});
}

function generateUsername(): string {
    return uniqueNamesGenerator({dictionaries: [colors, adjectives, animals]})
}
