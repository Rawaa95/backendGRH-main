import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const experienceSchema = new mongoose.Schema(
  {
    title: String,
    company: String,
    startDate: Date,
    endDate: Date,
    description: String,
  },
  { _id: false }
);
const educationSchema = new mongoose.Schema(
  {
    school: String,
    degree: String,
    fieldOfStudy: String,
    startDate: Date,
    endDate: Date,
  },
  { _id: false }
);

const userSchenma = new mongoose.Schema({
  name: { type: String, require: [true, "A USER  must have a name"] },
  lastName: { type: String, require: [true, "A USER  must have last name"] },
  email: {
    type: String,
    require: [true, "A USER  must have a email "],
    unique: true,
    validate: [validator.isEmail, "please provide a valide email"],
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  bio: { type: String, require: false },
  experiences: { type: [experienceSchema], required: false },
  education: { type: [educationSchema], required: false },
  companyName: { type: String, required: false },

  photo: String,
  role: {
    type: [String],
    enum: ["user", "employer", "recruter", "admin"],
    default: "user",
  },
  password: {
    type: String,
    require: [true, "password is required"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    require: [true, "password is required"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
    },
  },
});

userSchenma.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchenma.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchenma);
export default User;
