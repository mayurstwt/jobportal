const express = require("express");
const router = express.Router();

const { protect } = require("../../middlewares/auth.middleware");
const { authorize } = require("../../middlewares/role.middleware");
const {
  applyForJob,
  getApplicantsByJob,
  updateApplicationStatus,
} = require("./application.controller");

router.post("/jobs/:jobId/apply", protect, authorize("candidate"), applyForJob);

router.get("/jobs/:jobId", protect, authorize("recruiter"), getApplicantsByJob);

router.patch(
  "/:id/status",
  protect,
  authorize("recruiter"),
  updateApplicationStatus
);


module.exports = router;
