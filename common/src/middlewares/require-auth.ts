import { Request, Response, NextFunction } from "express";


export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) next(new Error("Not authorized!"));
    next();
}