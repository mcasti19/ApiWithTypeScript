"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.findProductById = exports.findProducts = void 0;
const productsRepositories_1 = require("@repositories/productsRepositories");
const productsServices_1 = require("@services/productsServices");
const productRepository = new productsRepositories_1.ProductRepository();
const productService = new productsServices_1.ProductService(productRepository);
const findProducts = async (req, res) => {
    console.log("req findPosts:>> ", req.currentUser);
    try {
        const product = await productService.findProducts();
        if (product.length === 0) {
            res.status(404).json({ message: "no Product Found." });
            return;
        }
        res.json(product);
    }
    catch (error) {
        console.log("error :>> ", error);
        res.status(500).json(error);
    }
};
exports.findProducts = findProducts;
const findProductById = async (req, res) => {
    try {
        const Product = await productService.findProductById(req.params.id);
        if (!Product) {
            res.status(404).json({ message: "Not Product Found" });
            return;
        }
        res.json(Product);
    }
    catch (error) {
        console.log("error :>> ", error);
        res.status(500).json(error);
    }
};
exports.findProductById = findProductById;
const createProduct = async (req, res) => {
    try {
        const newProduct = req.body;
        const result = await productService.createProduct(newProduct);
        res.status(201).json(result);
    }
    catch (error) {
        console.log("error :>> ", error);
        res.status(400).json(error);
    }
};
exports.createProduct = createProduct;
const updateProduct = async (req, res) => {
    try {
        const newProduct = await productService.updateProduct(req.params.id, req.body);
        if (!newProduct) {
            res.status(404).json({ message: "Not Product Found" });
            return;
        }
        res.json(newProduct);
    }
    catch (error) {
        console.log("error :>> ", error);
        res.status(500).json(error);
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    try {
        const Product = await productService.deleteProduct(req.params.id);
        if (!Product) {
            res.status(404).json({ message: "Not Product Found" });
            return;
        }
        res.json(Product);
    }
    catch (error) {
        console.log("error :>> ", error);
        res.status(500).json(error);
    }
};
exports.deleteProduct = deleteProduct;
