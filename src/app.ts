import express from "express";
import dotenv from 'dotenv';
import config from 'config';
import logger from "./utils/logger";
import { connectToMongo } from "./database/connection";
import routes from './routes';

dotenv.config();

const app = express();
const port = config.get('port');

//Middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.listen(port, async () => {
    logger.info(`app running at: http://localhost:${port}`); 

    await connectToMongo();
    
    routes(app);
});