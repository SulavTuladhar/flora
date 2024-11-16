import { NextFunction, Request, Response } from "express";
import repo from "../../configs/repo";
import configs from '../../configs/configs';
import { User } from "../../entities/user.entity";
import map_user_req from "../../helpers/map_user_req";
import customError from "../../helpers/customError";
import { userDetail } from "../../configs/interfaces";
import { appDataSource } from "../../appDataSource";
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');


function createToken(userId: number) {
    let token = jwt.sign({
        id: userId
    }, configs.JWT_SEC)
    return token;
}

export async function register(req: any, res: Response, next: NextFunction) {
    try {
        const data = req.body;
        if (req.fileTypeError) {
            throw customError('Invalid File Format', 404)
        }
        if (req.file) {
            data.profilepic = req.file.filename;
        }
        var user = await repo.userRepo.findOneBy({email: data.email});
        // var user = await appDataSource
        //     .getRepository(User)
        //     .createQueryBuilder('user')
        //     .select()
        //     .where("user.email like :email", { email: `%${data.email}%` })
        //     .andWhere("user.role like :role", { role: `%${data.role}%` })
        //     .getOne();
        if (user) {
            throw customError("Email Already Taken", 401);
        }
        var newUser = new User();
        var mappedUser = map_user_req(newUser, data);
        mappedUser.password = passwordHash.generate(data.password);
        await repo.userRepo.save(mappedUser);
        res.status(201).json({
            message: "User created Successfully",
            status: 201
        })

    } catch (err) {
        return next(err);
    }
}

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        console.log('====================================');
        console.log("yeyta aye >> ", req.body);
        console.log('====================================');
        const user = await repo.userRepo.findOneBy({ email: req.body.email });
        if (!user) {
            throw customError("Invalid credentials", 401);
        }
        var isMatched = passwordHash.verify(req.body.password, user.password);
        if (!isMatched) {
            throw customError("Invalid credentials", 401);
        }
        console.log({isMatched})
        var token = createToken(user.id);
        let userDetail: userDetail = user;
        delete userDetail.password;
        res.status(200).json({
            'message': 'Logged in successfully!',
            token,
            'user': userDetail
        })
    } catch (err) {
        return next(err);
    }
}