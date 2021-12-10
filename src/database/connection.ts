import mongoose from 'mongoose';
import config from 'config';
import logger from '../utils/logger';

export async function connectToMongo(){
    try {
        // db string can be undefined
        const dbUrl: string = config.get('dbUrl');
        await mongoose.connect(dbUrl);
        logger.info(`connected to mongo at url: ${dbUrl}`);
        
    } catch (error) {
        logger.warn(error, "Error connection to database")
        process.exit(1);
    }
}
