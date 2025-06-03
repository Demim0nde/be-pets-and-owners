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
  test("GET - 200: /api/owners/:id - returns the single owner at parametric endpoint", () => {
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
  test("GET - 200: /api/owners - returns array of all owners", () => {
    return request(app)
      .get("/api/owners")
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body)).toBe(true);
        body.forEach((element) => {
          const { owner_id, name, age } = element;
          expect(typeof owner_id).toBe("number");
          expect(typeof name).toBe("string");
          expect(typeof age).toBe("number");
        });
      });
  });
  test("GET - 200: /api/owners/:id/pets - returns array of all pets for owner at parametric endpoint where owner exists", () => {
    return request(app)
      .get("/api/owners/2/pets")
      .then(({ body }) => {
        expect(Array.isArray(body)).toBe(true);
        if (body.length > 0) {
          expect(200);
          body.forEach((element) => {
            const {
              pet_id,
              name,
              avatar_url,
              fave_food,
              owner,
              age,
              temperament,
            } = element;
            expect(typeof pet_id).toBe("number");
            expect(typeof name).toBe("string");
            expect(typeof avatar_url).toBe("string");
            expect(typeof fave_food).toBe("string");
            expect(typeof owner).toBe("number");
            expect(typeof age).toBe("number");
            expect(typeof temperament).toBe("string");
          });
        } else {
          expect(404);
        }
      });
  });
  test("GET - 404: /api/owners/:id/pets - returns 'error 404' for owner at parametric endpoint where owner does not exists", () => {
    return request(app)
      .get("/api/owners/202/pets")
      .then(({ body }) => {
        expect(Array.isArray(body)).toBe(true);
        if (body.length > 0) {
          expect(200);
          body.forEach((element) => {
            const {
              pet_id,
              name,
              avatar_url,
              fave_food,
              owner,
              age,
              temperament,
            } = element;
            expect(typeof pet_id).toBe("number");
            expect(typeof name).toBe("string");
            expect(typeof avatar_url).toBe("string");
            expect(typeof fave_food).toBe("string");
            expect(typeof owner).toBe("number");
            expect(typeof age).toBe("number");
            expect(typeof temperament).toBe("string");
          });
        } else {
          expect(404);
        }
      });
  });
});

describe("GET API Testing /pets", () => {
  test("GET - 200: /api/pets - returns an array of all pets", () => {
    return request(app)
      .get("/api/pets")
      .then(({ body }) => {
        expect(Array.isArray(body)).toBe(true);
        if (body.length > 0) {
          expect(200);
          body.forEach((element) => {
            const {
              pet_id,
              name,
              avatar_url,
              fave_food,
              owner,
              age,
              temperament,
            } = element;
            expect(typeof pet_id).toBe("number");
            expect(typeof name).toBe("string");
            expect(typeof avatar_url).toBe("string");
            expect(typeof fave_food).toBe("string");
            expect(typeof owner).toBe("number");
            expect(typeof age).toBe("number");
            expect(typeof temperament).toBe("string");
          });
        } else {
          expect(404);
        }
      });
  });
});
