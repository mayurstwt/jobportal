import { useState } from "react";
import { useGetJobsQuery } from "../features/jobs/jobsApi";
import { useApplyToJobMutation } from "../features/applications/applicationsApi";
import { useSelector } from "react-redux";

export default function Jobs() {
  const [keyword, setKeyword] = useState("");
  const [applyToJob] = useApplyToJobMutation();
  const { user } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetJobsQuery({ keyword });

  const handleApply = async (jobId) => {
    try {
        await applyToJob(jobId).unwrap();
        alert("Applied successfully");
    } catch (error) {
        alert("Failed to apply" + error);
    }
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <input
        placeholder="Search jobs..."
        className="border p-2 w-full mb-6 rounded"
        onChange={(e) => setKeyword(e.target.value)}
      />

      {isLoading && <p>Loading...</p>}

      <div className="grid gap-4">
        {data?.jobs?.map((job) => (
          <div key={job._id} className="border p-4 rounded hover:shadow">
            <h2 className="text-lg font-semibold">{job.title}</h2>
            <p className="text-gray-600">{job.location}</p>
            <p className="text-sm mt-2">{job.description}</p>

            <div className="flex gap-2 mt-3">
              {job.skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-gray-200 px-2 py-1 text-xs rounded"
                >
                  {skill}
                </span>
              ))}
            </div>

            {user?.role === "candidate" && (
                <button
                    onClick={() => handleApply(job._id)}
                    className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Apply
                </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
