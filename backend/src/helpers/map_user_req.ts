import { User } from "../entities/user.entity";

export default function (user: User, userDetail: User) {
    if (userDetail.name)
        user.name = userDetail.name;
    if (userDetail.password)
        user.password = userDetail.password;
    if (userDetail.number)
        user.number = userDetail.number;
    if (userDetail.email)
        user.email = userDetail.email;
    if (userDetail.location)
        user.location = userDetail.location;
    if (userDetail.gender)
        user.gender = userDetail.gender;
    if (userDetail.latitude)
        user.latitude = userDetail.latitude;
    if (userDetail.longitude)
        user.longitude = userDetail.longitude;
    if (userDetail.profilepic)
        user.profilepic = userDetail.profilepic;
    if(userDetail.role){
        user.role = userDetail.role;
    }

    return user;
}