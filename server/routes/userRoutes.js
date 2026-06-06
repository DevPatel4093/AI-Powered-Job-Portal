const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  updateSkills
} = require("../controllers/userController");

router.put(
  "/skills",
  auth,
  updateSkills
);

module.exports = router;