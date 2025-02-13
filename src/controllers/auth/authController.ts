import { Request, Response } from 'express';
import { UserRepository } from '../../repositories';
import { UserService } from '../../services';
import { IUserService, IUsersRepository, User } from '../../types/UsersTypes';
import jwt from "jsonwebtoken";

//* Inyeccion de Dependencias
const userRepository: IUsersRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository)


export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email }: User = req.body;
        const userRegistered = await userService.findUserByEmail(email);
        if (userRegistered) {
            res.status(400).json({ message: 'Email already Exists!!' });
            return
        }

        const newUser = await userService.createUser(req.body);
        res.status(201).json({ message: 'user created successfully', newUser })

    } catch (error) {
        console.log('Error >>', error);
        res.status(500).json(error)
    }
}

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const jwtSecret = process.env.JWT_SECRET as string;
    try {
        const { email, password }: User = req.body;
        const user = await userService.findUserByEmail(email);
        if (!user) {
            res.status(400).json({ message: 'Invalid user or password' });
            return
        }

        const comparePassword = await user.comparePassword(password);
        if (!comparePassword) {
            res.status(400).json({ message: 'Invalid user or password' });
            return
        }

        const token = jwt.sign({ id: user._id, email: user.email, username: user.username }, jwtSecret, { expiresIn: '1h' })

        res.status(200).json({ message: "User Logged", user, token });

    } catch (error) {
        console.log('Error >>', error);
        res.status(500).json(error)
    }
}