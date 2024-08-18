const request = require('supertest');
const app = require('../app');
const cloudinary = require('../utils/cloudinary');
const productModel = require('../model/productModel');

jest.mock('../utils/cloudinary');
jest.mock('../model/productModel');

describe('Product Controller', () => {
   

    test('should delete a product successfully', async () => {
        productModel.deleteProduct.mockResolvedValue(1);

        const response = await request(app).delete('/api/v1/1/delete-product');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Product deleted');
    });
});
