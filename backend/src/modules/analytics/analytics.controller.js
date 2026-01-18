const Job = require("../jobs/job.model");
const Application = require("../applications/application.model");
const User = require("../users/user.model");
const redis = require("../../config/redis");
const { default: mongoose } = require("mongoose");

exports.recruiterStats = async (req, res, next) => {
  try {
    const recruiterId = req.user.id;
    const cacheKey = `recruiter:stats:${recruiterId}`;

    // 1. Try to fetch from Cache first
    const cached = await redis.get(cacheKey);
    if (cached) {
      return res.json(JSON.parse(cached));
    }

    // 2. If not in cache, perform the Heavy Database Logic (From Snippet 2)
    const jobsStats = await Job.aggregate([
      { $match: { recruiterId: recruiterId } },
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    // Optimize: Get IDs once to avoid double querying
    const jobIds = await Job.find({ recruiterId }).distinct("_id");

    const totalApplications = await Application.countDocuments({
      jobId: { $in: jobIds }
    });

    const hiredCount = await Application.countDocuments({
      status: "hired",
      jobId: { $in: jobIds }
    });

    const conversionRate = totalApplications === 0
      ? 0
      : ((hiredCount / totalApplications) * 100).toFixed(2);

    const data = {
      jobsStats,
      totalApplications,
      hiredCount,
      conversionRate
    };

    // 3. Save result to Cache for 60 seconds
    await redis.setex(cacheKey, 60, JSON.stringify(data));

    res.json(data);
  } catch (err) {
    next(err);
  }
};



exports.adminStats = async (req, res, next) => {
  try {
    const cacheKey = "admin:stats";

    // 1️⃣ Check cache first
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }

    // 2️⃣ If not cached → run DB queries
    const usersByRole = await User.aggregate([
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 }
        }
      }
    ]);

    const totalJobs = await Job.countDocuments();

    const jobsByDay = await Job.aggregate([
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt"
            }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const responseData = {
      usersByRole,
      totalJobs,
      jobsByDay
    };

    // 3️⃣ Store in Redis (TTL = 60 seconds)
    await redis.setex(cacheKey, 60, JSON.stringify(responseData));

    res.json(responseData);
  } catch (error) {
    next(error);
  }
};
