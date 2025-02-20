import { Document } from "mongoose";
import { Query, Repository } from "./RepositoryTypes";
import { Roles } from "./RolesTypes";
import { z } from "zod";

export interface User extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  roles?: Roles[];
  permissions?: string[];
  comparePassword(password: string): Promise<boolean>;
}

export interface IUserRepository extends Repository<User> {
  findOne(query: Query): Promise<User | null>;
}

export interface IUserService {
  createUser(user: User): Promise<User>;
  findUsers(query?: Query): Promise<User[]>;
  findUserById(id: string): Promise<User | null>;
  findUserByEmail(email: string): Promise<User | null>;
  updateUser(id: string, user: Partial<User>): Promise<User | null>;
  deleteUser(id: string): Promise<boolean>;
}

export const UserSchemaValidation = z.object({
  name: z.string(),
  username: z.string().min(4),
  email: z.string().email(),
  password: z.string().refine(
    val => val.length > 5,
    val => ({ message: `${val} is not more than 6 characters` })
  )
});