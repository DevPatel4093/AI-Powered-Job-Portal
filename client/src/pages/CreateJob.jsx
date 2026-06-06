import { useState } from "react";
import API from "../api/axios";

function CreateJob() {

  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    requiredSkills: ""

  });

  const createJob = async () => {

    try {

      await API.post("/jobs", {
        ...job,
        requiredSkills:
            job.requiredSkills
            .split(",")
            .map(skill => skill.trim())
        });

      alert("Job Posted Successfully");

      setJob({
        title: "",
        company: "",
        location: "",
        description: "",
        requiredSkills: ""
      });

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed to create job"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-blue-950">

      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-xl">

        <h1 className="text-4xl font-bold text-center !text-black mb-8">
          Post New Job
        </h1>

        <input
          type="text"
          placeholder="Job Title"
          value={job.title}
          onChange={(e) =>
            setJob({
              ...job,
              title: e.target.value
            })
          }
          className="w-full border p-3 rounded-xl mb-4 text-black"
        />

        <input
                type="text"
                placeholder="Required Skills (comma separated)"
                value={job.requiredSkills}
                onChange={(e) =>
                    setJob({
                    ...job,
                    requiredSkills: e.target.value
                    })
                }
                className="w-full border p-3 rounded-xl mb-4 text-black"
                />

        <input
          type="text"
          placeholder="Company"
          value={job.company}
          onChange={(e) =>
            setJob({
              ...job,
              company: e.target.value
            })
          }
          className="w-full border p-3 rounded-xl mb-4 text-black"
        />

        <input
          type="text"
          placeholder="Location"
          value={job.location}
          onChange={(e) =>
            setJob({
              ...job,
              location: e.target.value
            })
          }
          className="w-full border p-3 rounded-xl mb-4 text-black"
        />

        <input
            type="text"
            placeholder="Salary"
            value={job.salary}
            onChange={(e) =>
                setJob({
                ...job,
                salary: e.target.value
                })
            }
            className="w-full border p-3 rounded-xl mb-4 text-black"
            />

        <textarea
          placeholder="Job Description"
          rows="5"
          value={job.description}
          onChange={(e) =>
            setJob({
              ...job,
              description: e.target.value
            })
          }
          className="w-full border p-3 rounded-xl mb-6 text-black"
        />

        <button
          onClick={createJob}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
        >
          Post Job
        </button>

      </div>

    </div>
  );
}

export default CreateJob;