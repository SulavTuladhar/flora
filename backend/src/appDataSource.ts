import { DataSource } from "typeorm";
import { Post } from "./entities/post.entity";
import { User } from "./entities/user.entity";

export const appDataSource = new DataSource({
    'type': 'mysql',
    'host': 'localhost',
    'port': 3306,
    'username': 'root',
    'password': '',
    'database': 'flora',
    'synchronize': true,
    'logger': 'simple-console',
    'logging': true,
    'entities': [User, Post]
})