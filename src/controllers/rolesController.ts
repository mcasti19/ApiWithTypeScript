import { Request, Response } from "express";
import { RolesService } from "@services/rolesServices";
import { RolesRepository } from "@repositories/rolesRepositories";
import { IRolesRepository, IRolesService, Roles } from "types/RolesTypes";

const rolesRepository: IRolesRepository = new RolesRepository();
const rolesService: IRolesService = new RolesService(rolesRepository)


export const registerRole = async (req: Request, res: Response): Promise<void> => {
    try {
        const newRoles: Roles = req.body
        const RolCreated = await rolesService.createRoles(newRoles)
        console.log("New Role Created:, ", RolCreated);
        res.status(201).json({ msg: 'Role Successfully created', RolCreated });

    } catch (error) {
        console.log('Error >>', error);
        res.status(500).json({ error: 'Error creating new ROLE' })
    }
}

export const getRoles = async (req: Request, res: Response): Promise<void> => {
    try {
        const roles = await rolesService.findRoles();
        if (roles.length === 0) {
            res.status(404).json({ message: 'No roles founds' });
            return
        }

        console.log('Roles: ', roles);
        res.status(200).json(roles);

    } catch (error) {
        console.log('Error >>', error);
        res.status(400).json({ error: 'Error loading Roles' })
    }
}

export const getRoleById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id
        const roles = await rolesService.findRolesById(id)
        if (!roles) {
            res.status(404).json({ message: 'Not role founds' });
            return
        }

        console.log(roles);
        res.status(201).json(roles);

    } catch (error) {
        console.log('Error >>', error);
        res.status(400).json({ error: 'Role NOT found' })
    }
}

export const updateRoleById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id: string = req.params.id
        const roles: Roles = req.body
        const result = await rolesService.updateRoles(id, roles)
        console.log(result);
        res.status(201).json(result);

    } catch (error) {
        console.log('Error >>', error);
        res.status(400).json({ error: 'Role NOT found' })
    }
}

export const deleteRoleById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id: string = req.params.id;
        const deletedroles = await rolesService.deleteRoles(id);
        console.log(deletedroles);
        res.status(201).json(deletedroles);

    } catch (error) {
        console.log('Error >>', error);
        res.status(400).json({ error: 'Deleting roles failure' })
    }
}