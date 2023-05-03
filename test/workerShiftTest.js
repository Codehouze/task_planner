const expect = require("chai").expect;
const request = require("supertest");
const app = require("../app");
require("dotenv").config();

const mockWorkShift = {
  workerId: "633279d2907d62960301be50",
  shiftId: "633241a28ca148fc678287f6",
  startTime: "2024-11-29T08:00:00.000+01:00",
  endTime: "2024-11-29T16:00:00.000+01:00",
};

const mockWorkShift2 = {
  workerId: "633279d2907d62960301be50",
  shiftId: "633241998ca148fc678287f3",
  startTime: "16:00",
  endTime: "24:00",
};
const mockWorkShift3 = {
  workerId: "632f0162562bd67546312393",
  shiftId: "633241848ca148fc678287f0",
  startTime: "08:00",
  endTime: "16:00",
};
const mockWorkShift4 = {
  workerId: "632f0162562bd67546312393",
  shiftId: "633241848ca148fc678287f0",
  startTime: "00:00",
  endTime: "08:00",
};

describe("Shift Should be selected from the shift table]", () => {
  
  it.only("A Shift should ba within range specified in the timetable", async () => {
    const res = await request(app)
      .post("/api/v1/worker_shift/633279d2907d62960301be50")
      .send(mockWorkShift);
    console.log(res);
    expect(res._body.message).to.equal("Select a Shift from the timeTable");
    expect(res.status).to.equal(400);
  });
});
describe("Shift Should be eight hours interval", () => {
  it("A Shift Must be eight (8) hours interval]", async () => {
    const res = await request(app)
      .post("/api/v1/worker_shift/632efe0ec585195f481d293a")
      .send(mockWorkShift2);
    expect(res._body.message).to.equal(
      "Shift Duration must be eight hours interval"
    );
  });
});
describe("A worker never has two shifts on the same day ", () => {
  it.only("A Worker can only do one shift within twenty four (24) hours", async () => {
    const res = await request(app)
      .post("/api/v1/worker_shift/633279d2907d62960301be50")
      .send(mockWorkShift);
    expect(res._body.message).to.equal("Worker has a shift already");
    expect(res.status).to.equal(400);
  });
});
// describe("Shift Should be with in a day", () => {
//   it("A Shift Date and Time must be in the future", async () => {
//     const res = await request(app)
//       .post("/api/v1/worker_shift/633241848ca148fc678287f0")
//       .send(mockWorkShift3);
//     expect(res._body.message).to.equal("Date and Time must be in the future");
//     expect(res.status).to.equal(400);
//   });
// });
describe("Shift Start time must be less than end time", () => {
  it.only("Start time must be less than end time", async () => {
    const res = await request(app)
      .post("/api/v1/worker_shift/633241848ca148fc678287f0")
      .send(mockWorkShift4);
    expect(res._body.message).to.equal("Start time must be less than end time");
    expect(res.status).to.equal(400);
  });
});
