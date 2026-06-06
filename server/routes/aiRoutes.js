const express =
require("express");

const router =
express.Router();

const auth =
require("../middleware/authMiddleware");

const role =
require("../middleware/roleMiddleware");

const {
 matchResume
}
=
require("../controllers/aiController");

router.post(
 "/match",
 auth,
 role("candidate"),
 matchResume
);

module.exports = router;