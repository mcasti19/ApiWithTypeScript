"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
const Product_1 = require("@models/Product");
class ProductRepository {
    // //TODO validar la implementacion de esta funcion.
    findOne(query) {
        throw new Error("Method not implemented.");
    }
    async create(data) {
        const newProduct = new Product_1.ProductModel(data);
        return await newProduct.save();
    }
    async find(query) {
        return await Product_1.ProductModel.find(query || {}).exec();
    }
    async findById(id) {
        return await Product_1.ProductModel.findById(id).exec();
    }
    async update(id, data) {
        return await Product_1.ProductModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    async delete(id) {
        const deleted = await Product_1.ProductModel.findByIdAndDelete(id).exec();
        return deleted !== null;
    }
}
exports.ProductRepository = ProductRepository;
