import chalk from "chalk";
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import { createJSONToken } from "../../AuthManager/auth.js";

const doctorSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error(
          chalk.redBright.inverse("Please check you enter a valid email!")
        );
      }
    },
  },
  name: { type: String },
  age: { type: Number, min: 21 },
  gender: { type: String },
  specialty: { type: String },
  officeContactInfo: { type: String },
  officeAddress: { type: String, trim: true },
  password: {
    type: String,
    trim: true,
    required: true,
    minlength: 8,
    validate(value) {
      if (value.toLowerCase().includes("password"))
        throw new Error(
          chalk.redBright.inverse("Password contains the word password!")
        );
    },
  },
  tokens: {
    token: {
      type: String,
    },
  },
});

// method for generating auth Tokens
doctorSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = createJSONToken({
    _id: user._id.toString(),
    userType: "DOCTOR",
  });
  // we are also going to store the token in the database, and overwrite it if one already exists
  user.tokens = { token };
  await user.save();
  return token;
};

// check user credentials using compare method of bcrypt
doctorSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  // console.log("FROM FN: " + user);

  if (!user) {
    return null;
  }
  const isMatch = await bcrypt.compare(password, user.password);
  // console.log("IS MATCHED?" + isMatch);
  if (!isMatch) {
    return null;
  }
  return user;
};
// hash the user password before saving
doctorSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});
const User = mongoose.model("Doctor", doctorSchema);
export default User;
