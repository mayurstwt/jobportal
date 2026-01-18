import {
  useGetApplicationsByJobQuery,
  useUpdateApplicationStatusMutation
} from "../features/applications/applicationsApi";

export default function Applicants({ jobId }) {
  const { data, isLoading } = useGetApplicationsByJobQuery(jobId, {skip: !jobId});
  const [updateStatus] = useUpdateApplicationStatusMutation();

  if (isLoading) return <p>Loading applicants...</p>;

  return (
    <div>
      <h2 className="font-semibold mb-3">Applicants</h2>

      <div className="space-y-3">
        {data?.map((app) => (
          <div
            key={app._id}
            className="border p-3 rounded flex justify-between items-center"
          >
            <div>
              <p className="font-medium">{app.candidateId.name}</p>
              <p className="text-xs text-gray-500">
                {app.candidateId.email}
              </p>
              <p className="text-sm mt-1">Status: {app.status}</p>
            </div>

            <div className="flex gap-2">
              {["shortlisted", "rejected", "hired"].map((status) => (
                <button
                  key={status}
                  onClick={() =>
                    updateStatus({ id: app._id, status })
                  }
                  className="px-3 py-1 text-xs rounded bg-gray-200 hover:bg-gray-300"
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
