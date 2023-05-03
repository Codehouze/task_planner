// Import required packages
const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');

// Initialize the app
const app = express();

// Configure body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define the data structure
const shifts = [];

// Define the routes

// Get all shifts
app.get('/shifts', (req, res) => {
  res.status(200).json(shifts);
});

// Get all shifts for a worker
app.get('/shifts/:worker', (req, res) => {
  const workerShifts = shifts.filter(shift => shift.worker === req.params.worker);
  res.status(200).json(workerShifts);
});

// Create a new shift
app.post('/shifts', (req, res) => {
  // Validate the request body
  if (!req.body.worker || !req.body.date || !req.body.shift) {
    res.status(400).json({ message: 'Invalid request body' });
  }

  // Check if the worker already has a shift on the same date
  const workerShifts = shifts.filter(shift => shift.worker === req.body.worker && shift.date === req.body.date);
  if (workerShifts.length > 0) {
    res.status(409).json({ message: 'Worker already has a shift on the same date' });
  }

  // Calculate the shift start and end times based on the shift number
  let startTime, endTime;
  switch (req.body.shift) {
    case 1:
      startTime = moment(req.body.date).hour(0);
      endTime = moment(req.body.date).hour(8);
      break;
    case 2:
      startTime = moment(req.body.date).hour(8);
      endTime = moment(req.body.date).hour(16);
      break;
    case 3:
      startTime = moment(req.body.date).hour(16);
      endTime = moment(req.body.date).hour(24);
      break;
    default:
      res.status(400).json({ message: 'Invalid shift number' });
      return;
  }

  // Add the new shift to the data structure
  shifts.push({
    worker: req.body.worker,
    date: req.body.date,
    shift: req.body.shift,
    startTime: startTime.toISOString(),
    endTime: endTime.toISOString()
  });

  // Send a response
  res.status(201).json({ message: 'Shift created successfully' });
});

// Define the server port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
