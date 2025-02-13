import { RevenueModel } from "@models";
import { Query } from "../types/RepositoryTypes";
import { IRevenueRepository, Revenue } from "../types/RevenueType";

export class RevenueRepository implements IRevenueRepository {
  async find(query?: Query): Promise<Revenue[]> {
    return await RevenueModel.find(query || {}).exec();
  }
}