import { Request, Response } from 'express';
import { IUserService, IUsersRepository, User } from 'types/UsersTypes';
import { UserRepository } from "@repositories/userRepositories";
import { UserService } from "@services/userServices";

import jwt from "jsonwebtoken";

//* Inyeccion de Dependencias
const userRepository: IUsersRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository)


export const registerUser = async (req: Request, res: Response) => {
    try {
        const { email }: User = req.body;
        const userRegistered = await userService.findUserByEmail(email);
        if (userRegistered) return res.status(400).json({ message: 'Email already Exists!!' });
        
        const newUser = await userService.createUser(req.body);
        res.status(201).json({ message: 'user created successfully', newUser })
        
    } catch (error) {
        console.log('Error >>', error);
        res.status(500).json(error)
    }
}

export const loginUser = async (req: Request, res: Response) => {
    const jwtSecret = process.env.JWT_SECRET as string;
    try {
        const { email, password }: User = req.body;
        const user = await userService.findUserByEmail(email);
        if (!user) return res.status(400).json({ message: 'Invalid user or password' });

        const comparePassword = await user.comparePassword(password);
        if (!comparePassword) return res.status(400).json({ message: 'Invalid user or password' });

        const token = jwt.sign({ id: user._id, email: user.email, username: user.username }, jwtSecret, { expiresIn: '1h' })

        res.status(200).json({ message: "User Logged", user, token });

    } catch (error) {
        console.log('Error >>', error);
        res.status(500).json(error)
    }
}