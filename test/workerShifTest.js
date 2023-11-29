const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const sinon = require("sinon");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const ShiftService = require("../api/services/shiftService");
const Shift = require("../api/model/shiftModel");
const Worker = require("../api/model/workerModel");
const WorkerShift = require("../api/model/workerShiftModel");
const WorkerService = require("../api/services/workerService");
const WorkerShiftService = require("../api/services/workerShiftService");

const dotenv = require("dotenv");
const { doesNotMatch } = require("assert");
dotenv.config();

const { SECRET_KEY } = process.env;
chai.use(chaiAsPromised);
const expect = chai.expect;

describe("User Authentication", function () {
  it("should return a valid authentication token", () => {
    const worker = new Worker();

    (worker.id = "6453bc6bb2bcb094b89a3f04"),
      (worker.name = "John Doe"),
      (worker.email = "johndoe@example.com"),
      (worker.gender = "male"),
      (worker.password = "password123");
    workerId = worker.id;
    const email = worker.email;
    authToken = jwt.sign({ workerId, email }, SECRET_KEY);
    expect(authToken).to.be.a("string");
    expect(authToken).to.be.a("string");
  });
});


describe("Work Planner Unit testing", () => {
  let workerId;
  let shiftId;
  let scheduledDate;

  beforeEach(() => {
    sinon.restore();
  });

  describe("Test ShiftServices", () => {
    describe("createWorkShift", () => {
      let shiftStub;

      beforeEach(() => {
        shiftStub = sinon.stub(Shift, "findOne");
      });

      afterEach(() => {
        shiftStub.restore();
      });

      it("should return a message that the shift already exists if the shift already exists", async () => {
        const shiftService = new ShiftService();
        const existingShift = {
          name: "morning",
          startTime: "00:00",
          endTime: "08:00",
        };
        shiftStub.resolves(existingShift);

        const result = await shiftService.createWorkShift({
          name: "morning",
          startTime: "00:00",
          endTime: "08:00",
        });

        expect(shiftStub.calledOnceWith({ name: "morning" })).to.be.true;
        expect(result).to.deep.equal({ message: "Shift already exist" });
      });

      it("should return an error message if the shift start time is greater than the end time", async () => {
        const shiftService = new ShiftService();
        const result = await shiftService.createWorkShift({
          name: "Afternoon Shift",
          startTime: "17:00",
          endTime: "15:00",
        });

        expect(result).to.deep.equal({
          message: "Start time must be before end time",
        });
      });

      it("should create a new shift if it does not already exist and start time is less than end time", async () => {
        const shiftService = new ShiftService();
        const newShift = {
          id: "64541d6d786c9a13ed6a9405",
          name: "afternoon",
          startTime: "08:00",
          endTime: "16:00",
        };
        shiftId = newShift.id;
        shiftStub.resolves(null);
        sinon.stub(Shift.prototype, "save").resolves(newShift);

        const result = await shiftService.createWorkShift({
          id: "64541d6d786c9a13ed6a9405",
          name: "afternoon",
          startTime: "08:00",
          endTime: "16:00",
        });

        expect(shiftStub.calledOnceWith({ name: "afternoon" })).to.be.true;
        expect(result).to.deep.equal({
          message: "afternoon created successfully.",
          newShift,
        });
      });
    });

    describe("GetAllShift", () => {
      it("should return all shifts", async () => {
        const shiftData = [{ name: "Morning Shift" }, { name: "Night Shift" }];
        const findStub = sinon.stub(Shift, "find").resolves(shiftData);
        const shiftService = new ShiftService();

        const result = await shiftService.getAllShift();

        expect(findStub.calledOnce).to.be.true;
        expect(result).to.deep.equal(shiftData);

        findStub.restore();
      });

      it("should return error message if shifts are not found", async () => {
        const findStub = sinon.stub(Shift, "find").resolves(null);
        const shiftService = new ShiftService();

        const result = await shiftService.getAllShift();

        expect(findStub.calledOnce).to.be.true;
        expect(result).to.deep.equal({ message: "Shift Not found" });

        findStub.restore();
      });
    });
    describe("getOneShift", () => {
      it("should return the shift if found", async () => {
        const shiftId = "64541d50786c9a13ed6a9402";
        const mockShift = { id: shiftId, name: "Morning" };

        const findOneStub = sinon.stub(Shift, "findOne").resolves(mockShift);

        const shiftService = new ShiftService();

        const result = await shiftService.getOneShift(shiftId);

        expect(result).to.deep.equal(mockShift);

        findOneStub.restore();
      });

      // it("should return a message if shift is not found", async () => {
      //   const shiftId = "64541d50786c9a13ed6a9927";
      //   const mockShift = null;

      //   const findOneStub = sinon.stub(Shift, "findOne").resolves(mockShift);

      //   const shiftService = new ShiftService();

      //   const result = await shiftService.getOneShift(shiftId);

      //   expect(result).to.deep.equal({ message: "Shift Not found" });

      //   findOneStub.restore();
      // });
    });
  });

  describe("Test WorkerShiftService", () => {
    describe("assignShift", () => {
      let workerShiftStub;

      beforeEach(() => {
        workerShiftStub = sinon.stub(WorkerShift, "find");
      });

      afterEach(() => {
        sinon.restore();
      });

      it("should create a new worker shift and return success message", async () => {
        const workerShiftService = new WorkerShiftService();
        const workerShift = {
          shiftId: "6566f63e4e4c060c71c7e51c",
          workerId: "6566ef08f27bd7cc1fca2e13",
          scheduledDate: "2023-11-01"
        };
        workerShiftStub.resolves(null);
        sinon.stub(WorkerShift.prototype, "save").resolves(workerShift);
        const result = await workerShiftService.assignShift(workerShift);
        await Promise.resolve();
        expect(workerShiftStub.calledOnce).to.be.true;
        expect(result.message).to.equal("Shift assigned successfully");
      });
      it('should return an error message if worker already has a shift on the same day', async () => {
        // Mock existing shift data for the same day
        const existingShiftData = [
          {
            workerId: 'existingWorkerId',
            shiftId: 'existingShiftId',
            scheduledDate: '2023-12-01',
          },
        ];
  
        // Resolve the findStub with the mock data
        workerShiftStub.resolves(existingShiftData);
  
        // Create an instance of WorkerShiftService
        const workerShiftService = new WorkerShiftService();
  
        // Mock data for the new shift
        const data = {
          workerId: 'newWorkerId',
          shiftId: 'newShiftId',
          scheduledDate: '2023-12-01',
        };
  
        // Execute the assignShift method
        const result = await workerShiftService.assignShift(data);
  
        // Expect the result to have an error message
        expect(result.message).to.equal('Worker already has a shift on the same day');
  
        // Restore the stub after the test
        workerShiftStub.restore();
      });

    });
  });
});
