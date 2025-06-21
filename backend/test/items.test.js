const request = require('supertest');
const app = require('../src/index');

describe('GET /api/items', () => {
    it('should return all items', async () => {
        const res = await request(app).get('/api/items');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it('should support q search', async () => {
        const res = await request(app).get('/api/items?q=Desk');console.log(res.body[0]);
        expect(res.statusCode).toBe(200);
        expect(res.body.some(i => i.name.includes('Desk'))).toBe(true);
    });

    it('should support q search even with small typos', async () => {
        const res = await request(app).get('/api/items?q=Desq');
        expect(res.statusCode).toBe(200);
        expect(res.body.some(i => i.name.includes('Desk'))).toBe(true);
    });

    it('should respect limit param', async () => {
        const res = await request(app).get('/api/items?limit=1');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(1);
    });
});

describe('POST /api/items', () => {
    it('should create a new item', async () => {
        const res = await request(app).post('/api/items').send({
            name: 'Test Item',
            category: 'Test',
            price: 100
        });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toBe('Test Item');
    });

    it('should reject invalid item', async () => {
        const res = await request(app).post('/api/items').send({
            name: '',
            category: '',
            price: 'abc'
        });

        expect(res.statusCode).toBe(400);
    });
});
