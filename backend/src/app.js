const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const errorMiddleware = require("./middlewares/error.middleware");
const authRoutes = require("./modules/auth/auth.routes");
const userRoutes = require("./modules/users/user.routes");
const jobRoutes = require("./modules/jobs/job.routes");
const applicationRoutes = require("./modules/applications/application.routes");
const analyticsRoutes = require("./modules/analytics/analytics.routes");


const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/analytics", analyticsRoutes);

app.use(errorMiddleware)

module.exports = app;