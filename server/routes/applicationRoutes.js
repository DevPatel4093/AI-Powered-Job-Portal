const express = require("express");

const router = express.Router();

const auth =
  require("../middleware/authMiddleware");

const role =
  require("../middleware/roleMiddleware");

const upload =
  require("../middleware/upload");

const {
  applyJob,
  getMyApplications,
  getApplicants,
  updateStatus,
  uploadResume,
  scheduleInterview
} =
require("../controllers/applicationController");

// Candidate Apply
router.post(
  "/apply",
  auth,
  role("candidate"),
  applyJob
);

// Candidate Dashboard
router.get(
  "/my",
  auth,
  role("candidate"),
  getMyApplications
);

// Recruiter View Applicants
router.get(
  "/applicants/:jobId",
  auth,
  role("recruiter"),
  getApplicants
);

// Recruiter Update Status
router.put(
  "/:id",
  auth,
  role("recruiter"),
  updateStatus
);

// Upload Resume
router.post(
  "/upload-resume",
  auth,
  upload.single("resume"),
  uploadResume
);

router.put(
  "/schedule/:id",
  auth,
  role("recruiter"),
  scheduleInterview
);

module.exports = router;