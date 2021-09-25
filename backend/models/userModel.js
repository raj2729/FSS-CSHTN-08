const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isInstructor: {
      type: Boolean,
      required: true,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    appliedForInstructor: {
      type: Boolean,
      default: false,
    },
    profilePicture: {
      type: String,
      // required: true,
      default:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
    },
    githubLink: {
      type: String,
      // required: true,
      default: "",
    },
    linkedInLink: {
      type: String,
      // required: true,
      default: "",
    },
    resumeLink: {
      type: String,
      default: "https://d.novoresume.com/images/doc/functional-resume-template.png"
    },
    mobileNumber: {
      type: Number,
      // required: true,
      default: 0,
    },
    domains: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      required: true,
      default: "Describe yourself",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enterredPassword) {
  return await bcrypt.compare(enterredPassword, this.password);
};
// Middleware for password
// pre => before saving the user
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });
// Middleware for hashing password
// pre => before saving the user in the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(5);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
