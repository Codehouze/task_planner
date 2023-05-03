const expect = require("chai").expect;
const request = require("supertest");
const app = require("../app");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
require("dotenv").config();

const mockShift = {
  _id: "633241848ca148fc678287f0",
  startHour: 2,
  endHour: 8,
  name: "Morning Shift[0-8]",
};

const mockShift2 = {
  _id: "633241998ca148fc678287f3",
  startHour: 8,
  endHour: 16,
  name: "Afternoon Shift[0-8]",
};
const mockShift3 = {
  id: "633241a28ca148fc678287f6",
  startHour: 16,
  endHour: 24,
  name: "Evening Shift[16-24]",
};
describe("Shift Should be created successfully", () => {
  before("Setting up db", async () => {
    const mongo = await MongoMemoryServer.create();
    const uri = mongo.getUri();

    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  it("A Shift Should be eight hours interval", async () => {
    const res = await request(app).post("/api/v1/shift/").send(mockShift);
    expect(res._body.message).to.equal("A shift must be 8 hours long");
    expect(res.status).to.equal(400);
  });

  it.only("Shift should be a number", async () => {
    const res = await request(app).post("/api/v1/shift/").send(mockShift3);
    console.log(res);
    expect(res.status).to.equal(200);
  });
});
