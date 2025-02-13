"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RevenueRepository = void 0;
const _models_1 = require("@models");
class RevenueRepository {
    async find(query) {
        return await _models_1.RevenueModel.find(query || {}).exec();
    }
}
exports.RevenueRepository = RevenueRepository;
