const express = require("express");
const router = express.Router();
const {protect} = require("../../middlewares/auth.middleware");
const {authorize} = require("../../middlewares/role.middleware");
const {createJob, getJobs, closeJob} = require("./job.controller");


router.get("/", getJobs);

router.post("/", protect, authorize("recruiter"), createJob);
router.patch("/:id/close" , protect, authorize("recruiter"), closeJob);

module.exports = router;