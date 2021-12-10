import express from "express";
import dotenv from 'dotenv';
import config from 'config';
import logger from "./utils/logger";

dotenv.config();

const app = express();
const port = config.get('port');

//Middlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.listen(port, async () => {
    logger.info(`app running at: http://localhost:${port}`); 
});