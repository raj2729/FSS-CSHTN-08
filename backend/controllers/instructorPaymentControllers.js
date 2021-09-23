const asyncHandler = require("express-async-handler");
const InstructorPayment = require("../models/InstructorPaymentSchema");
/*
LIST OF CONTROLLERS
1. paymentsToInstructors
*/

// 1. Get all  paytments to Instructors - 
const paymentsToInstructors = asyncHandler(async (req, res) => {
    const instructorPayments = await InstructorPayment.find({});
    res.status(200).json({
        success: true,
        data: instructorPayments
    })
}); 

module.exports = {
    paymentsToInstructors
};
