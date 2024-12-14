import { Request, Response } from "express";
import ProductService from "../services/productService";

class ProductController {
  static getAllProducts(req: Request, res: Response): void {
    try {
      console.log({ req: req.headers });
      const products = ProductService.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "Something went wrong",
      });
    }
  }

  static getProductById(req: Request, res: Response): void {
    try {
      const productId = parseInt(req.params.id);
      const product = ProductService.getProductById(productId);
      res.json(product);
    } catch (error) {
      res.status(500).json({
        error: error instanceof Error ? error.message : "Something went wrong",
      });
    }
  }
}

export default ProductController;
