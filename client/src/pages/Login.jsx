import { useState } from "react";
import API from "../api/axios";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {

    try {

      const res = await API.post(
        "/auth/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert("Login Successful");

      window.location.href = "/";

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Login Failed"
      );
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-blue-950">

    <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">

    <h1 className="text-4xl font-bold text-center !text-black mb-8"> 
            Login
    </h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-3 rounded-xl mb-4 text-black"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border p-3 rounded-xl mb-6 text-black"
      />

      <button
        onClick={login}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
      >
        Login
      </button>

    </div>

  </div>
);
}

export default Login;