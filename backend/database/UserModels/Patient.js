import chalk from "chalk";
import mongoose from "mongoose";
import validator from "validator";

export default mongoose.model("Patient", {
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
  name: { type: String, trim: true },
  age: { type: Number, min: 0, default: 0 },
  gender: { type: String },
  contactInfo: { type: String },
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
  address: { type: String, trim: true },
});
