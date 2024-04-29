import { NextFunction, Response } from "express";
import { Role } from "../entities/enum";

const restrictTo = (...roles: any) => {
    return (req: any, res: Response, next: NextFunction) => {
        if(!roles.includes(req.user.role)){
            return next({
                message: "You do not have permission to use this route",
                status: 403
            })
        }
        next();
    }
}

export default restrictTo;