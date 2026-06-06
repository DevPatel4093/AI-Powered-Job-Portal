function Navbar() {
  return (
    <nav
      style={{
        background: "#2563eb",
        color: "white",
        padding: "15px",
        display: "flex",
        justifyContent: "space-between"
      }}
    >
      <h2>AI Job Portal</h2>

      <div>
        <a
          href="/"
          style={{
            color: "white",
            marginRight: "15px"
          }}
        >
          Jobs
        </a>

        <a
          href="/login"
          style={{
            color: "white",
            marginRight: "15px"
          }}
        >
          Login
        </a>

        <a
          href="/register"
          style={{
            color: "white"
          }}
        >
          Register
        </a>
      </div>
    </nav>
  );
}

const logout = () => {

  localStorage.removeItem("token");
  localStorage.removeItem("user");

  window.location.href = "/login";
};

<button
  onClick={logout}
  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl"
>
  Logout
</button>

const user =
  JSON.parse(localStorage.getItem("user"));

{
  user?.role === "candidate" && (
    <a href="/candidate">
      Dashboard
    </a>
  )
}

{
  user?.role === "recruiter" && (
    <a href="/recruiter-dashboard">
      Dashboard
    </a>
  )
}

export default Navbar;