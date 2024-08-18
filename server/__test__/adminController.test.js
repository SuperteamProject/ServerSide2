// __tests__/adminController.test.js
const request = require('supertest');
const app = require('../app'); // Import app dari file yang benar

describe('Admin Controller', () => {
    test('should register an admin successfully', async () => {
        const response = await request(app)
            .post('/api/v1/admin-register')
            .send({
                username: 'admin',
                email: 'admin@exampleee.comm',
                password: 'password123'
            });
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('message', 'Admin berhasil terdaftar');
    });

    test('should login an admin successfully', async () => {
        const response = await request(app)
            .post('/api/v1/admin-login')
            .send({
                email: 'admin@example.com',
                password: 'password123'
            });
        expect(response.statusCode).toBe(302); // Redirect after login
    });

    test('should logout an admin successfully', async () => {
        const response = await request(app).get('/api/v1/admin-logout');
        expect(response.statusCode).toBe(302); // Redirect after logout
    });
});
