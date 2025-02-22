"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
class ProductService {
    constructor(ProductRepository) {
        this.ProductRepository = ProductRepository;
    }
    async createProduct(Product) {
        return this.ProductRepository.create(Product);
    }
    async findProducts(query) {
        return this.ProductRepository.find(query);
    }
    async findProductById(id) {
        return this.ProductRepository.findById(id);
    }
    async updateProduct(id, Product) {
        return this.ProductRepository.update(id, Product);
    }
    async deleteProduct(id) {
        return this.ProductRepository.delete(id);
    }
}
exports.ProductService = ProductService;
