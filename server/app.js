const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const mongoose = require ('mongoose');
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/cohorts-db'


// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
import ('./db/index.js')
const cohorts = require("./cohorts.json");
const students = require("./students.json");
const Cohort = require('./models/cohorts.models.js');
const Student = require('./models/students.models.js');

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();


// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

app.get("/api/cohorts", (req, res) => {
  res.json(cohorts);
});

app.get("/api/students", (req, res) => {
  res.json(students);
})

app.post('/api/students', (req,res) => {
  const newStudent = new Student(req.body);
    res.json(newStudent);
})

app.get('/api/students', (req,res) => {
  const students = students.find();
  res.json(students);
})

app.get('/api/students/cohort/:cohortId', (req,res) => {
  const students = students.find({cohort: req.params.cohortId});
  res.json(students);

})

app.get('/api/students/:studentId', (req,res) => {
  const student= students.findById(req.params.studentId);
  res.json(student);
})

app.put('/api/students/:studentId', (req,res) =>{
  const student = students.findByIdAndUpdate(req.params.studentId, req.body);
  res.json(student);
})

app.delete('/api/students/:studentId', (req, res) => {
  const student = students.findByIdAndDelete(req.params.studentId);
  res.json(student);
})


app.post('/api/cohorts', (req,res) => {
  const newCohort = new Cohort(req.body);
  res.json(newCohort);
})


app.get('/api/cohorts', (req,res) => {
  const cohorts = cohorts.find();
  res.json(cohorts);
})


app.get('/api/cohorts/:cohortId', (req,res) => {
  const cohort = cohorts.findById(req.params.cohortId);
  res.json(cohort);
})

app.put('/api/cohorts/:cohortId', (req,res) => {
  const cohort = cohorts.findByIdAndUpdate(req.params.cohortId, req.body);
  res.json(cohort);
})

app.delete('/api/cohorts/:cohortId', (req,res) => {
  const cohort = cohorts.findByIdAndDelete(req.params.cohortId);
   res.json(cohort);
})


// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});