const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        index: true
    },
    description: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        index: true
    },
    location: {
        type: String,
        index: true
    },
    salaryMin:Number,
    salaryMax:Number,
     status: {
      type: String,
      enum: ["open", "closed"],
      default: "open"
    },
    recruiterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    },
    { timestamps: true }
);


jobSchema.index({title: "text", skills: "text", location: "text"});

module.exports = mongoose.model("Job", jobSchema);