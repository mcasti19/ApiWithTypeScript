import { ProductRepository } from "@repositories/productsRepositories";
import { IProductRepository, IProductService, Product } from '../types/ProductTypes';
import { ProductService } from "@services/productsServices";
import { Request, Response } from "express";


const productRepository: IProductRepository = new ProductRepository();
const productService: IProductService = new ProductService(productRepository);

export const findProducts = async (req: Request, res: Response): Promise<void> => {
  console.log("req findPosts:>> ", req.currentUser);
  try {
    const product = await productService.findProducts();
    if (product.length === 0) {
      res.status(404).json({ message: "no Product Found." });
      return
    }

    res.json(product);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
};

export const findProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const Product = await productService.findProductById(req.params.id);

    if (!Product) {
      res.status(404).json({ message: "Not Product Found" });
      return
    }
    res.json(Product);

  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const newProduct: Product = req.body;
    const result = await productService.createProduct(newProduct);

    res.status(201).json(result);
  } catch (error) {
    console.log("error :>> ", error);
    res.status(400).json(error);
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const newProduct = await productService.updateProduct(req.params.id, req.body);
    if (!newProduct) {
      res.status(404).json({ message: "Not Product Found" });
      return
    }
    res.json(newProduct);

  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const Product = await productService.deleteProduct(req.params.id);
    if (!Product) {
      res.status(404).json({ message: "Not Product Found" });
      return
    }
    res.json(Product);

  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json(error);
  }
};