const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;

// Import Routes
const userRoute = require("./routes/User");
const contactRoute = require("./routes/Contact");
const profileRoute = require("./routes/Profile");
const paymentRoute = require("./routes/Payments");
const courseRoute = require("./routes/Course");

// Import Config
const dbConnect = require("./config/database");
const cloudinaryConnect = require("./config/cloudinary");

// Middleware
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");

// Parse JSON
app.use(express.json());
app.use(cookieParser());

// Enable file uploads
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/",
}));

// Setup CORS
app.use(cors({
  origin: ["https://codify-frontend-one.vercel.app", "http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

// Optional: Handle preflight requests
app.options("*", cors());

// Optional: Custom CORS headers (if needed)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

// Connect to DB and Cloudinary
dbConnect();
cloudinaryConnect();

// Mount routes
app.use("/api/v1/auth", userRoute);
app.use("/api/v1/contact", contactRoute);
app.use("/api/v1/profile", profileRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/course", courseRoute);

// Root route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your Server is Up and Running Successfully!!",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Started Running At Port ${PORT}`);
});
