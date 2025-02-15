
import { Request, Response } from "express";
import { CustomerRepository, RevenueRepository } from "../repositories";
import { CustomerService, RevenueService } from "../services";
import { IRevenueRepository, IRevenueService, Revenue } from "../types/RevenueType";
import { ICustomerRepository, ICustomerService } from "../types/CustomerTypes";

const revenueRepository: IRevenueRepository = new RevenueRepository();
const revenueService: IRevenueService = new RevenueService(revenueRepository);

const customerRepository: ICustomerRepository = new CustomerRepository();
const customerService: ICustomerService = new CustomerService(customerRepository);

export const findRevenue = async (req: Request, res: Response) => {
  try {
    const revenue = await revenueService.findRevenues();
    if (revenue.length === 0) {
      res.status(404).json({ message: "no Revenue Found." });
      return
    }

    res.json(revenue);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
};

export const createRevenue = async (req: Request, res: Response) => {

  // const customerID = req.body.customer;
  // console.log('customerID :>>',customerID );


  try {
    // const customerExists = await customerService.findCustomerById(customerID);
    // if (!customerExists) {
    //   res.status(400).json({ message: "Customer does not exists" });
    //   return
    // }

    const newRevenue: Revenue = req.body;
    const result = await revenueService.createRevenues(newRevenue)

    res.status(201).json(result);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(400).json(error);
  }
};