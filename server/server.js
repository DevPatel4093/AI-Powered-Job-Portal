const express = require("express");

const cors = require("cors");

const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

connectDB();

const app = express();

const userRoutes =
require("./routes/userRoutes");

app.use(
  cors({
    origin: [
      "http://localhost:5173"
    ],
    credentials: true
  })
);

app.use(express.json());

app.use(
  "/uploads",
  express.static("uploads")
);

app.use("/api/auth",
 require("./routes/authRoutes")
);

app.use("/api/jobs",
  require("./routes/jobRoutes")
);

app.use(
 "/api/applications",
 require("./routes/applicationRoutes")
);

app.use(
 "/api/profile",
 require("./routes/profileRoutes")
);

app.use(
 "/api/resume",
 require("./routes/resumeRoutes")
);

app.use(
 "/api/ai",
 require("./routes/aiRoutes")
);

app.use(
 "/api/dashboard",
 require("./routes/dashboardRoutes")
);

app.use(
  "/api/users",
  userRoutes
);

app.get("/",(req,res)=>{

 res.send(
 "AI Recruitment Portal API"
 );

});

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{

 console.log(
 `Server running on ${PORT}`
 );

});