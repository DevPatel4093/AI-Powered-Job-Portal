import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function AnalyticsChart({ stats }) {

  const data = [
    {
      name: "Applications",
      value: stats.totalApplications || 0
    },
    {
      name: "Shortlisted",
      value: stats.shortlisted || 0
    },
    {
      name: "Selected",
      value: stats.selected || 0
    }
  ];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl mt-10">
      <h2 className="text-2xl font-bold text-black mb-4">
        Recruitment Analytics
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AnalyticsChart;