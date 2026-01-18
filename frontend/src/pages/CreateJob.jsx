import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateJobMutation } from "../features/jobs/jobsApi";

export default function CreateJob() {
  const navigate = useNavigate();
  const [createJob, { isLoading }] = useCreateJobMutation();

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    skills: "",
    salaryMin: "",
    salaryMax: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await createJob({
        ...form,
        skills: form.skills.split(",").map((s) => s.trim()),
      }).unwrap();

      // ✅ After creation → back to recruiter dashboard
      navigate("/recruiter");
    } catch (err) {
      setError(err?.data?.message || "Failed to create job");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Create Job</h1>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <input
          name="title"
          placeholder="Job Title"
          required
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />

        <textarea
          name="description"
          placeholder="Job Description"
          required
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          name="location"
          placeholder="Location"
          required
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />

        <input
          name="skills"
          placeholder="Skills (React, Node, Mongo)"
          onChange={handleChange}
          className="w-full border p-2 mb-3 rounded"
        />

        <div className="flex gap-4 mb-4">
          <input
            name="salaryMin"
            placeholder="Min Salary"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="salaryMax"
            placeholder="Max Salary"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {isLoading ? "Creating..." : "Create Job"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/recruiter")}
            className="border px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
