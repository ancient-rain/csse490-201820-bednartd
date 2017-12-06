const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  sessionNumber: Number,
  sessionWeekDay: String,
  sessionDate: Date,
  week: Number
});

const scheduleSchema = new mongoose.Schema({
  sessionDays: String,
  startDate: Date,
  startWeekNumber: Number,
  breakStartDate: Date,
  resumeDate: Date,
  numberOfSessions: Number,
  sessions: [sessionSchema]
});

const Schedule = mongoose.model('Schedule', scheduleSchema);
module.exports = Schedule;