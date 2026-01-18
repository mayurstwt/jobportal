import { useState } from "react";
import { useGetRecruiterStatsQuery } from "../features/analytics/analyticsApi";
import { useGetMyJobsQuery } from "../features/jobs/jobsApi";
import Applicants from "../components/Applicants";
import { useNavigate } from "react-router-dom";

export default function RecruiterDashboard() {
  const { data: stats } = useGetRecruiterStatsQuery();
  const { data: jobs } = useGetMyJobsQuery();
  const [selectedJob, setSelectedJob] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Recruiter Dashboard</h1>
      <button
        onClick={() => navigate("/recruiter/create-job")}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        + Create Job
      </button>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard title="Applications" value={stats?.totalApplications} />
        <StatCard title="Hired" value={stats?.hiredCount} />
        <StatCard title="Conversion %" value={stats?.conversionRate} />
      </div>

      {/* Jobs */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1">
          <h2 className="font-semibold mb-3">My Jobs</h2>
          {jobs?.jobs?.map((job) => (
            <div
              key={job._id}
              onClick={() => setSelectedJob(job)}
              className={`p-3 border rounded mb-2 cursor-pointer ${
                selectedJob?._id === job._id ? "bg-blue-50 border-blue-400" : ""
              }`}
            >
              <p className="font-medium">{job.title}</p>
              <p className="text-xs text-gray-500">{job.status}</p>
            </div>
          ))}
        </div>

        {/* Applicants */}
        <div className="col-span-2">
          {selectedJob ? (
            <Applicants jobId={selectedJob._id} />
          ) : (
            <p className="text-gray-500">Select a job to view applicants</p>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-2xl font-bold">{value ?? "-"}</p>
    </div>
  );
}
