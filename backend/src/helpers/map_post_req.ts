import { Post } from "../entities/post.entity";

export default function (post: Post, postDetails: Post) {
    if (postDetails.description)
        post.description = postDetails.description;
    if (postDetails.filenames)
        post.filenames = postDetails.filenames;
    if(postDetails.category)
        post.category = postDetails.category;
    return post;
}
