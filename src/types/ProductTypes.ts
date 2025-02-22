import { Document } from "mongoose";
import { Query, Repository } from "./RepositoryTypes";

export interface Product extends Document {
    title: string;
    description: string;
    price: number;
    img_url?: string;
    status: boolean;
    stock: number;
    category: string
    tags?: [ string ];
}

export interface IProductRepository extends Repository<Product> {
    findOne(query: Query): Promise<Product | null>;
}

export interface IProductService {
    createProduct(product: Product): Promise<Product>;
    findProducts(query?: Query): Promise<Product[]>;
    findProductById(id: string): Promise<Product | null>;
    updateProduct(id: string, product: Partial<Product>): Promise<Product | null>;
    deleteProduct(id: string): Promise<boolean>;
}
