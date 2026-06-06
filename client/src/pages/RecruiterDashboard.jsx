import { useEffect, useState } from "react";
import API from "../api/axios";

import AnalyticsChart from "../component/AnalyticsChart";

function RecruiterDashboard() {
  const [stats, setStats] = useState({});
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    API.get("/dashboard/recruiter")
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    API.get("/jobs/my-jobs")
      .then((res) => {
        setJobs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-950 p-10">

      <h1 className="text-5xl text-white font-bold text-center mb-10">
        Recruiter Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">

        <div className="bg-white rounded-3xl p-6 shadow-xl text-center">
          <h2 className="text-5xl font-extrabold !text-black">
            {stats.totalJobs || 0}
          </h2>
          <p className="text-gray-700 mt-2">Total Jobs</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-xl text-center">
          <h2 className="text-5xl font-extrabold !text-black">
            {stats.totalApplications || 0}
          </h2>
          <p className="text-gray-700 mt-2">Applications</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-xl text-center">
          <h2 className="text-5xl font-extrabold !text-black">
            {stats.shortlisted || 0}
          </h2>
          <p className="text-gray-700 mt-2">Shortlisted</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-xl text-center">
          <h2 className="text-5xl font-extrabold !text-black">
            {stats.selected || 0}
          </h2>
          <p className="text-gray-700 mt-2">Selected</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-xl text-center">
          <h2 className="text-4xl font-bold !text-red-500">
            {stats.averageScore || 0}
          </h2>
          <p className="text-gray-700 mt-2">
            Average AI Score
          </p>
        </div>

      </div>

      {/* My Jobs Section */}
      <div className="max-w-6xl mx-auto mt-12">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-3xl font-bold text-white">
            My Jobs
          </h2>

          <button
            onClick={() => window.location.href = "/my-jobs"}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
          >
            View My Jobs
          </button>

        </div>

        {jobs.length === 0 ? (
          <p className="text-white text-lg">
            No jobs posted yet.
          </p>
        ) : (
          jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-3xl p-6 mb-4 shadow-xl"
            >
              <h3 className="text-2xl font-bold !text-black">
                {job.title}
              </h3>

              <p className="text-gray-700">
                {job.company}
              </p>

              <button
                onClick={() =>
                  window.location.href = `/applicants/${job._id}`
                }
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl"
              >
                View Applicants
              </button>
            </div>
          ))
        )}

        <div>   <AnalyticsChart stats={stats} /> </div>

      </div>

    </div>
  );
}

export default RecruiterDashboard;