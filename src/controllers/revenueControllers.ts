
import { Request, Response } from "express";
import { RevenueRepository } from "../repositories";
import { RevenueService } from "../services";
import { IRevenueRepository, IRevenueService, Revenue } from "../types/RevenueType";

const revenueRepository: IRevenueRepository = new RevenueRepository();
const revenueService: IRevenueService = new RevenueService(revenueRepository);

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