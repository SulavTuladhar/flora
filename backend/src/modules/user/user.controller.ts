import { NextFunction, Request, Response } from "express";
import repo from "../../configs/repo";
import { Role } from "../../entities/enum";
import customError from "../../helpers/customError";
import { userDetail } from "../../configs/interfaces";
import map_user_req from "../../helpers/map_user_req";
import path from "path";
const fs = require('fs');

// Algorithm for geoFencing
function calculateDistance(lat1: string, lon1: string, lat2: string, lon2: string) {
    // Convert latitude and longitude values from strings to numbers
    const lat1Number = parseFloat(lat1);
    const lon1Number = parseFloat(lon1);
    const lat2Number = parseFloat(lat2);
    const lon2Number = parseFloat(lon2);

    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2Number - lat1Number) * (Math.PI / 180);
    const dLon = (lon2Number - lon1Number) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1Number * (Math.PI / 180)) *
        Math.cos(lat2Number * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
}
// Fetching nearest florists
export async function nearestFlorists(req: any, res: Response, next: NextFunction) {
    try {
        const { maxDistance, from } = req.query;
        const user = req.user;

        const florists = await repo.userRepo.find({ where: { role: Role.FLORIST } });
        // Calculate distances from the user to all florists
        const floristsWithDistances = florists
            .filter((florist) => {
                const distance = calculateDistance(
                    user.latitude,
                    user.longitude,
                    florist.latitude,
                    florist.longitude
                );
                return distance <= maxDistance;
            })
            .map((florist) => {
                const { name, profilepic } = florist;
                const distance = calculateDistance(
                    user.latitude,
                    user.longitude,
                    florist.latitude,
                    florist.longitude
                );

                // Convert distance to meters if less than 1 kilometer, keep it in kilometers otherwise
                const formattedDistance =
                    distance < 1 ? `${(distance * 1000).toFixed(0)} meters` : `${distance.toFixed(2)} km`;
                return { name, profilepic, distance: formattedDistance }; // Add formatted distance to the florist object
            });

        // Sort the florists by distance in ascending order
        floristsWithDistances.sort((a: any, b: any) => a.distance - b.distance);

        var nearestFlorists: any[];
        if (from == 'home')
            nearestFlorists = floristsWithDistances.slice(0, 4);
        else
            nearestFlorists = floristsWithDistances;

        res.json({ florists: nearestFlorists });
    } catch (err) {
        return next(err);
    }
}

// Fetch Profile
export async function fetchProfile(req: any, res: Response, next: NextFunction){
    try{
        const user = req.user;
        const userDetail = await repo.userRepo.findOne({where: {id: user.id}, relations: ['posts']}) as userDetail;
        if(!userDetail){
            throw customError("No user found", 404);
        }
        delete userDetail.password;
        delete userDetail.otp;
        delete userDetail.latitude;
        delete userDetail.longitude;
        res.status(200).json({
            data: userDetail
        })
    }catch(err){
        return next(err);
    }
}

export async function editProfile(req: any, res: Response, next: NextFunction){
    try{
        const user = req.user;
        var data = req.body;
        if(req.fileTypeError){
            throw customError("Invalid file format", 400);
        }
        if(req.file){
            data.profilepic = req.file.filename;
        }
        var userDetail = await repo.userRepo.findOneBy({id: user.id});
        var oldImg = userDetail?.profilepic;
        if(!userDetail){
            throw customError("User not found", 404);
        }
        var mappedUserReq = map_user_req(userDetail, data);
        const savedMappedReq = await repo.userRepo.save(mappedUserReq);
        fs.unlink(path.join(process.cwd(), '/src/uploads/profile/' + oldImg), (err:any, done: any) => {
            if(err){
                console.log("error while removing old profile pic >>", err);
                
            }
        })
        res.status(200).json({
            data: savedMappedReq
        })
    }catch(err){
        return next(err);
    }
}