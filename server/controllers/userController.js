const User = require("../models/User");

exports.updateSkills = async (req, res) => {
  try {

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        skills: req.body.skills
      },
      {
        new: true
      }
    );

    res.json(user);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};