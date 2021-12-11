import { Application, Request, Response } from "express";
import userRoutes from './userRoutes';
import thoughtRoutes from './thoughtRoutes';

export default (app: Application) => {

    // Api Routes
    app.use("/api/users", userRoutes);
    app.use("/api/thoughts", thoughtRoutes);

    // Any other route
    app.all('*', (req: Request, res: Response) => res.status(404).json({message: "Route does not exist"}));
}