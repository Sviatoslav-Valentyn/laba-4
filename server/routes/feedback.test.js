const request = require('supertest');
const app = require('../index.js');

describe("GET /feedback", () => {
    it('should get comment by id', async () => {
      
      const res = await request(app)
      .get('/feedback')/*enter id after '/' */
      expect(res.status).toBe(200);
    })
});

describe("POST /feedback", () => {
    test("It should post one comment", async () => {
      const response = await request(app).post("/feedback").send({
          Comment:'WPGG',
          ID_User:'1'
      });
      expect(response.statusCode).toBe(200);
    });
});

describe("DELETE /feedback/:id", () => {
    it('should delete comment in db', async () => {
      
      const res = await request(app)
      .delete('/feedback/byId/34')/*enter id after '/' */
  
      expect(res.status).toBe(464);
    })
});