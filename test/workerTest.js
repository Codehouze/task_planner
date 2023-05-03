const expect = require("chai").expect;
const request = require("supertest");
const app = require("../app");
require("dotenv").config();

const mockUser = {
  _id: "632efdc3c585195f481d2936",
  name: "Emmanuel",
  email: "maxwe111@gmail.com",
  password: "Maxwell12345",
  gender: "Male",
};

const mockUser2 = {
  _id: "632f0162562bd67546312393",
  name: "EmmaMaxwell",
  email: "maxwe122@gmail.com",
  password: "Max",
  gender: "Male",
};
describe("Worker Authentication", () => {
  it("Worker Should Signup Successfully", async () => {
    const res = await request(app).post("/api/v1/auth/worker/").send(mockUser);
    expect(res._body.message).to.equal("Worker Created successfully");
    expect(res.status).to.equal(200);
  });

  it("Worker Should Not Signup If Password is Not Provided", async () => {
    const res = await request(app).post("/api/v1/auth/worker").send(mockUser2);
    expect(res.error.status).to.equal(422);
    expect(res._body.errors[0].msg).to.equal(
      "Password are required and must be longer than 6 characters"
    );
  });
});
