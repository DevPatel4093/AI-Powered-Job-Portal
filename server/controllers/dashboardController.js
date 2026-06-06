const Job = require("../models/Job");
const Application = require("../models/Application");

exports.recruiterDashboard =
async (req, res) => {

  try {

    const jobs =
      await Job.find({
        recruiterId: req.user.id
      });

    const jobIds =
      jobs.map(job => job._id);

    const applications =
      await Application.find({
        jobId: {
          $in: jobIds
        }
      });

    const shortlisted =
      applications.filter(
        app =>
          app.status === "Shortlisted"
      );

    const selected =
      applications.filter(
        app =>
          app.status === "Selected"
      );

    const averageScore =
      applications.length
        ? (
            applications.reduce(
              (sum, app) =>
                sum + app.matchScore,
              0
            ) /
            applications.length
          ).toFixed(2)
        : 0;

    res.json({
      totalJobs: jobs.length,
      totalApplications:
        applications.length,
      shortlisted:
        shortlisted.length,
      selected:
        selected.length,
      averageScore:
        averageScore.length,

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

exports.topCandidates =
async (req, res) => {

  try {

    const candidates =
      await Application.find()
      .sort({
        matchScore: -1
      })
      .limit(10)
      .populate(
        "candidateId",
        "name email"
      );

    res.json(candidates);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

exports.recentApplications =
async (req, res) => {

  try {

    const applications =
      await Application.find()
      .sort({
        createdAt: -1
      })
      .limit(10)
      .populate(
        "candidateId",
        "name email"
      )
      .populate(
        "jobId",
        "title company"
      );

    res.json(applications);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};