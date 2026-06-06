const express = require("express");

const router = express.Router();

const auth =
require("../middleware/authMiddleware");

const role =
require("../middleware/roleMiddleware");

const {
 createProfile,
 getProfile
}
=
require(
"../controllers/profileController"
);

router.post(
 "/",
 auth,
 role("candidate"),
 createProfile
);

router.get(
 "/",
 auth,
 role("candidate"),
 getProfile
);

module.exports = router;