const request = require('supertest');
const app = require('../src/index');

describe('GET /api/stats', () => {
    it('should return stats', async () => {
        const res = await request(app).get('/api/stats');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('total');
        expect(res.body).toHaveProperty('averagePrice');
    });
});
