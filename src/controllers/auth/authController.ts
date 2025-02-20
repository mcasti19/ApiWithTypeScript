import { Request, Response } from 'express';
import { UserRepository } from '../../repositories';
import { UserService } from '../../services';
import { IUserService, IUserRepository, User } from '../../types/UsersTypes';
import jwt from "jsonwebtoken";

//* Inyeccion de Dependencias
const userRepository: IUserRepository = new UserRepository();
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

export const loginUser = async (req: Request, res: Response) => {
    const jwtSecret = process.env.JWT_SECRET as string;
    try {
        const { email, password }: User = req.body;

        const user = await userService.findUserByEmail(email);
        if (!user) return res.status(400).json({ message: "Invalid user or password" });

        const comparePass = await user.comparePassword(password);
        if (!comparePass) return res.status(400).json({ message: "Invalid user or password" });

        const token = jwt.sign({ id: user._id, email: user.email, name: user.username }, jwtSecret);

        res.status(200).json({
            id: user._id,
            name: user.username,
            email: user.email,
            token
        });
    } catch (error) {
        console.log("error :>> ", error);
        res.status(500).json(error);
    }
};