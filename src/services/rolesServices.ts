import { Query } from "types/RepositoryTypes";
import { IRolesRepository, IRolesService, Roles } from "types/RolesTypes";

export class RolesService implements IRolesService {
    private RolesRepository: IRolesRepository

    constructor(RolesRepository: IRolesRepository) {
        this.RolesRepository = RolesRepository
    }

    async createRoles(Roles: Roles): Promise<Roles> {
        return this.RolesRepository.create(Roles)
    }

    async findRoles(query?: Query): Promise<Roles[]> {
        return this.RolesRepository.find(query)
    }

    async findRolesById(id: string): Promise<Roles | null> {
        return this.RolesRepository.findById(id)
    }

    async updateRoles(id: string, Roles: Partial<Roles>): Promise<Roles | null> {
        return this.RolesRepository.update(id, Roles)
    }

    async deleteRoles(id: string): Promise<boolean> {
        return this.RolesRepository.delete(id)
    }
}