import jwt from "jsonwebtoken";
import { UserRepository } from "@repositories/userRepositories";
import { UserService } from "@services/userServices";
import { NextFunction, Request, Response } from "express";
import { IUserService, IUsersRepository, User } from "types/UsersTypes";
import { Method, permissions } from '../types/PermissionsTypes';

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
        // console.log("VERIFY :>> ", verify);

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

    //? - Obtener lo roles, (desde currentUser)
    //? - Obtener el Metodo HTTP de la petición
    const { currentUser, method, path } = req;
    const { roles } = currentUser;
    // console.log('currentUser :>>', roles);

    //? - Obtener el path/modulos (usuarios - roles - posts)
    const currentModule = path.replace(/^\/([^\/]+).*/, "$1");
    console.log('currentUser :>>', currentModule);


    //? - Conseguir en los permisos el metodo que coincida para obtener el objeto que contiene el scope
    const findMethod = permissions.find(x => x.method === Method[ method as keyof typeof Method ]);

    //? - Armar el permiso correspondiente al scope en le momento de la petición
    if (!findMethod?.permissions.includes(`${currentModule}_${findMethod.scope}`)) {
        findMethod?.permissions.push(`${currentModule}_${findMethod.scope}`);
    }
    console.log('findMethod :>>', findMethod);


    //? - obtener todos los permisos de los roles del usuario
    // const rolesPermissions = roles?.map(role => role.permissions);
    // const flatPermissions = rolesPermissions?.flat(); // aplana los arreglos y los une en 1 solo
    // const mergePermissions = [ new Set(flatPermissions) ]; //  busca los repetidos y los saca del array

    //! La siguiente variable es exactamente lo mismo de las 3 lineas arriba.  se mapea a Roles, se hace el flag y se hace el set para sacar los repetidos
    const mergeRolesPermissions = [ ...new Set(roles?.flatMap(x => x.permissions)) ];
    console.log('mergeRolesPermissions :>>', mergeRolesPermissions);




    //? - Verificar si el usuario Tiene Permisos
    let userPermissions: string[] = [];
    if (currentUser.permissions?.length !== 0) {
        userPermissions = currentUser.permissions! // Se le agrega el operator de not null para decirle a typescript que no sera nulo (permissions!)
    } else {
        //? - Tienen mayor prioridad q los permisos de los roles
        userPermissions = mergeRolesPermissions;
    }

    //? - comparar los permisos armados en el scope con los permisos de los roles de usuario
    const permissionsGranted = findMethod?.permissions.find(x => userPermissions.includes(x))
    console.log('permissionsGranted :>>', permissionsGranted);


    //? - si no hay match, regresamos un error unauthorized
    if (!permissionsGranted) return res.status(401).json("Unauthorized!!!")
    //? - si todo bien next()
    next();

} 