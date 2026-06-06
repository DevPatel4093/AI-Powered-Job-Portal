const Application = require("../models/Application");
const Job = require("../models/Job");
const sendMail = require("../utils/sendMail");
const User = require("../models/User");

// Apply For Job
exports.applyJob = async (req, res) => {
  try {

    const { jobId } = req.body;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    const alreadyApplied =
      await Application.findOne({
        candidateId: req.user.id,
        jobId
      });

    if (alreadyApplied) {
      return res.status(400).json({
        message: "Already applied"
      });
    }

   const User = require("../models/User");

const candidate =
  await User.findById(req.user.id);

const candidateSkills =
  candidate.skills || [];

const requiredSkills =
  job.requiredSkills || [];

  console.log("Candidate Skills:", candidateSkills);
  console.log("Required Skills:", requiredSkills);

const matchedSkills =
  requiredSkills.filter(skill =>
    candidateSkills.includes(skill)
  );

  let matchScore = 0;

if (requiredSkills.length > 0) {
  matchScore = Math.round(
    (matchedSkills.length / requiredSkills.length) * 100
  );
}

const missingSkills =
requiredSkills.filter(
  skill =>
    !candidateSkills.includes(skill)
);
console.log("Candidate Skills:", candidateSkills);
console.log("Required Skills:", requiredSkills);
console.log("Matched Skills:", matchedSkills);
console.log("Match Score:", matchScore);
    const application =
      await Application.create({
        candidateId: req.user.id,
        jobId,
        matchScore,
        missingSkills
      });

    res.status(201).json(application);

    await sendMail(
        candidate.email,
            "Application Submitted",
        `Your application has been submitted successfully.`
);
  
} catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message
    });
  }
};

// Candidate Applications
exports.getMyApplications =
async (req, res) => {

  try {

    const applications =
      await Application.find({
        candidateId: req.user.id
      })
      .populate("jobId");

    res.json(applications);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

// Recruiter View Applicants
exports.getApplicants =
async (req, res) => {

  try {

    const applicants =
      await Application.find({
        jobId: req.params.jobId
      })
      .populate(
        "candidateId",
        "name email resume"
      )
      .sort({
        matchScore: -1
    });

    res.json(applicants);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

// Update Status
exports.updateStatus = async (req, res) => {
  try {

    const application =
      await Application.findByIdAndUpdate(
        req.params.id,
        {
          status: req.body.status
        },
        {
          new: true
        }
      ).populate("candidateId");

    // Optional email
    if (
      application &&
      application.candidateId &&
      application.candidateId.email
    ) {

      await sendMail(
        application.candidateId.email,
        "Application Status Updated",
        `Your application status is now ${application.status}`
      );
    }

    res.status(200).json({
      success: true,
      application
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message
    });
  }
};

exports.uploadResume = async (req, res) => {
  try {

    const user =
      await User.findByIdAndUpdate(
        req.user.id,
        {
          resume: req.file.filename
        },
        {
          new: true
        }
      );

    res.status(200).json(user);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

exports.scheduleInterview =
async (req, res) => {

  try {

    const {
      interviewDate,
      interviewTime
    } = req.body;

    const application =
      await Application.findById(
        req.params.id
      ).populate("candidateId");

    application.interviewDate =
      interviewDate;

    application.interviewTime =
      interviewTime;

    application.status =
      "Interview Scheduled";

    await application.save();

    await sendMail(
      application.candidateId.email,
      "Interview Scheduled",
      `
Interview Date: ${interviewDate}

Interview Time: ${interviewTime}
      `
    );

    res.json({
      success: true,
      application
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};