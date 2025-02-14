"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchCustomer = exports.customerCount = exports.deleteCustomer = exports.updateCustomer = exports.createCustomer = exports.findCustomerById = exports.findCustomer = void 0;
const repositories_1 = require("../repositories");
const services_1 = require("../services");
const customerRepository = new repositories_1.CustomerRepository();
const customerService = new services_1.CustomerService(customerRepository);
const findCustomer = async (req, res) => {
    try {
        const customer = await customerService.findCustomers();
        if (customer.length === 0) {
            res.status(404).json({ message: "no Customer Found." });
            return;
        }
        res.json(customer);
    }
    catch (error) {
        console.log("error :>> ", error);
        res.status(500).json(error);
    }
};
exports.findCustomer = findCustomer;
const findCustomerById = async (req, res) => {
    try {
        const customer = await customerService.findCustomerById(req.params.id);
        if (!customer) {
            res.status(404).json({ message: "Not Customer Found" });
            return;
        }
        res.json(customer);
    }
    catch (error) {
        console.log("error :>> ", error);
        res.status(500).json(error);
    }
};
exports.findCustomerById = findCustomerById;
const createCustomer = async (req, res) => {
    try {
        const newCustomer = req.body;
        const result = await customerService.createCustomer(newCustomer);
        res.status(201).json(result);
    }
    catch (error) {
        console.log("error :>> ", error);
        res.status(400).json(error);
    }
};
exports.createCustomer = createCustomer;
const updateCustomer = async (req, res) => {
    try {
        const customer = await customerService.updateCustomer(req.params.id, req.body);
        if (!customer) {
            res.status(404).json({ message: "Not Customer Found" });
            return;
        }
        res.json(customer);
    }
    catch (error) {
        console.log("error :>> ", error);
        res.status(500).json(error);
    }
};
exports.updateCustomer = updateCustomer;
const deleteCustomer = async (req, res) => {
    try {
        const customer = await customerService.deleteCustomer(req.params.id);
        if (!customer) {
            res.status(404).json({ message: "Not Customer Found" });
            return;
        }
        res.json(customer);
    }
    catch (error) {
        console.log("error :>> ", error);
        res.status(500).json(error);
    }
};
exports.deleteCustomer = deleteCustomer;
const customerCount = async (_, res) => {
    try {
        const customerCount = await customerService.customerCount();
        if (!customerCount) {
            res.status(404).json({ message: "Not Customer Found" });
            return;
        }
        res.json(customerCount);
    }
    catch (error) {
        console.log("error :>> ", error);
        res.status(500).json(error);
    }
};
exports.customerCount = customerCount;
const searchCustomer = async (req, res) => {
    try {
        const search = await customerService.searchCustomer(req.query.q);
        if (!search) {
            res.status(404).json({ message: "Not Customer Found" });
            return;
        }
        res.json(search);
    }
    catch (error) {
        console.log("error :>> ", error);
        res.status(500).json(error);
    }
};
exports.searchCustomer = searchCustomer;
