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

describe("GET /api/owners{:id/*}", () => {
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

  test("GET - 200: /api/owners - returns an array of all owners", () => {
    return request(app)
      .get("/api/owners")
      .expect(200)
      .then(({ body }) => {
        expect(body.length).not.toBe(0);
        body.forEach((owner) => {
          const { owner_id, name, age } = owner;
          expect(typeof owner_id).toBe("number");
          expect(typeof name).toBe("string");
          expect(typeof age).toBe("number");
        });
      });
  });

  test("GET - 200: /api/owners/:id/pets - returns an array of all pets of given owner", () => {
    return request(app)
      .get("/api/owners/3/pets")
      .expect(200)
      .then(({ body }) => {
        expect(body.length).not.toBe(0);
        body.forEach((pet) => {
          const {
            pet_id,
            name,
            avatar_url,
            fave_food,
            owner,
            age,
            temperament,
          } = pet;
          expect(typeof pet_id).toBe("number");
          expect(typeof name).toBe("string");
          expect(typeof avatar_url).toBe("string");
          expect(typeof fave_food).toBe("string");
          expect(typeof owner).toBe("number");
          expect(typeof age).toBe("number");
          expect(typeof temperament).toBe("string");
        });
      });
  });
});

describe("GET /api/pets{?*}", () => {
  test("GET /api/pets - returns an array of all pets", () => {
    return request(app)
      .get("/api/pets")
      .expect(200)
      .then(({ body }) => {
        expect(body.length).not.toBe(0);
        body.forEach((pet) => {
          const {
            pet_id,
            name,
            avatar_url,
            fave_food,
            owner,
            age,
            temperament,
          } = pet;
          expect(typeof pet_id).toBe("number");
          expect(typeof name).toBe("string");
          expect(typeof avatar_url).toBe("string");
          expect(typeof fave_food).toBe("string");
          expect(typeof owner).toBe("number");
          expect(typeof age).toBe("number");
          expect(typeof temperament).toBe("string");
        });
      });
  });

  test("GET /api/pets?temperament=*temperament returns an array of pets with given temperament", () => {
    return request(app)
      .get("/api/pets?temperament=grumpy")
      .expect(200)
      .then(({ body }) => {
        expect(body.length).not.toBe(0);
        body.forEach((pet) => {
          expect(pet.temperament).toBe("grumpy");
        });
      });
  });
});
