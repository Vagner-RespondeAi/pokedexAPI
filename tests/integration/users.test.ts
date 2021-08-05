import supertest from "supertest";

import app from "../../src/app";
import { createNewUser, registerUser } from "../factories/userFactory";
import { clearDatabase, endConnection, startConnection } from "../utils/database";

beforeAll(startConnection);
afterAll(endConnection);
beforeEach(clearDatabase)

describe("POST /sign-up", () => {
  it("should answer with status 400 for invalid email", async () => {
  const newUser = createNewUser();
  newUser.email = "abcde";
  const result = await supertest(app).post('/sign-up').send(newUser);
  expect(result.status).toBe(400)
  });
  it("should answer with status 400 for password with less than 3 charcters", async () => {
    const newUser = createNewUser();
    newUser.password = "ab";
    const result = await supertest(app).post('/sign-up').send(newUser);
    expect(result.status).toBe(400)
  });
  it("should answer with status 400 for invalid password confirmation", async () => {
    const newUser = createNewUser();
    newUser.confirmPassword = "abcde";
    const result = await supertest(app).post('/sign-up').send(newUser);
    expect(result.status).toBe(400)
  });
  it("should answer with status 409 for email alredy registered", async () => {
    const user = await registerUser();
    const newUser = {...user,confirmPassword:user.password};
    const result = await supertest(app).post('/sign-up').send(newUser);
    expect(result.status).toBe(409)
  });
  it("should answer with status 201 valid params", async () => {
    const newUser = createNewUser();
    const result = await supertest(app).post('/sign-up').send(newUser);
    expect(result.status).toBe(201)
  });
});

describe("POST /sign-in", () => {
  it("should answer with status 400 for invalid email", async () => {
  const user = await registerUser();
  user.email = "abcde";
  const result = await supertest(app).post('/sign-in').send(user);
  expect(result.status).toBe(400)
  });
  it("should answer with status 401 for nonexistent email", async () => {
    const user = await registerUser();
    user.email += '.br'
    const result = await supertest(app).post('/sign-in').send(user);
    expect(result.status).toBe(401)
  });
  it("should answer with status 401 for invalid password", async () => {
    const user = await registerUser();
    user.password += '123'
    const result = await supertest(app).post('/sign-in').send(user);
    expect(result.status).toBe(401)
  });
  it("should answer with status 200 for valid params", async () => {
    const user = await registerUser();
    const result = await supertest(app).post('/sign-in').send(user);
    expect(result.status).toBe(200)
  });
  it("should answer with object containing a token for valid params", async () => {
    const user = await registerUser();
    const result = await supertest(app).post('/sign-in').send(user);
    expect(result.body).toEqual(expect.objectContaining({
      token:expect.any(String)
    }))
  });
});

