"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const models_1 = require("../models");
class UserRepository {
    async create(data) {
        const newUser = new models_1.UserModel(data);
        return await newUser.save();
    }
    async find(query) {
        return await models_1.UserModel.find(query || {}).populate("roles").exec();
    }
    async findById(id) {
        return await models_1.UserModel.findById(id).populate("roles").exec();
    }
    async findOne(query) {
        return await models_1.UserModel.findOne(query).populate("roles").exec();
    }
    async update(id, data) {
        return await models_1.UserModel.findByIdAndUpdate(id, data, { new: true }).populate("roles").exec();
    }
    async delete(id) {
        const deleted = models_1.UserModel.findByIdAndDelete(id).exec();
        return deleted !== null;
    }
}
exports.UserRepository = UserRepository;
