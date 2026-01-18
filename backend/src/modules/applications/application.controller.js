const Application = require("./application.model");
const Job = require("../jobs/job.model");
const { emitEvent } = require("../../socket");

exports.applyForJob = async (req, res, next) => {
  try {
    const job = await Job.findOne({
      _id: req.params.jobId,
      status: "open",
    });
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const application = new Application({
      jobId: job._id,
      candidateId: req.user.id,
    });
    await application.save();

    emitEvent(job.recruiterId.toString(), "job_applied", {
      jobId: job._id,
      candidateId: req.user.id,
      message: "A new candidate has applied for your job posting.",
    });

    res.status(201).json({ application });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "You have already applied for this job",
      });
    }

    next(error);
  }
};

exports.updateApplicationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!["shortlisted", "rejected", "hired"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const application = await Application.findById(req.params.id).populate(
      "jobId"
    );

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (application.jobId.recruiterId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    application.status = status;
    await application.save();
    
    emitEvent(application.candidateId.toString(), "application_status_update", {
      applicationId: application._id,
      status: application.status,
      message: `Your application was ${application.status}`,
    });

    res.status(200).json({
      message: "Application status updated successfully",
      application,
    });
  } catch (error) {
    next(error);
  }
};

exports.getApplicantsByJob = async (req, res, next) => {
  try {
    const job = await Job.findOne({
      _id: req.params.jobId,
      recruiterId: req.user.id,
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const applications = await Application.find({
      jobId: job._id,
    })
      .populate("candidateId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({ applications });
  } catch (error) {
    next(error);
  }
};
