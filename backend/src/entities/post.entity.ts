import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Category } from './enum';

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    description!: string;

    @Column({ type: 'simple-array' })
    filenames!: [];

    @Column({
        type: "enum",
        enum: Category
    })
    category!: Category

    @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
    user!: User
}