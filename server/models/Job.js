const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
{
  title: String,

  company: String,

  location: String,

  description: String,

  salary: String,

  requiredSkills: [String],

  recruiterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
},
{
  timestamps: true
}
);

module.exports =
mongoose.model("Job", jobSchema);