import ProductService from '../productService';
 import { Product } from '../../models/product';
import mockProducts from '../../__mocks__/mockProducts';

// jest.mock('../__mocks__/mockProducts', () => mockProducts);

describe('ProductService', () => {
  describe('getAllProducts', () => {
    it('should return all products', () => {
      const products: Product[] = ProductService.getAllProducts();
      expect(products).toEqual(mockProducts);
    });
  });

  describe('getProductById', () => {
    it('should return a product with a valid ID', () => {
      const productId = 1;
      const product = ProductService.getProductById(productId);
      expect(product).toEqual(mockProducts[0]);
    });

    it('should throw an error for an invalid ID', () => {
      const invalidId = 999;
      expect(() => ProductService.getProductById(invalidId)).toThrow('Product not found');
    });
  });
});
