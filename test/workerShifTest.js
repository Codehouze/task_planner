const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const sinon = require("sinon");
const jwt = require("jsonwebtoken");
const ShiftService = require("../api/services/shiftService");
const Shift = require("../api/model/shiftModel");
const Worker = require("../api/model/workerModel");
const WorkerShift = require("../api/model/workerShiftModel");
const WorkerService = require("../api/services/workerService");
const WorkerShiftService = require("../api/services/workerShiftService");
const moment = require("moment");
const dotenv = require("dotenv");
dotenv.config();

const { SECRET_KEY } = process.env;
chai.use(chaiAsPromised);
const expect = chai.expect;

describe("Work Planner  Unit testing", () => {
  let workerId;
  let shiftId;
  let newShift;
  beforeEach(() => {
    sinon.restore();
  });
  describe("User Token", function () {
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

  describe("Unit test for ShiftService", () => {
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
          startTime: "08:00",
          endTime: "16:00",
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
        newShift = {
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

    describe("getAllShift", () => {
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

      it("should return a message if shift is not found", async () => {
        const shiftId = "64541d50786c9a13ed6a9927";
        const mockShift = null;

        const findOneStub = sinon.stub(Shift, "findOne").resolves(mockShift);

        const shiftService = new ShiftService();

        const result = await shiftService.getOneShift(shiftId);

        expect(result).to.deep.equal({ message: "Shift Not found" });

        findOneStub.restore();
      });
    });
  });

  describe("WorkerShiftService", () => {
    describe("assignShift", () => {
      let workerShiftFindStub;
      let shiftFindOneStub;
      let momentFormatStub;
      let saveStub;

      beforeEach(() => {
        workerShiftFindStub = sinon.stub(WorkerShift, "find");
        shiftFindOneStub = sinon.stub(Shift, "findOne");
        momentFormatStub = sinon.stub().returns("2023-05-10 08:00");
        // sinon.stub(moment).returns({ format: momentFormatStub });
        saveStub = sinon.stub(WorkerShift, "create");
      });

      afterEach(() => {
        sinon.restore();
      });

      it("should return an error message if worker already has a shift on the same day", async () => {
        const data = {
          startTime: "2023-05-10 08:00",
          endTime: "2023-05-10 16:00",
          shiftId: shiftId,
          workerId: workerId,
        };
        workerShiftFindStub.resolves([
          { startTime: "2023-05-10 16:00", endTime: "2023-05-10 24:00" },
        ]);
        const workerShiftService = new WorkerShiftService();
        const result = await workerShiftService.assignShift(data);
        expect(result.message).to.equal(
          "Worker already has a shift on the same day"
        );
      });

      it("should return an error message if shift is not valid", async () => {
        const data = {
          startTime: "2023-05-10 08:00",
          endTime: "2023-05-10 16:00",
          shiftId: shiftId,
          workerId: workerId,
        };
        workerShiftFindStub.resolves([]);
        shiftFindOneStub.resolves({
          startTime: "2023-05-10 10:00",
          endTime: "2023-05-10 16:00",
        });
        const workerShiftService = new WorkerShiftService();
        const result = await workerShiftService.assignShift(data);
        expect(result.message).to.equal(
          "Select the right shift from already created shift"
        );
      });

      it("should create a new worker shift and return a success message", async () => {
        const data = {
          startTime: "2023-05-10 08:00",
          endTime: "2023-05-10 16:00",
          shiftId: shiftId,
          workerId: workerId,
        };
        workerShiftFindStub.resolves([]);
        shiftFindOneStub.resolves({
          startTime: "2023-05-10 08:00",
          endTime: "2023-05-10 16:00",
        });
        const workerShiftService = new WorkerShiftService();
        const result = await workerShiftService.assignShift(data);
        console.log(result);
        // expect(result.message).to.equal("Shift assigned successfully");
        expect(result.newShift.startTime).to.equal("2023-05-10 08:00");
        expect(result.newShift.endTime).to.equal("2023-05-10 16:00");
        expect(result.newShift.shiftId).to.equal(shiftId);
        expect(result.newShift.workerId).to.equal(workerId);
      });
    });
  });
});
