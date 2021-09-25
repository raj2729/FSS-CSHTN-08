const express = require("express");

const {
  createAssignment,
  getAllAssignmentsOfUser,
  getAllAssignmentsOfInstructor,
  updateToCertified,
  updateToUnSubmit,
  updateAssignmentComment,
} = require("../controllers/assignmentControllers");

const {
  instructorProtect,
  protect,
} = require("../middlewares/protectedRoutes");

const router = express.Router();

// Submit new Assignment
router.route("/submitAssignment").post(createAssignment);

// Get all assignments of a user by userId
router.route("/getAssignmentsOfUser/:id").get(getAllAssignmentsOfUser);

// Get all assignments of a user by userId
router
  .route("/getAllAssignmentsOfInstructor/:id")
  .get(getAllAssignmentsOfInstructor);

// Update to certified
router.route("/updateToCertified/:id").post(updateToCertified);

// Update to Unsubmit
router.route("/updateToUnSubmit/:id").post(updateToUnSubmit);

// Update Assignment Comment
router.route("/updateAssignmentComment/:id").post(updateAssignmentComment);

module.exports = router;
