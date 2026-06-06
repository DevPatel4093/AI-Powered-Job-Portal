const mongoose = require("mongoose");

const applicationSchema =
new mongoose.Schema(
{
 candidateId: {
   type: mongoose.Schema.Types.ObjectId,
   ref: "User"
 },

 jobId: {
   type: mongoose.Schema.Types.ObjectId,
   ref: "Job"
 },

 matchScore: {
   type: Number,
   default: 0
 },

 missingSkills: {
  type: [String],
  default: []
},

 interviewDate: {
  type: String,
  default: ""
},

interviewTime: {
  type: String,
  default: ""
},

 status: {
   type: String,

   enum: [
     "Applied",
     "Under Review",
     "Shortlisted",
     "Rejected",
     "Selected"
   ],

   default: "Applied"
 }
},
{
 timestamps: true
}
);

module.exports =
mongoose.model(
 "Application",
 applicationSchema
);