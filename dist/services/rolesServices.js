"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesService = void 0;
class RolesService {
    constructor(RolesRepository) {
        this.RolesRepository = RolesRepository;
    }
    async createRoles(Roles) {
        return this.RolesRepository.create(Roles);
    }
    async findRoles(query) {
        return this.RolesRepository.find(query);
    }
    async findRolesById(id) {
        return this.RolesRepository.findById(id);
    }
    async updateRoles(id, Roles) {
        return this.RolesRepository.update(id, Roles);
    }
    async deleteRoles(id) {
        return this.RolesRepository.delete(id);
    }
}
exports.RolesService = RolesService;
