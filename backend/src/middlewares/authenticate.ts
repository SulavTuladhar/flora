import { NextFunction, Response } from "express";
import configs from "../configs/configs";
import repo from "../configs/repo";
const jwt = require('jsonwebtoken');

export default function (req: any, res: Response, next: NextFunction) {
    let token = req.headers['authorization'];
    if (!token) {
        return next({
            message: "Auth failed, token not provided"
        })
    }
    jwt.verify(token, configs.JWT_SEC, async function (err: any, decoded: any){
        if(err){
            return next(err);
        }
        try{
            var user = await repo.userRepo.findOneBy({id: decoded.id});
            if(!user){
                next({
                    message: "User doesn't exists in our system",
                    status: 400
                })
            }else{
                req.user = user;
                req.user.password = "",
                next();
            }
        }catch(err){
            next(err);
        }
    })
}