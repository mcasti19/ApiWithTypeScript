import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { UserService } from "@services/userServices";
import { UserRepository } from "@repositories/userRepositories";
import { Method, permissions } from '../types/PermissionsTypes';
import { IUserService, IUsersRepository, User } from "types/UsersTypes";

const userRepository: IUsersRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const jwtSecret = process.env.JWT_SECRET as string;
    const token = req.headers.authorization?.match(/^Bearer (.*)$/)?.[ 1 ].trim();
    if (!token) {
        return res.status(401).send({ error: "Token no proporcionado" });
    }
    try {
        const verify = jwt.verify(token, jwtSecret) as User;
        const getUser = await userService.findUserById(verify.id);
        if (!getUser) return res.status(400);
        req.currentUser = getUser;

        next();

    } catch (error: any) {
        console.log('error :>>', error);
        if (error.message === 'invalid signature') {
            return res.status(401).send({ error: "Token inválido" });
        } else if (error.message === 'jwt expired') {
            return res.status(401).send({ error: "Token expirado" });
        } else {
            return res.status(500).send({ error: "Error interno del servidor" });
        }
    }
}

export const getPermission = async (req: Request, res: Response, next: NextFunction) => {

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

    if (!permissionsGranted) return res.status(401).json("Unauthorized!!!")
    next();
} 