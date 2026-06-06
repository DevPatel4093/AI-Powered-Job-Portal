const cloudinary =
require("../config/cloudinary");

const streamifier =
require("streamifier");

const CandidateProfile =
require("../models/CandidateProfile");

exports.uploadResume =
async (req, res) => {

  try {

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded"
      });
    }

    const uploadStream =
      cloudinary.uploader.upload_stream(
      {
        resource_type: "raw",
        folder: "resumes"
      },
      async (error, result) => {

        if (error) {
          return res.status(500).json(error);
        }

        const profile =
          await CandidateProfile.findOneAndUpdate(
          {
            userId: req.user.id
          },
          {
            resumeUrl: result.secure_url
          },
          {
            new: true
          }
        );

        res.json({
          message: "Resume uploaded",
          resumeUrl: result.secure_url,
          profile
        });
      });

    streamifier.createReadStream(
      req.file.buffer
    ).pipe(uploadStream);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};