const mongoose = require("mongoose")
const request = require("supertest")
const app = require("../app");
require('dotenv').config()

beforeEach(async () => {
    await mongoose.connect(process.env.MONGO_URI);
});

afterEach(async () => {
    await mongoose.disconnect();
});

describe("GET /api/admin/destinations", () => {
    it('should return all the registered destinations', async() => {
        const res = await request(app).get('/api/admin/destinations');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
});
