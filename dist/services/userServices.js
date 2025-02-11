"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async createUser(user) {
        return this.userRepository.create(user);
    }
    async findUsers(query) {
        return this.userRepository.find(query);
    }
    async findUserById(id) {
        return this.userRepository.findById(id);
    }
    findUserByEmail(email) {
        return this.userRepository.findOne({ email });
    }
    async updateUser(id, user) {
        return this.userRepository.update(id, user);
    }
    async deleteUser(id) {
        return this.userRepository.delete(id);
    }
}
exports.UserService = UserService;
