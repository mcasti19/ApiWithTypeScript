"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findRevenue = void 0;
const repositories_1 = require("../repositories");
const services_1 = require("../services");
const revenueRepository = new repositories_1.RevenueRepository();
const revenueService = new services_1.RevenueService(revenueRepository);
const findRevenue = async (req, res) => {
    try {
        const revenue = await revenueService.findRevenues();
        if (revenue.length === 0) {
            res.status(404).json({ message: "no Revenue Found." });
            return;
        }
        res.json(revenue);
    }
    catch (error) {
        console.log("error :>> ", error);
        res.status(500).json(error);
    }
};
exports.findRevenue = findRevenue;
