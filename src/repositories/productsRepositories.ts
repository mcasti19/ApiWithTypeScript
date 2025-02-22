
import { ProductModel } from "@models/Product";
import { IProductRepository, Product } from "../types/ProductTypes";
import { Query } from "../types/RepositoryTypes";

export class ProductRepository implements IProductRepository {

    // //TODO validar la implementacion de esta funcion.
    findOne(query: Query): Promise<Product | null> {
        throw new Error("Method not implemented.");
    }

    async create(data: Product): Promise<Product> {
        const newProduct = new ProductModel(data);
        return await newProduct.save();
    }

    async find(query?: Query): Promise<Product[]> {
        return await ProductModel.find(query || {}).exec();
    }

    async findById(id: string): Promise<Product | null> {
        return await ProductModel.findById(id).exec();
    }

    async update(id: string, data: Partial<Product>): Promise<Product | null> {
        return await ProductModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    async delete(id: string): Promise<boolean> {
        const deleted = await ProductModel.findByIdAndDelete(id).exec();
        return deleted !== null;
    }
}