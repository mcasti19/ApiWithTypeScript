"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoleById = exports.updateRoleById = exports.getRoleById = exports.getRoles = exports.registerRole = void 0;
const rolesServices_1 = require("../services/rolesServices");
const rolesRepositories_1 = require("../repositories/rolesRepositories");
const rolesRepository = new rolesRepositories_1.RolesRepository();
const rolesService = new rolesServices_1.RolesService(rolesRepository);
const registerRole = async (req, res) => {
    try {
        const newRoles = req.body;
        const RolCreated = await rolesService.createRoles(newRoles);
        console.log("New Role Created:, ", RolCreated);
        res.status(201).json({ msg: 'Role Successfully created', RolCreated });
    }
    catch (error) {
        console.log('Error >>', error);
        res.status(500).json({ error: 'Error creating new ROLE' });
    }
};
exports.registerRole = registerRole;
const getRoles = async (req, res) => {
    try {
        const roles = await rolesService.findRoles();
        if (roles.length === 0) {
            res.status(404).json({ message: 'No roles founds' });
            return;
        }
        console.log('Roles: ', roles);
        res.status(200).json(roles);
    }
    catch (error) {
        console.log('Error >>', error);
        res.status(400).json({ error: 'Error loading Roles' });
    }
};
exports.getRoles = getRoles;
const getRoleById = async (req, res) => {
    try {
        const id = req.params.id;
        const roles = await rolesService.findRolesById(id);
        if (!roles) {
            res.status(404).json({ message: 'Not role founds' });
            return;
        }
        console.log(roles);
        res.status(201).json(roles);
    }
    catch (error) {
        console.log('Error >>', error);
        res.status(400).json({ error: 'Role NOT found' });
    }
};
exports.getRoleById = getRoleById;
const updateRoleById = async (req, res) => {
    try {
        const id = req.params.id;
        const roles = req.body;
        const result = await rolesService.updateRoles(id, roles);
        console.log(result);
        res.status(201).json(result);
    }
    catch (error) {
        console.log('Error >>', error);
        res.status(400).json({ error: 'Role NOT found' });
    }
};
exports.updateRoleById = updateRoleById;
const deleteRoleById = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedroles = await rolesService.deleteRoles(id);
        console.log(deletedroles);
        res.status(201).json(deletedroles);
    }
    catch (error) {
        console.log('Error >>', error);
        res.status(400).json({ error: 'Deleting roles failure' });
    }
};
exports.deleteRoleById = deleteRoleById;
