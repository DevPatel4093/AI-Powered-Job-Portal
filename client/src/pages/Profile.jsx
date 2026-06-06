import { useState } from "react";
import API from "../api/axios";

function Profile() {
  const [file, setFile] = useState(null);

  const uploadResume = async () => {
    try {
      const formData = new FormData();

      formData.append("resume", file);

      await API.post(
        "/applications/upload-resume",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Resume Uploaded Successfully");

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Upload Failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-blue-950">

      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">

        <h1 className="text-4xl font-bold !text-black text-center mb-8">
          Upload Resume
        </h1>

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) =>
            setFile(e.target.files[0])
          }
          className="w-full border p-3 rounded-xl mb-6 text-black"
        />

        <button
          onClick={uploadResume}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
        >
          Upload Resume
        </button>

      </div>

    </div>
  );
}

export default Profile;