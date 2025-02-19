"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsRepository = void 0;
const models_1 = require("../models");
class PostsRepository {
    async create(data) {
        const newPosts = new models_1.PostsModel(data);
        return await newPosts.save();
    }
    async find(query) {
        return await models_1.PostsModel.find(query || {}).exec();
    }
    async findById(id) {
        return await models_1.PostsModel.findById(id).exec();
    }
    async update(id, data) {
        return await models_1.PostsModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    async delete(id) {
        const deleted = await models_1.PostsModel.findByIdAndDelete(id).exec();
        return deleted !== null;
    }
}
exports.PostsRepository = PostsRepository;
