import { Query } from "../types/RepositoryTypes";
import { IUsersRepository, IUserService, User } from "../types/UsersTypes";

export class UserService implements IUserService {
    private userRepository: IUsersRepository

    constructor(userRepository: IUsersRepository) {
        this.userRepository = userRepository
    }

    async createUser(user: User): Promise<User> {
        return this.userRepository.create(user)
    }

    async findUsers(query?: Query): Promise<User[]> {
        return this.userRepository.find(query)
    }

    async findUserById(id: string): Promise<User | null> {
        return this.userRepository.findById(id)
    }

    findUserByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({ email });
    }

    async updateUser(id: string, user: Partial<User>): Promise<User | null> {
        return this.userRepository.update(id, user)
    }

    async deleteUser(id: string): Promise<boolean> {
        return this.userRepository.delete(id)
    }
}