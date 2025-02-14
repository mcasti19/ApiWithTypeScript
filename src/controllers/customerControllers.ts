import { CustomerRepository } from "../repositories";
import { CustomerService } from "../services";
import { Request, Response } from "express";
import { ICustomerRepository, ICustomerService, Customer } from "../types/CustomerTypes";

const customerRepository: ICustomerRepository = new CustomerRepository();
const customerService: ICustomerService = new CustomerService(customerRepository);

export const findCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await customerService.findCustomers();
    if (customer.length === 0) {
      res.status(404).json({ message: "no Customer Found." });
      return
    }

    res.json(customer);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
};

export const findCustomerById = async (req: Request, res: Response) => {
  try {
    const customer = await customerService.findCustomerById(req.params.id);
    if (!customer) {
      res.status(404).json({ message: "Not Customer Found" });
      return
    }

    res.json(customer);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
};

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const newCustomer: Customer = req.body;
    const result = await customerService.createCustomer(newCustomer);

    res.status(201).json(result);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(400).json(error);
  }
};

export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await customerService.updateCustomer(req.params.id, req.body);
    if (!customer) {
      res.status(404).json({ message: "Not Customer Found" });
      return
    }

    res.json(customer);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
};

export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await customerService.deleteCustomer(req.params.id);
    if (!customer) {
      res.status(404).json({ message: "Not Customer Found" });
      return
    }

    res.json(customer);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
};

export const customerCount = async (_: Request, res: Response) => {
  try {
    const customerCount = await customerService.customerCount();
    if (!customerCount) {
      res.status(404).json({ message: "Not Customer Found" });
      return
    }

    res.json(customerCount);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
};

export const searchCustomer = async (req: Request, res: Response) => {
  try {
    const search = await customerService.searchCustomer(req.query.q as string);
    if (!search) {
      res.status(404).json({ message: "Not Customer Found" });
      return
    }

    res.json(search);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
};