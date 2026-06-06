import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

function Applicants() {

  const { jobId } = useParams();

  const [applicants, setApplicants] = useState([]);
const [interviewData, setInterviewData] = useState({});

  useEffect(() => {

    API.get(`/applications/applicants/${jobId}`)
      .then((res) => {
        console.log("Applicants Data:", res.data);
        setApplicants(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }, [jobId]);

  const updateStatus = async (id, status) => {

    try {

      await API.put(`/applications/${id}`, {
        status,
      });

      setApplicants(
        applicants.map((app) =>
          app._id === id
            ? { ...app, status }
            : app
        )
      );
    
     
    } catch (error) {

      console.log(error);

    }
  };
        const scheduleInterview = async (
        id,
        interviewDate,
        interviewTime
        ) => {
        try {

            await API.put(
            `/applications/schedule/${id}`,
            {
                interviewDate,
                interviewTime
            }
            );

            alert("Interview Scheduled");

        } catch (error) {

            console.log(error);

        }
        };
       
  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-950 p-10">

      <h1 className="text-5xl text-white font-bold text-center mb-10">
        Applicants
      </h1>

      <p className="text-white text-center mb-6">
        Total Applicants: {applicants.length}
      </p>

      <div className="max-w-6xl mx-auto">

        {applicants.map((app, index) => (

          <div
            key={app._id}
            className="bg-white rounded-3xl p-6 mb-6 shadow-xl"
          >

           <h2 className="text-2xl font-bold !text-black">
            #{index + 1} - {app.candidateId?.name}
           </h2>

            {index === 0 && (
                <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                    Top Match
                </span>
                )}

            <p className="text-gray-700">
              {app.candidateId?.email}
            </p>

           {app.candidateId?.resume && (
            <a
                href={`http://localhost:5000/uploads/${app.candidateId.resume}`}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-3 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl"
            >
                View Resume
            </a>
            )}

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

            <p className="text-blue-600 font-semibold">
              Status: {app.status}
            </p>
                <div className="mt-4">

            <input
  type="date"
  value={interviewData[app._id]?.date || ""}
  onChange={(e) =>
    setInterviewData({
      ...interviewData,
      [app._id]: {
        ...interviewData[app._id],
        date: e.target.value,
      },
    })
  }
  className="border p-2 rounded"
/>

<input
  type="time"
  value={interviewData[app._id]?.time || ""}
  onChange={(e) =>
    setInterviewData({
      ...interviewData,
      [app._id]: {
        ...interviewData[app._id],
        time: e.target.value,
      },
    })
  }
  className="border p-2 rounded ml-2"
/>

<button
  onClick={() =>
    scheduleInterview(
      app._id,
      interviewData[app._id]?.date,
      interviewData[app._id]?.time
    )
  }
  className="bg-purple-600 text-white px-4 py-2 rounded-xl ml-2"
>
  Schedule Interview
</button>

            

            </div>

            <div className="mt-4 flex gap-4">

              <button
                onClick={() =>
                  updateStatus(app._id, "Shortlisted")
                }
                className="bg-green-600 text-white px-4 py-2 rounded-xl"
              >
                Shortlist
              </button>

              <button
                onClick={() =>
                  updateStatus(app._id, "Rejected")
                }
                className="bg-red-600 text-white px-4 py-2 rounded-xl"
              >
                Reject
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );
}

const scheduleInterview =
async (id) => {

  try {

    await API.put(
      `/applications/schedule/${id}`,
      {
        interviewDate: date,
        interviewTime: time
      }
    );

    alert(
      "Interview Scheduled"
    );

  } catch (error) {

    console.log(error);

  }
};
export default Applicants;