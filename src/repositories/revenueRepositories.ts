import { RevenueModel } from "../models";
import { Query } from "../types/RepositoryTypes";
import { IRevenueRepository, Revenue } from "../types/RevenueType";

export class RevenueRepository implements IRevenueRepository {

  async create(data: Revenue): Promise<Revenue> {
    const newRevenues = new RevenueModel(data);
    return await newRevenues.save();
  }

  async find(query?: Query): Promise<Revenue[]> {
    return await RevenueModel.find(query || {}).exec();
  }

}