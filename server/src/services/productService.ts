 import mockProducts from '../__mocks__/mockProducts';
import { Product } from '../models/product';

class ProductService {
  static getAllProducts(): Product[] {
    return mockProducts;
  }

  static getProductById(id: number): Product {
    const product = mockProducts.find(p => p.id === id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }
}

export default ProductService;
