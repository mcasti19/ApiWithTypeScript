import { Document } from "mongoose";
import { Query, Repository } from "./RepositoryTypes";
import { Roles } from "./RolesTypes";

export interface User extends Document {
    name: string;
    username: string;
    email: string;
    password: string;
    roles?: Roles[];
    permissions?: string[];
    comparePassword(password: string): Promise<boolean>;
}

export interface IUsersRepository extends Repository<User> {
    findOne(query: Query): Promise<User | null> //* Permite buscar por alguno de los parametros de USER
}

export interface IUserService {
    createUser(user: User): Promise<User>
    findUsers(query?: Query): Promise<User[]>
    findUserById(id: string): Promise<User | null>
    findUserByEmail(email: string): Promise<User | null>
    updateUser(id: string, user: Partial<User>): Promise<User | null>
    deleteUser(id: string): Promise<boolean>
}