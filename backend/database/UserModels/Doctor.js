import chalk from "chalk";
import mongoose from "mongoose";
import validator from "validator";

export default mongoose.model("Doctor", {
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
});
