// write your tests in here!
const db = require("../db/connection");
const seed = require("../db/seeding/seed");
const data = require("../db/data/test-data");
const request = require("supertest");
const app = require("../app");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  db.end();
});

describe("Complete me...", () => {
  test("Write your first test here...", () => {});
});
