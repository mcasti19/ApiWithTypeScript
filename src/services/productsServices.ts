import { IProductRepository, IProductService, Product } from "../types/ProductTypes";
import { Query } from "../types/RepositoryTypes";

export class ProductService implements IProductService {
  private ProductRepository: IProductRepository;

  constructor(ProductRepository: IProductRepository) {
    this.ProductRepository = ProductRepository;
  }

  async createProduct(Product: Product): Promise<Product> {
    return this.ProductRepository.create(Product);
  }

  async findProducts(query?: Query): Promise<Product[]> {
    return this.ProductRepository.find(query);
  }

  async findProductById(id: string): Promise<Product | null> {
    return this.ProductRepository.findById(id);
  }

  async updateProduct(id: string, Product: Partial<Product>): Promise<Product | null> {
    return this.ProductRepository.update(id, Product);
  }

  async deleteProduct(id: string): Promise<boolean> {
    return this.ProductRepository.delete(id);
  }
}