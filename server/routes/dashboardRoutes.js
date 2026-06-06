const express =
require("express");

const router =
express.Router();

const auth =
require("../middleware/authMiddleware");

const role =
require("../middleware/roleMiddleware");

const {
 recruiterDashboard
} = require("../controllers/dashboardController");

router.get(
 "/recruiter",
 auth,
 role("recruiter"),
 recruiterDashboard
);

module.exports = router;