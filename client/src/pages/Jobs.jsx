import { useEffect, useState } from "react";
import API from "../api/axios";

function Jobs() {

  const [jobs, setJobs] = useState([]);

  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [remoteOnly, setRemoteOnly] = useState(false);

  useEffect(() => {

    API.get("/jobs")
  .then((res) => {
    console.log(res.data);
    setJobs(res.data);
  })
  .catch((err) => {
    console.log(err);
  });

  }, []);

  const applyJob = async (jobId) => {

    try {

      await API.post(
        "/applications/apply",
        { jobId }
      );

      alert("Applied Successfully");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Application Failed"
      );
    }
  };

console.log("ENV =", import.meta.env);
console.log("API =", import.meta.env.VITE_API_URL);
  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-950">

      <div className="w-full px-8 py-10">

        <h1 className="text-6xl font-bold text-center text-white mb-12">
          Jobs
        </h1>

        <div className="grid md:grid-cols-3 gap-4 mb-8">

        <input
            type="text"
            placeholder="Search by Title, Company, Skills"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-3 rounded-xl"
        />

        <input
            type="text"
            placeholder="Filter by Location"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="p-3 rounded-xl"
        />

        <label className="flex items-center gap-2 text-white">
            <input
            type="checkbox"
            checked={remoteOnly}
            onChange={() => setRemoteOnly(!remoteOnly)}
            />
            Remote Only
        </label>

        </div>
        {Array.isArray(jobs) && 
        jobs
            .filter((job) => {

                const searchText = search.toLowerCase();

                const matchesSearch =
                job.title?.toLowerCase().includes(searchText) ||
                job.company?.toLowerCase().includes(searchText) ||
                job.requiredSkills?.join(" ").toLowerCase().includes(searchText);

                const matchesLocation =
                locationFilter === "" ||
                job.location?.toLowerCase().includes(
                    locationFilter.toLowerCase()
                );

                const matchesRemote =
                !remoteOnly ||
                job.location?.toLowerCase().includes("remote");

                return (
                matchesSearch &&
                matchesLocation &&
                matchesRemote
                );

            })
            .map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-3xl shadow-xl p-8 mb-8"
            >
            <h2 className="text-3xl font-bold !text-black mb-3">
                {job.title}
            </h2>

              <p className="text-lg text-gray-700">
                🏢 {job.company}
              </p>

              <p className="text-lg text-gray-600 mb-6">
                📍 {job.location}
              </p>

              <button
                onClick={() => applyJob(job._id)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
              >
                Apply Now
              </button>

            </div>

          ))}

      </div>

    </div>

  );
}

export default Jobs;