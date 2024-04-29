import { IsEmail } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Gender, Role } from './enum';
import { Post } from './post.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    @IsEmail()
    email!: string;

    @Column()
    location!: string;

    @Column({ type: 'bigint' })
    number!: number;

    @Column()
    password!: string;

    @Column({ default: null })
    otp!: string;

    @Column({
        type: 'enum',
        enum: Gender
    })
    gender!: Gender;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER
    })
    role!: Role

    @Column()
    latitude!: string;

    @Column()
    longitude!: string;

    @Column()
    profilepic!: string;

    @OneToMany(() => Post, (post) => post.user, {cascade: true})
    posts!: Post[]
}