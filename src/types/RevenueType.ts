import { Document } from "mongoose";
import { Query, Repository } from "./RepositoryTypes";

export interface Revenue extends Document {
  month: string;
  revenue: string;
}

export interface IRevenueRepository {
  create(data: Revenue): Promise<Revenue>;
  find(query?: Query): Promise<Revenue[]>;
}

export interface IRevenueService {
  createRevenues(revenue: Revenue): Promise<Revenue>;
  findRevenues(query?: Query): Promise<Revenue[]>;
}