const CandidateProfile =
require("../models/CandidateProfile");

exports.createProfile =
async (req, res) => {

  try {

    const profile =
      await CandidateProfile.create({

        userId: req.user.id,

        skills: req.body.skills,

        education: req.body.education,

        experience: req.body.experience
      });

    res.status(201).json(profile);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

exports.getProfile =
async (req, res) => {

  try {

    const profile =
      await CandidateProfile.findOne({
        userId: req.user.id
      });

    res.json(profile);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};