const mongoose = require("mongoose");

const candidateProfileSchema =
new mongoose.Schema(
{
 userId: {
   type: mongoose.Schema.Types.ObjectId,
   ref: "User"
 },

 skills: [String],

 education: String,

 experience: String,

 resumeUrl: String
},
{
 timestamps: true
}
);

module.exports =
mongoose.model(
 "CandidateProfile",
 candidateProfileSchema
);