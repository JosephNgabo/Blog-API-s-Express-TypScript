import { Request, Response, NextFunction } from "express";
import { NotAuthorized } from "../errors/not-authorized";

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.currentUser) next(new NotAuthorized());
    next();
}