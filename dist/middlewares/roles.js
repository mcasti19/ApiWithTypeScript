"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRoles = void 0;
const rolesServices_1 = require("@services/rolesServices");
const rolesRepositories_1 = require("@repositories/rolesRepositories");
const rolesRepository = new rolesRepositories_1.RolesRepository();
const rolesService = new rolesServices_1.RolesService(rolesRepository);
const checkRoles = async (req, res, next) => {
    const roles = req.body && req.body?.roles ? req.body.roles : [];
    const role = Array.isArray(roles) && roles.length !== 0 ? roles : ["user"];
    console.log('Este es el nuevo Role creado :>>', role);
    try {
        const findRole = await rolesService.findRoles({ name: { $in: role } });
        if (findRole.length === 0) {
            res.status(404).json({ message: "Role Not Found" });
            return;
        }
        req.body.roles = findRole.map(x => x._id);
        console.log('findRole :>>', req.body.roles);
        next();
    }
    catch (error) {
        console.log('error :>>', error);
        res.status(500).json({ message: "No posee el rol permitido", error });
    }
};
exports.checkRoles = checkRoles;
