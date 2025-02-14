"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RevenueService = void 0;
class RevenueService {
    constructor(RevenueRepository) {
        this.RevenueRepository = RevenueRepository;
    }
    async findRevenues(query) {
        return this.RevenueRepository.find(query);
    }
}
exports.RevenueService = RevenueService;
