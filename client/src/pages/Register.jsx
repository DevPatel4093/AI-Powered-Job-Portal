import { useState } from "react";
import API from "../api/axios";

function Register() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "candidate",
    skills: ""
  });

  const register = async () => {
    try {

      await API.post("/auth/register", {
        ...form,
        skills:
            form.role === "candidate"
            ? form.skills
                .split(",")
                .map(skill => skill.trim())
            : []
        });

      alert("Registration Successful");

      window.location.href = "/login";

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-blue-950">
       <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md text-gray-900">

        
        <h2 className="text-4xl font-bold text-center !text-black mb-8">
          Register
        </h2>

        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value
            })
          }
          className="w-full border p-3 rounded-xl mb-4"
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value
            })
          }
          className="w-full border p-3 rounded-xl mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value
            })
          }
          className="w-full border p-3 rounded-xl mb-4"
        />

        <select
          value={form.role}
          onChange={(e) =>
            setForm({
              ...form,
              role: e.target.value
            })
          }
          className="w-full border p-3 rounded-xl mb-6"
        >
          <option value="candidate">
            Candidate
          </option>

          <option value="recruiter">
            Recruiter
          </option>
        </select>

        {form.role === "candidate" && (
  <input
    type="text"
    placeholder="Skills (comma separated)"
    value={form.skills}
    onChange={(e) =>
      setForm({
        ...form,
        skills: e.target.value
      })
    }
    className="w-full border p-3 rounded-xl mb-4"
  />
)}
        <button
          onClick={register}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
        >
          Register
        </button>

      </div>

    </div>
  );
}

export default Register;