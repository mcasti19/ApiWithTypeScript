import { Document } from "mongoose";
import { Query, Repository } from "./RepositoryTypes";

export interface Revenue extends Document {
  month: string;
  revenue: string;
}

export interface IRevenueRepository {
  find(query?: Query): Promise<Revenue[]>;
}

export interface IRevenueService {
  findRevenues(query?: Query): Promise<Revenue[]>;
}