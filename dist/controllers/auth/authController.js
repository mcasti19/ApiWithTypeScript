"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const userRepositories_1 = require("@repositories/userRepositories");
const userServices_1 = require("@services/userServices");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//* Inyeccion de Dependencias
const userRepository = new userRepositories_1.UserRepository();
const userService = new userServices_1.UserService(userRepository);
const registerUser = async (req, res) => {
    try {
        const { email } = req.body;
        const userRegistered = await userService.findUserByEmail(email);
        if (userRegistered) {
            res.status(400).json({ message: 'Email already Exists!!' });
            return;
        }
        const newUser = await userService.createUser(req.body);
        res.status(201).json({ message: 'user created successfully', newUser });
    }
    catch (error) {
        console.log('Error >>', error);
        res.status(500).json(error);
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    const jwtSecret = process.env.JWT_SECRET;
    try {
        const { email, password } = req.body;
        const user = await userService.findUserByEmail(email);
        if (!user) {
            res.status(400).json({ message: 'Invalid user or password' });
            return;
        }
        const comparePassword = await user.comparePassword(password);
        if (!comparePassword) {
            res.status(400).json({ message: 'Invalid user or password' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email, username: user.username }, jwtSecret, { expiresIn: '1h' });
        res.status(200).json({ message: "User Logged", user, token });
    }
    catch (error) {
        console.log('Error >>', error);
        res.status(500).json(error);
    }
};
exports.loginUser = loginUser;
