import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { UserRepository } from "@repositories";
import { UserService } from "@services";

import { Method, permissions } from "../types/PermissionsTypes";
import { IUserService, IUsersRepository, User } from "../types/UsersTypes";


const userRepository: IUsersRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);

export const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const jwtSecret = process.env.JWT_SECRET as string;
    const token = req.headers.authorization?.match(/^Bearer (.*)$/)?.[ 1 ].trim();
    if (!token) {
        {
            res.status(401).send({ error: "Token not provided" });
            return
        }
    }
    try {
        const verify = jwt.verify(token, jwtSecret) as User;
        const getUser = await userService.findUserById(verify.id);
        if (!getUser) {
            res.status(400);
            return
        }

        req.currentUser = getUser;
        next();

    } catch (error: any) {
        console.log('error :>>', error);
        if (error.message === 'invalid signature') {
            res.status(401).send({ error: "Invalid token" });
            return
        } else if (error.message === 'jwt expired') {
            res.status(401).send({ error: "Expired token" });
            return
        } else {
            res.status(500).send({ error: "Internal Server Error" });
            return
        }
    }
}

export const getPermission = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const { currentUser, method, path } = req;
    const { roles } = currentUser;

    const currentModule = path.replace(/^\/([^\/]+).*/, "$1");
    console.log('currentUser :>>', currentModule);

    const findMethod = permissions.find(x => x.method === Method[ method as keyof typeof Method ]);

    if (!findMethod?.permissions.includes(`${currentModule}_${findMethod.scope}`)) {
        findMethod?.permissions.push(`${currentModule}_${findMethod.scope}`);
    }
    console.log('findMethod :>>', findMethod);

    const mergeRolesPermissions = [ ...new Set(roles?.flatMap(x => x.permissions)) ];
    console.log('mergeRolesPermissions :>>', mergeRolesPermissions);

    let userPermissions: string[] = [];
    if (currentUser.permissions?.length !== 0) {
        userPermissions = currentUser.permissions!
    } else {
        userPermissions = mergeRolesPermissions;
    }

    const permissionsGranted = findMethod?.permissions.find(x => userPermissions.includes(x))
    console.log('permissionsGranted :>>', permissionsGranted);

    if (!permissionsGranted) {
        res.status(401).json("Unauthorized!!!");
        return
    }
    next();
} 