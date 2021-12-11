import { Application, Request, Response } from "express";
import userRoutes from './userRoutes';

export default (app: Application) => {

    // Api Routes
    app.use("/api/users", userRoutes);

    // Any other route
    app.all('*', (req: Request, res: Response) => res.status(404).json({message: "Route does not exist"}));
}