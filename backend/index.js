const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/config");
const Pusher = require('pusher');
const generatePDF = require("./generatePdf");

// Routes
const userRoutes = require("./routes/userRoutes");
const courseRoutes = require("./routes/courseRoutes");
const orderRoutes = require("./routes/orderRoutes");
const discussRoutes = require("./routes/discussRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const instructorRoutes = require("./routes/instructorRoutes");
const contactFormRoute = require("./routes/contactFormRoutes");
const careerFormRoute = require("./routes/careerFormRoutes");
const otpRoutes = require("./routes/otpRoutes");
const instructorPayments = require("./routes/instructorPaymentRoutes")

dotenv.config();

// Connecting to mongodb server
connectDB();

// express application
const app = express();

// allow CORS
app.use(cors());

// Body Parser middleware, no need to install body-parser package
app.use(express.json());

//Port
const PORT = process.env.PORT;

// Pusher - code editor
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  useTLS: true,
});

// Pusher
app.post('/update-editor', (req, res) => {
  pusher.trigger('editor', 'text-update', {
   ...req.body,
  });

  res.status(200).send('OK');
});


// Certificacte
app.post("/getCertificate", async (req, res) => {
  // res.send("<h1>Welcome to Full Stack Simplified</h1>");
  // res.download("output.pdf");
  try {
    const { name, email, course } = req.body;
    console.log(name, email, course);
    generatePDF(name, email, course);
    res.download("CertificateOfCompletion.pdf");
    res.status(200).json({
      success: true,
      data: "Successfull",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: true,
      data: error,
    });
  }
});
// generatePDF("Raj Sanghavi", "rajsanghavi9@gmail.com", "HTML COURSE");

app.use("/user", userRoutes);
app.use("/course", courseRoutes);
app.use("/order", orderRoutes);
app.use("/discuss", discussRoutes);
app.use("/testimonial", testimonialRoutes);
app.use("/assignment", assignmentRoutes);
app.use("/admin", adminRoutes);
app.use("/instructor", instructorRoutes);
app.use("/contact", contactFormRoute);
app.use("/career", careerFormRoute);
app.use("/otp", otpRoutes);
app.use("/instructorPayments", instructorPayments);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
