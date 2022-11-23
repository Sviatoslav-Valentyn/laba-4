const request = require('supertest');
const app = require('../server/index.js');

describe("GET step1", () => {
    test("It should get me response", async () => {
      const response = await request(app).get("/");
      expect(response.statusCode).toBe(200);
    });
});

describe("POST /step2", () => {
  test("It should give me 500 status code", async () => {
    const response = await request(app).post("/step2").send({
      Number:"+380934545765"   
    });
    expect(response.statusCode).toBe(500);
  });
});

describe("POST /step3", () => {
  test("It should give me 500 status code", async () => {
    const response = await request(app).post("/step3");
    expect(response.statusCode).toBe(500);
  });
});
