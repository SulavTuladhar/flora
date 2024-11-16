import { NextFunction, Request, Response } from "express";
import repo from "../../configs/repo";
import customError from "../../helpers/customError";
import { Role } from "../../entities/enum";

export async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const user = await repo.userRepo.findOneBy({ id: +id });
    if (!user) throw customError("Florist Not Found", 404);
    await repo.userRepo.remove(user);
    res.status(200).json({
      message: "User Deleted Successfully",
    });
  } catch (err) {
    return next(err);
  }
}

export async function deletePost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const post = await repo.postRepo.findOneBy({ id: +id });
    if (!post) throw customError("Post not found", 404);
    await repo.postRepo.remove(post);
    res.status(200).json({
      message: "Post Deleted Successfully",
    });
  } catch (err) {
    return next(err);
  }
}

export async function getAllUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { role } = req.params;
    const sanitizedRole = role === "florist" ? Role.FLORIST : Role.USER;
    const users = await repo.userRepo.findBy({ role: sanitizedRole });
    if (!users) throw customError("Users not found", 404);
    const sanitizedUsers = users.map((item: any) => {
      delete item.password;
      return item;
    });
    res.status(200).json({
      data: sanitizedUsers,
    });
  } catch (err) {
    return next(err);
  }
}

export async function getAllPosts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const posts = await repo.postRepo.find({});
    if (!posts) throw customError("Posts not found", 404);
    res.status(200).json({
      data: posts,
    });
  } catch (err) {
    next(err);
  }
}
