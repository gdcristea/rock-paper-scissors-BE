const request = require("supertest");
const express = require("express");
const bodyParser = require("express").json;
const authRoutes = require("../routes/auth");

const app = express();
app.use(bodyParser());
app.use("/api/auth", authRoutes);

describe("Auth Endpoints", () => {
  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/signup")
      .send({ username: "testUser", password: "test123" });

    expect(res.status).toEqual(201);
    expect(res.body.message).toEqual("User created");
  });

  it('should send an error if the user already exists', async () => {
    await request(app)
      .post("/api/auth/signup")
      .send({ username: "duplicated", password: "test123" });

    const res = await request(app)
      .post("/api/auth/signup")
      .send({ username: "duplicated", password: "test123" });

    expect(res.status).toEqual(400);
    expect(res.body.message).toEqual("User already exists");
  });

  it('should login with valid credentials', async () => {
    await request(app)
      .post("/api/auth/signup")
      .send({ username: "testUser", password: "test123" });

    const res = await request(app)
      .post("/api/auth/login")
      .send({ username: "testUser", password: "test123" });

    expect(res.body.message).toEqual("Login successful");
    expect(res.body).toHaveProperty('token');
  })

  it('should fail login with invalid credentials - user name', async () => {
    await request(app)
      .post("/api/auth/signup")
      .send({ username: "testUser", password: "test123" });

    const res = await request(app)
      .post("/api/auth/login")
      .send({ username: "wrongUser", password: "test123" });

    expect(res.status).toEqual(401);
    expect(res.body.message).toEqual("Invalid credentials");
  })

  it('should fail login with invalid credentials - password', async () => {
    await request(app)
      .post("/api/auth/signup")
      .send({ username: "testUser", password: "test123" });

    const res = await request(app)
      .post("/api/auth/login")
      .send({ username: "testUser", password: "wrongPassword" });

    expect(res.status).toEqual(401);
    expect(res.body.message).toEqual("Invalid credentials");
  })
});
