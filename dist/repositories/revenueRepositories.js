"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RevenueRepository = void 0;
const models_1 = require("../models");
class RevenueRepository {
    async create(data) {
        const newRevenues = new models_1.RevenueModel(data);
        return await newRevenues.save();
    }
    async find(query) {
        return await models_1.RevenueModel.find(query || {}).exec();
    }
}
exports.RevenueRepository = RevenueRepository;
