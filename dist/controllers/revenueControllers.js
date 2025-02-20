"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRevenue = exports.findRevenue = void 0;
const repositories_1 = require("../repositories");
const services_1 = require("../services");
const revenueRepository = new repositories_1.RevenueRepository();
const revenueService = new services_1.RevenueService(revenueRepository);
const customerRepository = new repositories_1.CustomerRepository();
const customerService = new services_1.CustomerService(customerRepository);
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
const createRevenue = async (req, res) => {
    // const customerID = req.body.customer;
    // console.log('customerID :>>',customerID );
    try {
        // const customerExists = await customerService.findCustomerById(customerID);
        // if (!customerExists) {
        //   res.status(400).json({ message: "Customer does not exists" });
        //   return
        // }
        const newRevenue = req.body;
        const result = await revenueService.createRevenues(newRevenue);
        res.status(201).json(result);
    }
    catch (error) {
        console.log("error :>> ", error);
        res.status(400).json(error);
    }
};
exports.createRevenue = createRevenue;
