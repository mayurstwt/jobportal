import { useGetAdminStatsQuery } from "../features/analytics/analyticsApi";

export default function AdminDashboard() {
  const { data, isLoading } = useGetAdminStatsQuery();

  if (isLoading) {
    return <p className="p-6">Loading admin analytics...</p>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>

      {/* Top Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard title="Total Jobs" value={data?.totalJobs} />
        <StatCard
          title="Total Users"
          value={data?.usersByRole?.reduce(
            (sum, r) => sum + r.count,
            0
          )}
        />
        <StatCard title="Roles" value={data?.usersByRole?.length} />
      </div>

      {/* Users by Role */}
      <section className="mb-10">
        <h2 className="font-semibold mb-3">Users by Role</h2>

        <div className="grid grid-cols-3 gap-4">
          {data?.usersByRole?.map((role) => (
            <div
              key={role._id}
              className="bg-white border p-4 rounded shadow-sm"
            >
              <p className="text-gray-500 text-sm capitalize">
                {role._id}
              </p>
              <p className="text-2xl font-bold">{role.count}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Jobs per Day */}
      <section>
        <h2 className="font-semibold mb-3">Jobs Posted Per Day</h2>

        <div className="bg-white border rounded p-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th>Date</th>
                <th>Jobs Posted</th>
              </tr>
            </thead>
            <tbody>
              {data?.jobsByDay?.map((row) => (
                <tr key={row._id} className="border-t">
                  <td className="py-2">{row._id}</td>
                  <td className="py-2 font-medium">{row.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
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
