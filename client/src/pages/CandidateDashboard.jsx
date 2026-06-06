import { useEffect, useState } from "react";
import API from "../api/axios";

function CandidateDashboard() {

  const [applications, setApplications] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);

  useEffect(() => {

    API.get("/applications/my")
      .then((res) => {
        setApplications(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    API.get("/jobs/recommended")
      .then((res) => {
        setRecommendedJobs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-950 p-10">

      <h1 className="text-5xl text-white font-bold text-center mb-10">
        Candidate Dashboard
      </h1>

      <div className="max-w-5xl mx-auto">

        <h2 className="text-3xl text-white font-bold mb-6">
          My Applications
        </h2>

        {applications.length === 0 ? (
          <p className="text-white">
            No applications found.
          </p>
        ) : (

          applications.map((app) => (

            <div
              key={app._id}
              className="bg-white rounded-3xl p-6 shadow-xl mb-6"
            >

              <h2 className="text-3xl font-bold !text-black mb-4">
                {app.jobId?.title}
              </h2>

              <p className="text-gray-700 text-lg">
                Company: {app.jobId?.company}
              </p>

              <p className="text-blue-600 font-semibold text-lg">
                Status: {app.status}
              </p>

              <p
                className={`font-semibold ${
                  app.matchScore >= 80
                    ? "text-green-600"
                    : app.matchScore >= 50
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}
              >
                Match Score: {app.matchScore}%
              </p>

              {app.missingSkills?.length > 0 && (
                <div className="mt-2">
                  <p className="text-red-500 font-semibold">
                    Missing Skills:
                  </p>

                  <p className="text-gray-700">
                    {app.missingSkills.join(", ")}
                  </p>
                </div>
              )}

              {app.interviewDate && (
                <div className="mt-3">

                  <p className="text-purple-600 font-semibold">
                    Interview Date: {app.interviewDate}
                  </p>

                  <p className="text-purple-600 font-semibold">
                    Interview Time: {app.interviewTime}
                  </p>

                </div>
              )}

            </div>

          ))

        )}

        {/* Recommended Jobs */}

        <div className="mt-12">

          <h2 className="text-4xl text-white font-bold mb-6">
            Recommended Jobs
          </h2>

          {recommendedJobs.length === 0 ? (

            <p className="text-white">
              No recommendations available.
            </p>

          ) : (

           recommendedJobs
                .filter(job => job.title)
                .slice(0,3)
                .map((job) => (
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

                <p className="text-green-600 font-semibold">
                  Match: {job.recommendationScore || 0}%
                </p>

              </div>

            ))

          )}

        </div>

      </div>

    </div>

  );
}

export default CandidateDashboard;