const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  createJob,
  getMyJobs,
  getJobs,
  getJob,
  updateJob,
  deleteJob,
  getRecommendedJobs
} = require("../controllers/jobController");

// Recruiter Jobs
router.get(
  "/my-jobs",
  auth,
  role("recruiter"),
  getMyJobs
);

// Public Jobs
router.get("/", getJobs);

router.get(
  "/recommended",
  auth,
  role("candidate"),
  getRecommendedJobs
);

router.get("/:id", getJob);

// Recruiter Only
router.post(
  "/",
  auth,
  role("recruiter"),
  createJob
);

router.put(
  "/:id",
  auth,
  role("recruiter"),
  updateJob
);

router.delete(
  "/:id",
  auth,
  role("recruiter"),
  deleteJob
);

module.exports = router;