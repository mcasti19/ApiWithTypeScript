"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPermission = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userServices_1 = require("@services/userServices");
const userRepositories_1 = require("@repositories/userRepositories");
const PermissionsTypes_1 = require("../types/PermissionsTypes");
const userRepository = new userRepositories_1.UserRepository();
const userService = new userServices_1.UserService(userRepository);
const verifyToken = async (req, res, next) => {
    const jwtSecret = process.env.JWT_SECRET;
    const token = req.headers.authorization?.match(/^Bearer (.*)$/)?.[1].trim();
    if (!token) {
        {
            res.status(401).send({ error: "Token not provided" });
            return;
        }
    }
    try {
        const verify = jsonwebtoken_1.default.verify(token, jwtSecret);
        const getUser = await userService.findUserById(verify.id);
        if (!getUser) {
            res.status(400);
            return;
        }
        req.currentUser = getUser;
        next();
    }
    catch (error) {
        console.log('error :>>', error);
        if (error.message === 'invalid signature') {
            res.status(401).send({ error: "Invalid token" });
            return;
        }
        else if (error.message === 'jwt expired') {
            res.status(401).send({ error: "Expired token" });
            return;
        }
        else {
            res.status(500).send({ error: "Internal Server Error" });
            return;
        }
    }
};
exports.verifyToken = verifyToken;
const getPermission = async (req, res, next) => {
    const { currentUser, method, path } = req;
    const { roles } = currentUser;
    const currentModule = path.replace(/^\/([^\/]+).*/, "$1");
    console.log('currentUser :>>', currentModule);
    const findMethod = PermissionsTypes_1.permissions.find(x => x.method === PermissionsTypes_1.Method[method]);
    if (!findMethod?.permissions.includes(`${currentModule}_${findMethod.scope}`)) {
        findMethod?.permissions.push(`${currentModule}_${findMethod.scope}`);
    }
    console.log('findMethod :>>', findMethod);
    const mergeRolesPermissions = [...new Set(roles?.flatMap(x => x.permissions))];
    console.log('mergeRolesPermissions :>>', mergeRolesPermissions);
    let userPermissions = [];
    if (currentUser.permissions?.length !== 0) {
        userPermissions = currentUser.permissions;
    }
    else {
        userPermissions = mergeRolesPermissions;
    }
    const permissionsGranted = findMethod?.permissions.find(x => userPermissions.includes(x));
    console.log('permissionsGranted :>>', permissionsGranted);
    if (!permissionsGranted) {
        res.status(401).json("Unauthorized!!!");
        return;
    }
    next();
};
exports.getPermission = getPermission;
