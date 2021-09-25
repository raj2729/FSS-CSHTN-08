const asyncHandler = require("express-async-handler");
const Course = require("../models/courseModel");
const Assignment = require("../models/assignmentModel");
const User = require("../models/userModel");
const nodemailer = require("nodemailer");

/*
LIST OF CONTROLLERS
1. Create an assignment
2. Get all assignments of a user by userId
3. Get all assignments of a instructor by instructorId
4. Update assignment status to certified
*/

// 1. Create a new assignment
const createAssignment = asyncHandler(async (req, res) => {
  const {
    userId,
    isCertified,
    assignmentLink,
    assignmentScreenshotLink,
    courseId,
    instructorId,
    assignmentStatus,
  } = req.body;
  // const userId = req.user._id;

  const submitted = await Assignment.find({ userId, courseId });

  if (submitted.length > 0) {
    console.log(submitted);
    // submitted[0].assignmentLink = assignmentLink;
    // submitted[0].assignmentScreenshotLink = assignmentScreenshotLink;
    // submitted[0].assignmentStatus = assignmentStatus;
    // submitted[0].isCertified = isCertified;
    // const newAssignment = new Assignment(submitted[0]);
    await Assignment.findByIdAndDelete(submitted[0]._id);
    const newAssignment = new Assignment({
      userId,
      courseId,
      isCertified,
      instructorId,
      assignmentLink,
      assignmentScreenshotLink,
      assignmentStatus,
      assignmentComment: "",
    });

    await newAssignment.save();

    return res.status(200).json({
      success: true,
      data: newAssignment,
    });
  }

  const course = await Course.find({ courseId });

  if (!course) {
    return res.status(400).json({
      success: false,
      message: "No such course found",
    });
  }

  const newAssignment = new Assignment({
    userId,
    courseId,
    isCertified,
    assignmentLink,
    instructorId,
    assignmentScreenshotLink,
    assignmentStatus: assignmentStatus,
    assignmentComment: "",
  });

  await newAssignment.save();
  // console.log(req.user);

  return res.status(200).json({
    success: true,
    data: newAssignment,
  });
});

// 2. Get all assignments of a user by userId
const getAllAssignmentsOfUser = asyncHandler(async (req, res) => {
  const orders = await Assignment.find({ userId: req.params.id }).populate(
    "courseId userId"
  );
  res.status(200).json({
    success: true,
    data: orders,
  });
});

// 3. Get all assignments of a instructor by instructorId
const getAllAssignmentsOfInstructor = asyncHandler(async (req, res) => {
  const assignments = await Assignment.find({
    instructorId: req.params.id,
    isCertified: false,
    assignmentStatus: "submit",
  }).populate("courseId userId");
  res.status(200).json({
    success: true,
    data: assignments,
  });
});

// 4. Update status to certified by assignment Id in params
const updateToCertified = asyncHandler(async (req, res) => {
  const assignment = await Assignment.findById(req.params.id);
  const { emailOfUser, comment, course } = req.body;
  if (assignment) {
    assignment.isCertified = true;
    const updatedAssignment = await assignment.save();
    const output = `
      '<h2>New instructor feedback on the assignment</h2>
    <p>The instructor has approved the assignment with the following feedback:</p>
    <ul>
    <li>Course name : ${course}</li>
      <li>Feedback : ${comment}</li>
    </ul>
    <p>Happy Learning</p>
    <p>Regards</p>
    <p>Team Full Stack Simplified</p>
  `;
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      // host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: `${process.env.FSS_EMAIL}`, // generated ethereal user
        pass: `${process.env.FSS_PASSWORD}`, // generated ethereal password
      },
      // If on localhost
      tls: {
        rejectUnauthorized: false,
      },
      service: "gmail",
    });

    // send mail with defined transport object
    let mailOptions = {
      // from: '"Nodemailer Testing" <raj.sanghavi1@svkmmumbai.onmicrosoft.com>', // sender address
      from: "Team Full Stack Simplified",
      to: `${emailOfUser}`, // list of receivers
      subject: "New instructor feedback on the assignment",
      html: output,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.json(error);
      } else {
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        res.status(200).json({
          success: true,
          emailSuccess: true,
          data: updatedAssignment,
        });
      }
    });
  } else {
    res.status(404).json({
      success: false,
      data: "Not certified",
    });
  }
});

// 5. Update status to unsubmit by assignment Id in params
const updateToUnSubmit = asyncHandler(async (req, res) => {
  const assignment = await Assignment.findById(req.params.id);
  const { emailOfUser, comment, course } = req.body;
  if (assignment) {
    assignment.assignmentStatus = "unsubmit";
    const updatedAssignment = await assignment.save();
    const output = `
      '<h2>New instructor feedback on the assignment</h2>
    <p>The instructor has not approved the assignment with the following feedback:</p>
    <ul>
    <li>Course name : ${course}</li>
      <li>Feedback : ${comment}</li>
    </ul>
    <p>Happy Learning</p>
    <p>Regards</p>
    <p>Team Full Stack Simplified</p>
  `;
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      // host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: `${process.env.FSS_EMAIL}`, // generated ethereal user
        pass: `${process.env.FSS_PASSWORD}`, // generated ethereal password
      },
      // If on localhost
      tls: {
        rejectUnauthorized: false,
      },
      service: "gmail",
    });

    // send mail with defined transport object
    let mailOptions = {
      // from: '"Nodemailer Testing" <raj.sanghavi1@svkmmumbai.onmicrosoft.com>', // sender address
      from: "Team Full Stack Simplified",
      to: `${emailOfUser}`, // list of receivers
      subject: "New instructor feedback on the assignment",
      html: output,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.json(error);
      } else {
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        res.status(200).json({
          success: true,
          emailSuccess: true,
          data: updatedAssignment,
        });
      }
    });
  } else {
    res.status(404).json({
      success: false,
      data: "Not certified",
    });
  }
});

// 6. Update comment of assignment
const updateAssignmentComment = asyncHandler(async (req, res) => {
  const assignment = await Assignment.findById(req.params.id);
  const { comment } = req.body;

  if (assignment) {
    assignment.assignmentComment = comment;
    const updatedAssignment = await assignment.save();
    res.status(200).json({
      success: true,
      data: updatedAssignment,
    });
  } else {
    res.status(404).json({
      success: false,
      data: "Not certified",
    });
  }
});

module.exports = {
  createAssignment,
  getAllAssignmentsOfUser,
  getAllAssignmentsOfInstructor,
  updateToCertified,
  updateToUnSubmit,
  updateAssignmentComment,
};
