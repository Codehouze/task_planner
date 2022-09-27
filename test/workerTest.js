const expect = require("chai").expect;
const request = require("supertest");
const app = require("../app");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
require("dotenv").config();

const mockUser = {
  firstName: "Emmanuel",
  lastName: "Maxwell",
  email: "maxwe111@gmail.com",
  password: "Maxwell",
};

const mockUser2 = {
  firstName: "Emmanuel",
  lastName: "Maxwell",
  email: "maxwe111@gmail.com",
  password: "Maxwell",
};
const mockUser3 = {
  firstName: "Emmanmaxwell",
  lastName: "Maxwellemmma",
  email: "maxwe111@gmail.com",
  password: "Maxw",
};
describe("User Authentication", () => {
  before("Setting up db", async () => {
    const mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri();

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  it("User Should Signup Successfully", async () => {
    const res = await request(app).post("/api/users/").send(mockUser);
    expect(res.body.message).to.equal("User Created successfully");
  });

  it("User Should have a unique email to Signup Successfully", async () => {
    const res = await request(app).post("/api/users/").send(mockUser2);
    expect(res.body.message).to.equal("Account already exist");
    
  });

  it("User Should Not Signup If Password is Not Provided", async () => {
    const res = await request(app).post("/api/users/").send(mockUser3);
    expect(res.status).to.equal(422)
    expect(res.body.errors[0].msg).to.equal("Password are required and must be longer than 6 characters");
  
  });

  it("User Should login And Get A Token", async () => {
    const res = await request(app)
      .post("/api/users/login")
      .send({ email: "maxwe111@gmail.com", password: "Maxwell" });
    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal("login successfully");
    expect(res.body.data).to.not.equal(null);
  });
});

describe("Restrict Access to Getting List of Users to only Authorized Users", () => {
  let token;

  before("Login user", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send({ email: "maxwe111@gmail.com", password: "Maxwell" });
    token = response.body.data;
  });

  it("Authorized Users Should Get List Of All Users", async () => {
    const users = await request(app)
      .get("/api/users")
      .set("Authorization", token);
  });


  it("Unauthorized Users Should Not Get List Of All Users", async () => {
    const users = await request(app)
      .get("/api/users")
    expect(users.body.message).to.equal("Forbidden Request")
  });
});