// write your tests in here!
const db = require("../db/connection");
const seed = require("../db/seeding/seed");
const data = require("../db/data/test-data");
const request = require("supertest");
const { app } = require("../app");
// app.use(express.json());

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  db.end();
});

describe("GET API Testing /owners", () => {
  test("GET - 200: /api/owners/:id", () => {
    return request(app)
      .get("/api/owners/3")
      .expect(200)
      .then(({ body }) => {
        const { owner_id, name, age } = body;
        expect(owner_id).toBe(3);
        expect(typeof name).toBe("string");
        expect(typeof age).toBe("number");
      });
  });
  test("GET - 200: /api/owners", () => {
    return request(app)
      .get("/api/owners")
      .expect(200)
      .then(({ body }) => {
        expect(body.length).toBeGreaterThan(0);
        body.forEach((element) => {
          const { owner_id, name, age } = element;
          expect(typeof owner_id).toBe("number");
          expect(typeof name).toBe("string");
          expect(typeof age).toBe("number");
        });
      });
  });
});
