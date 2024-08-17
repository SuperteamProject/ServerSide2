const request = require('supertest');
const app = require('../app');

describe('Cart API', () => {
  it('should add product to cart', async () => {
    const response = await request(app)
      .post('/api/v1/add-to-cart')
      .send({ user_id:2,product_id: 1, quantity: 2 });
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Product has been add to cart');
    // done();
  });

  it('should get cart', async () => {
    const res = await request(app).get('/api/v1/get-product-to-cart/2');
    expect(res.statusCode).toEqual(200);
    // expect(res.body).toHaveLength(1);
    expect(res.body[0]).toHaveProperty('name');
    expect(res.body[0]).toHaveProperty('price');
    expect(res.body[0]).toHaveProperty('quantity');
  });

  it('delete cart', async () =>{
    const response = await request(app)
      .delete("/api/v1/5/delete-cart")      
    expect(response.statusCode).toBe(201);
  })
});