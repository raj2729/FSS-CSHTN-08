const mongoose = require("mongoose");

const InstructorPaymentSchema = mongoose.Schema(
  {
    instructorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    date: {
      type: Date,
      required: true,
    },
    razorpay_payment_id: {
      type: String,
      required: true,
    },
    razorpay_order_id: {
      type: String,
      required: true,
    },
    razorpay_signature: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const InstructorPayment = mongoose.model("InstructorPayment", InstructorPaymentSchema);

module.exports = InstructorPayment;
