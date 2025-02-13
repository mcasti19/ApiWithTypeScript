"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesRepository = void 0;
const _models_1 = require("@models");
class RolesRepository {
    async create(data) {
        const newRoles = new _models_1.RolesModel(data);
        return await newRoles.save();
    }
    async find(query) {
        return await _models_1.RolesModel.find(query || {}).exec();
    }
    async findById(id) {
        return await _models_1.RolesModel.findById(id).exec();
    }
    async update(id, data) {
        return await _models_1.RolesModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    async delete(id) {
        const deleted = _models_1.RolesModel.findByIdAndDelete(id).exec();
        return deleted !== null;
    }
}
exports.RolesRepository = RolesRepository;
