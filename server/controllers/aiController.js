const model = require("../config/gemini");

const Job = require("../models/Job");

const CandidateProfile =
require("../models/CandidateProfile");

exports.matchResume =
async (req, res) => {

  try {

    const { jobId } = req.body;

    const job =
      await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    const profile =
      await CandidateProfile.findOne({
        userId: req.user.id
      });

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found"
      });
    }

    const prompt = `
    Compare candidate profile with job requirements.

    Candidate Skills:
    ${profile.skills.join(", ")}

    Education:
    ${profile.education}

    Experience:
    ${profile.experience}

    Job Title:
    ${job.title}

    Job Description:
    ${job.description}

    Required Skills:
    ${job.requiredSkills.join(", ")}

    Return ONLY valid JSON:

    {
      "matchingScore":0,
      "matchedSkills":[],
      "missingSkills":[],
      "recommendation":""
    }
    `;

    const result =
      await model.generateContent(
        prompt
      );

    let response =
    result.response.text();

    response = 
    response
    .replace(/```json/g,"")
    .replace(/```/g,"")
    .trim();

    const parsed =
    JSON.parse(response);

    res.json(parsed);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message
    });
  }
};