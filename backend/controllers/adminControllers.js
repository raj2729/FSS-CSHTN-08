const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Course = require("../models/courseModel");
const Order = require("../models/orderModel");
const generateToken = require("../middlewares/generateToken");
/*
LIST OF CONTROLLERS
1. Admin Login
2. Get all instructors
3. Get all users
4. Get courses summary
*/

// 1. Ask a question - Logged in users
const adminLogin = asyncHandler(async (req, res) => {

    const { email, password } = req.body;  
    const user = await User.findOne({ email });
  
    if (user && (await user.matchPassword(password))) {
      if(user.isAdmin===true) {
        res.status(200).json({
          success: true,
          data: user,
          token: generateToken(user._id),
        });
      } else {
        res.status(404);
        throw new Error("You are not an admin.");      
      }
    } else {
      res.status(404);
      throw new Error("Invalid email or password.");
    }
  });

// 2. Get all Users
const getAllStudents = asyncHandler(async (req, res) => {
  const students = await User.find({isAdmin: false, isInstructor:false})
  res.status(200).json({
    success:true,
    data:students
  })
});

// 3. Get all instructors
const getAllInstructors = asyncHandler(async (req,res) => {
  let instructors = await User.find({isInstructor:true}).select('_id name email')
  const instructor = []
  for(let teacher of instructors) {
    let count = await Course.countDocuments({instructorId:teacher._id})
    instructor.push({teacher, count})
  }
  res.status(200).json({
    success: true,
    data: instructor
  })
})

// 4. Courses Page Admin Panel
const getCoursesSummary = asyncHandler(async (req,res)=> {
  const cour = await Course.find({}).populate('instructorId', 'name email').select("_id name type price ")
  let courses = [];
  for(let course of cour) {
    const count = await Order.countDocuments({courseId: course._id})
    courses.push({course, count})
  }
  res.status(200).json({
    success: true,
    data: courses
  })
})

// 5. Assign instructor
const assignInstructor = asyncHandler(async (req,res)=> {
  const {userId,decision} = req.params;
  if(decision==="accept") {
    const Instructor =  await User.findByIdAndUpdate(userId, {isInstructor: true, appliedForInstructor: false}, {new: true})
    res.status(200).json({
      success: true,
      message: "Instructor assigned",
      data: Instructor,
    })
  } else  if(decision==="reject") {
    const Instructor =  await User.findByIdAndUpdate(userId, {appliedForInstructor: false}, {new: true})
    res.status(200).json({
      success: true,
      message: "Instructor not assigned",
      data: Instructor
    })
  } else {
    res.status(200).json({
      success: false,
      error: "Enter proper decision"
    })
  }
})

// 6. Get all Users that requested for instructor position
const userRequests = asyncHandler((async(req,res)=> {
  const requests = await User.find({appliedForInstructor: true})
  res.status(200).json({
    success: true,
    data: requests
  })
}))

module.exports = {
    adminLogin,
    getAllStudents,
    getAllInstructors,
    getCoursesSummary,
    userRequests
};

