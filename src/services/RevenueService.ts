import { Query } from "../types/RepositoryTypes";
import { IRevenueRepository, IRevenueService, Revenue } from "../types/RevenueType";

export class RevenueService implements IRevenueService {
  private RevenueRepository: IRevenueRepository;

  constructor(RevenueRepository: IRevenueRepository) {
    this.RevenueRepository = RevenueRepository;
  }

  async findRevenues(query?: Query): Promise<Revenue[]> {
    return this.RevenueRepository.find(query);
  }
}