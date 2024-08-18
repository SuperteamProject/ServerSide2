const request = require('supertest');
const app = require('../app');
const userModel = require('../model/userModel')

jest.mock('../model/userModel');

describe('User Controller', () => {
    test('should register a user successfully', async () => {
        userModel.registerUser.mockResolvedValue();

        const response = await request(app)
            .post('/api/v1/user-register')
            .send({
                firstname: 'John',
                lastname: 'Doe',
                email: 'john.doe@examplee.com',
                password: 'password123'
            });

        expect(response.statusCode).toBe(302); // Redirect after registration
    });

    test('should login a user successfully', async () => {
        userModel.findUserByEmail.mockResolvedValue({ email: 'john.doe@example.com', password: 'hashedPassword' });

        const response = await request(app)
            .post('/api/v1/user-login')
            .send({
                email: 'john.doe@examplee.com',
                password: 'password123'
            });

        expect(response.statusCode).toBe(302); // Redirect after login
    });

    test('should logout a user successfully', async () => {
        const response = await request(app).get('/api/v1/user-logout');
        expect(response.statusCode).toBe(302); // Redirect after logout
    });
});
