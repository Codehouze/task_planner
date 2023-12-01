/**
 * @swagger
 * tags:
 *   name: Worker
 *   description: Manage Worker API
 * paths:
 *   /worker:
 *     get:
 *       summary: Get all worker
 *       tags: [Worker]
 *       responses:
 *         200:
 *           description: Successful response. Returns a list of workers.
 *     
 *     post:
 *       summary: Sign up a worker.
 *       tags: [Worker]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 password:
 *                   type: string
 *                 email:
 *                   type: string
 *                 gender:
 *                   type: string
 *               required:
 *                 - name
 *                 - password
 *                 - email
 *                 - gender
 *       responses:
 *         201:
 *           description: Worker created successfully.  
 *        
 *   /worker/{id}:
 *     get:
 *       summary: Get a worker by ID
 *       tags: [Worker]
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: The ID of the worker
 *       responses:
 *         200:
 *           description: Successful response. Returns the requested worker.
 *         404:
 *           description: worker not found.
 *   /worker/login   
 *     post:
 *       summary: Sign up a worker.
 *       tags: [Worker]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 password:
 *                   type: string
 *                 email:
 *                   type: string
 *               required:
 *                 - password
 *                 - email
 *       responses:
 *         200:
 *           description: Successful response. Returns token.
 *         404:
 *           description: incorrect user name or password.
 *     
 *     
 */

const workerCtrl = require("../controller/workerCtrl");
const validator = require("../middleware/validate");
const { validateRequest } = require("../middleware/requestValidator");
const isAuthenticated = require("../utils/Authenticate");

const router = require("express").Router();

router.post(
  "/",
  validator.signUpValidator,
  validateRequest,
  workerCtrl.createWorker
);

router.post(
  "/login",
  validator.signInValidator,
  validateRequest,
  workerCtrl.workerLogin
);

router.get("/", isAuthenticated, workerCtrl.getAllWorkers);

router.get("/:id", isAuthenticated, workerCtrl.getOneWorker);

module.exports = router;
