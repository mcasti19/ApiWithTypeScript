"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserById = exports.updateUserById = exports.getUserById = exports.getUsers = exports.createUser = void 0;
const userRepositories_1 = require("@repositories/userRepositories");
const userServices_1 = require("@services/userServices");
//* Inyeccion de Dependencias
const userRepository = new userRepositories_1.UserRepository();
const userService = new userServices_1.UserService(userRepository);
const createUser = async (req, res) => {
    try {
        const newUser = req.body;
        const usuarioCreado = await userService.createUser(newUser);
        res.status(201).json({ msg: 'Usuario creado con Exito', usuarioCreado });
    }
    catch (error) {
        console.log('Error >>', error);
        res.status(400).json(error);
    }
};
exports.createUser = createUser;
const getUsers = async (req, res) => {
    try {
        const users = await userService.findUsers();
        if (users.length === 0)
            return res.status(404).json({ message: 'No users Found' });
        res.status(200).json({ message: `${users.length} Users Found`, users });
    }
    catch (error) {
        console.log('Error >>', error);
        res.status(500).json({ error: 'Error loading Users' });
    }
};
exports.getUsers = getUsers;
const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await userService.findUserById(id);
        if (!user)
            return res.status(404).json({ message: 'User ID NOT Found' });
        res.status(200).json(user);
    }
    catch (error) {
        console.log('Error >>', error);
        res.status(400).json({ error: 'usuario no encontrado' });
    }
};
exports.getUserById = getUserById;
const updateUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = req.body;
        const result = await userService.updateUser(id, user);
        console.log(result);
        res.status(200).json(result);
    }
    catch (error) {
        console.log('Error >>', error);
        res.status(400).json({ error: 'usuario no encontrado' });
    }
};
exports.updateUserById = updateUserById;
const deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedUser = await userService.deleteUser(id);
        console.log(deletedUser);
        res.status(200).json(deletedUser);
    }
    catch (error) {
        console.log('Error >>', error);
        res.status(404).json({ error: 'Deleting user failure' });
    }
};
exports.deleteUserById = deleteUserById;
// //* DE ESTA FORMA SE HARIA SI SE USA UNA CLASE Y SUS METODOS
// export class UserController {
//     constructor() {
//     }
//     async registerUser(req: Request, res: Response) {
//         try {
//             const newUser: User = req.body
//             const usuarioCreado = await userService.createUser(newUser)
//             res.status(201).json({ msg: 'Usuario creado con Exito', usuarioCreado });
//         } catch (error) {
//             console.log('Error >>', error);
//             res.status(400).json({ error: 'Error al crear el usuario' })
//         }
//     }
//     async getUsers(req: Request, res: Response) {
//         try {
//             const users = await userService.findUsers();
//             if (users.length === 0) return res.status(404).json({ message: 'No users Found' });
//             res.status(200).json({ message: `${users.length} Users Found`, users });
//         } catch (error) {
//             console.log('Error >>', error);
//             res.status(500).json({ error: 'Error loading Users' })
//         }
//     }
//     async getUserById(req: Request, res: Response) {
//         try {
//             const id = req.params.id
//             const user = await userService.findUserById(id)
//             if (!user) return res.status(404).json({ message: 'User ID NOT Found' });
//             res.status(201).json(user);
//         } catch (error) {
//             console.log('Error >>', error);
//             res.status(400).json({ error: 'usuario no encontrado' })
//         }
//     }
//     async updateUserById(req: Request, res: Response) {
//         try {
//             const id: string = req.params.id
//             const user: User = req.body
//             const result = await userService.updateUser(id, user)
//             console.log(result);
//             res.status(201).json(result);
//         } catch (error) {
//             console.log('Error >>', error);
//             res.status(400).json({ error: 'usuario no encontrado' })
//         }
//     }
//     async deleteUserById(req: Request, res: Response) {
//         try {
//             const id: string = req.params.id;
//             const deletedUser = await userService.deleteUser(id);
//             console.log(deletedUser);
//             res.status(201).json(deletedUser);
//         } catch (error) {
//             console.log('Error >>', error);
//             res.status(400).json({ error: 'Deleting user failure' })
//         }
//     }
// }
// export default new UserController();
