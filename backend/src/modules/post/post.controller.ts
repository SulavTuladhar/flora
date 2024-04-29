import { NextFunction, Request, Response } from "express";
import { Post } from "../../entities/post.entity";
import map_post_req from "../../helpers/map_post_req";
import repo from "../../configs/repo";
import customError from "../../helpers/customError";
import { appDataSource } from "../../appDataSource";
import { Role } from "../../entities/enum";



// Add Post
export async function createPost(req: any, res: Response, next: NextFunction) {
    try {
        const data = req.body;
        if (req.fileTypeError) {
            throw customError('Invalid File Format', 404)
        }
        if (req.files) {
            data.filenames = req.files.map(function (item: any, index: number) {
                return item.filename;
            })
        }
        var newPost = new Post();
        var mappedPost = map_post_req(newPost, data);
        mappedPost.user = req.user;
        const post = await repo.postRepo.save(mappedPost);
        res.status(201).json({
            data: post
        })
    } catch (err) {
        return next(err);
    }
}

// Fetch All Posts
export async function fetchPostsByCategory(req: any, res: Response, next: NextFunction) {
    try {
        const category = req.params.category;
        var posts = await appDataSource
            .getRepository(Post)
            .createQueryBuilder('post')
            .where("post.category like :category", { category: `%${category}%` })
            .leftJoin("post.user", "user")
            .select(['post'])
            .addSelect(['user.name'])
            .getMany();
        res.json({
            posts
        })
    } catch (err) {
        return next(err);
    }
}

// Fetch Specific Post By Id
export async function fetchSpecificPost(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const post = await appDataSource
            .getRepository(Post)
            .createQueryBuilder('post')
            .where("post.id like :id", { id: id })
            .leftJoin("post.user", "user")
            .select(['post'])
            .addSelect(['user.name', 'user.location', 'user.number'])
            .getOne()
        if (!post) {
            throw customError("Post not found", 404);
        }
        res.status(200).json({
            post
        })
    } catch (err) {
        return next(err);
    }
}
