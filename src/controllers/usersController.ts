import { Request, Response } from "express";
import { UserRepository } from "../repositories";
import { UserService } from "../services";

import { IUserService, IUsersRepository, User } from "../types/UsersTypes";

//* Inyeccion de Dependencias
const userRepository: IUsersRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository)


export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const newUser: User = req.body
        const usuarioCreado = await userService.createUser(newUser)
        res.status(201).json({ msg: 'Usuario creado con Exito', usuarioCreado });

    } catch (error) {
        console.log('Error >>', error);
        res.status(400).json(error)
    }
}

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await userService.findUsers();
        if (users.length === 0) {
            res.status(404).json({ message: 'No users Found' });
            return
        }

        res.status(200).json({ message: `${users.length} Users Found`, users });

    } catch (error) {
        console.log('Error >>', error);
        res.status(500).json({ error: 'Error loading Users' })
    }
}

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id
        const user = await userService.findUserById(id)
        if (!user) {
            res.status(404).json({ message: 'User ID NOT Found' });
            return
        }
        res.status(200).json(user);

    } catch (error) {
        console.log('Error >>', error);
        res.status(400).json({ error: 'usuario no encontrado' })
    }
}

export const updateUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id: string = req.params.id
        const user: User = req.body
        const result = await userService.updateUser(id, user)
        console.log(result);
        res.status(200).json(result);
    } catch (error) {
        console.log('Error >>', error);
        res.status(400).json({ error: 'usuario no encontrado' })
    }
}

export const deleteUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id: string = req.params.id;
        const deletedUser = await userService.deleteUser(id);
        console.log(deletedUser);
        res.status(200).json(deletedUser);
    } catch (error) {
        console.log('Error >>', error);
        res.status(404).json({ error: 'Deleting user failure' })
    }
}