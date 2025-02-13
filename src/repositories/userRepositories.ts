import { UserModel } from "@models";
import { Query } from "../types/RepositoryTypes";
import { IUsersRepository, User } from "../types/UsersTypes";

export class UserRepository implements IUsersRepository {

    async create(data: User): Promise<User> {
        const newUser = new UserModel(data);
        return await newUser.save();
    }

    async find(query?: Query): Promise<User[]> {
        return await UserModel.find(query || {}).populate("roles").exec();
    }

    async findById(id: string): Promise<User | null> {
        return await UserModel.findById(id).populate("roles").exec();
    }
    async findOne(query: Query): Promise<User | null> {
        return await UserModel.findOne(query).populate("roles").exec();

    }

    async update(id: string, data: Partial<User>): Promise<User | null> {
        return await UserModel.findByIdAndUpdate(id, data, { new: true }).populate("roles").exec();
    }

    async delete(id: string): Promise<boolean> {
        const deleted = UserModel.findByIdAndDelete(id).exec();
        return deleted !== null;
    }
}