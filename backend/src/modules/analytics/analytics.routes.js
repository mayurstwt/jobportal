const express = require("express");
const router = express.Router();
const {protect} = require("../../middlewares/auth.middleware");
const {authorize} = require("../../middlewares/role.middleware");
const {recruiterStats, adminStats} = require("./analytics.controller");

router.get("/recruiter", protect , authorize("recruiter"), recruiterStats);
router.get("/admin", protect, authorize("admin"), adminStats);

module.exports = router;
    