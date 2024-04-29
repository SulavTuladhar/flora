import { appDataSource } from "../appDataSource";
import { Post } from "../entities/post.entity";
import { User } from "../entities/user.entity";

const repo = {
    userRepo: appDataSource.getRepository(User),
    postRepo: appDataSource.getRepository(Post)
}

export default repo;