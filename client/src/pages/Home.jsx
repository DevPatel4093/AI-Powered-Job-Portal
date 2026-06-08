function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-950 flex flex-col justify-center items-center">

      <h1 className="text-6xl font-bold text-white mb-6">
        AI-Powered Job Portal
      </h1>

      <p className="text-gray-300 text-xl mb-10">
        Find your dream job or hire the perfect candidate.
      </p>

      <div className="flex gap-6">

        <button
          onClick={() => window.location.href = "/login"}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold"
        >
          Login
        </button>

        <button
          onClick={() => window.location.href = "/register"}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold"
        >
          Register
        </button>

      </div>

      <button
        onClick={() => window.location.href = "/jobs"}
        className="mt-6 text-white underline"
      >
        Browse Jobs
      </button>

    </div>
  );
}

export default Home;