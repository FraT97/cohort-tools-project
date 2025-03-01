const mongoose = require("mongoose");
const Schema= mongoose.Schema;  

const studentsSchema = new Schema({
    firstName: {type: String},
    LastName: {type: String},
    email: {type: String},
    phone: {type: String},
    linkedinUrl: {type: String},
    languages: {type: [String]},
    program: {type: String},
    background: {type: String},
    image: {type: String},
    cohort: {type: Schema.Types.ObjectId,
        ref: 'Cohorts'
    },
    projects: {type: [String]}
},{
    });

const Student = mongoose.model("Students", studentsSchema);
module.exports = Student;

