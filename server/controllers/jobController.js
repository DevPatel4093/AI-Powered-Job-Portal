const Job = require("../models/Job");
const User = require("../models/User");
// Create Job
exports.createJob = async (req, res) => {
  try {

    const job = await Job.create({
      ...req.body,
      recruiterId: req.user.id
    });

    res.status(201).json(job);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

// Get Recruiter's Jobs
exports.getMyJobs = async (req, res) => {
  try {

    const jobs = await Job.find({
      recruiterId: req.user.id
    });

    res.json(jobs);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

// Get All Jobs
exports.getJobs = async (req, res) => {
  try {

    const jobs = await Job.find()
      .populate("recruiterId", "name email");

    res.json(jobs);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

// Get Single Job
exports.getJob = async (req, res) => {
  try {

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    res.json(job);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

// Update Job
exports.updateJob = async (req, res) => {
  try {

    const job = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(job);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

// Delete Job
exports.deleteJob = async (req, res) => {
  try {

    await Job.findByIdAndDelete(req.params.id);

    res.json({
      message: "Job deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

exports.getRecommendedJobs = async (req, res) => {
  try {

    const candidate = await User.findById(req.user.id);

    const candidateSkills =
      candidate.skills || [];

    const jobs = await Job.find({
      title: { $exists: true, $ne: "" }
    });

    const recommendations = jobs.map((job) => {

      const requiredSkills =
        job.requiredSkills || [];

      if (requiredSkills.length === 0) {
        return {
          ...job._doc,
          recommendationScore: 0
        };
      }

      const matched = requiredSkills.filter(
        (skill) =>
          candidateSkills.includes(skill)
      );

      const score = Math.round(
        (matched.length / requiredSkills.length) * 100
      );

      return {
        ...job._doc,
        recommendationScore: score
      };
    });

    recommendations.sort(
      (a, b) =>
        b.recommendationScore -
        a.recommendationScore
    );

    res.json(recommendations);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};