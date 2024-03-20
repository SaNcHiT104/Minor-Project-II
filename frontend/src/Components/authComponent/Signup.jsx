import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import classes from "./Login.module.css";
import styles from "./WelcomePage.module.css";
import {
  isConfirmPasswordCorrect,
  isEmailCorrect,
  isPasswordCorrect,
  isUserTypeCorrect,
  users,
} from "./authHandler";
import RadioGroup from "./RadioGroup";

const SignUp = () => {
  const navigate = useNavigate();
  // keep track of the userType also
  const options = ["PATIENT", "DOCTOR"];
  const [formData, changeFormData] = useState({
    email: "",
    password: "",
    confirmpassword: "",
    userType: "PATIENT",
  });
  const [inputDataError, inputDataErrorHandler] = useState({
    email: false,
    password: false,
    confirmpassword: false,
    userType: false,
  });

  function onSubmitHandler(event) {
    // implement fetch query for backend!
    event.preventDefault();
    let errorDetected = false;
    // validate the form data
    if (!isEmailCorrect(formData.email)) {
      errorDetected = true;
      inputDataErrorHandler((prev) => ({
        ...prev,
        email: true,
      }));
    }
    if (!isPasswordCorrect(formData.password)) {
      errorDetected = true;
      inputDataErrorHandler((prev) => ({
        ...prev,
        password: true,
      }));
    }
    if (
      !isConfirmPasswordCorrect(formData.confirmpassword, formData.password)
    ) {
      errorDetected = true;
      inputDataErrorHandler((prev) => ({
        ...prev,
        confirmpassword: true,
      }));
    }

    if (!isUserTypeCorrect(formData.userType)) {
      errorDetected = true;
      inputDataErrorHandler((prev) => ({
        ...prev,
        userType: true,
      }));
    }
    // if validation fails, set the inputDataError acordingly
    if (errorDetected) {
      return;
    }

    console.log("SIGN UP SUCCESSFUL!");
    users.push(formData);
    console.log(formData);
    navigate("/login");
  }

  function formDataChangeHandler(identifier, event) {
    changeFormData((prev) => ({
      ...prev,
      [identifier]: event.target.value.trim(),
    }));
  }

  let content = (
    <>
      <label htmlFor="email" className={classes.form_heading}>
        Email:
      </label>
      <input
        type="email"
        id="email"
        name="email"
        required
        className={classes.label}
        value={formData.email}
        onChange={(event) => {
          formDataChangeHandler("email", event);
        }}
      />
      {inputDataError.email && (
        <p className={classes.correct}>Please Enter a valid email</p>
      )}
      <label htmlFor="password" className={classes.form_heading}>
        Password:
      </label>
      <input
        type="password"
        id="password"
        name="password"
        required
        className={classes.label}
        value={formData.password}
        onChange={(event) => {
          formDataChangeHandler("password", event);
        }}
      />
      {inputDataError.password && (
        <p className={classes.correct}>
          Password must be 8 or more characters long and must not contain the
          word password!
        </p>
      )}
      <label htmlFor="confirmpassword" className={classes.form_heading}>
        Confirm Password
      </label>
      <input
        type="password"
        id="confirmpassword"
        name="confirmpassword"
        required
        className={classes.label}
        value={formData.confirmpassword}
        onChange={(event) => {
          formDataChangeHandler("confirmpassword", event);
        }}
      />
      {inputDataError.confirmpassword && (
        <p className={classes.correct}>Password should match</p>
      )}
      <label className={classes.form_heading}>
        User Type
      </label>
      <br />
      <RadioGroup
        className={classes.label}
        options={options}
        value={formData.userType}
        setValue={(event) => {
          formDataChangeHandler("userType", event);
        }}
      />
      {inputDataError.userType && (
        <p className={classes.correct}>Invalid user type detected!</p>
      )}
      <button className={classes.login} type="submit">
        Sign Up
      </button>
    </>
  );

  return (
    <>
      <div className={styles.welcome}>
        <div className={styles.container}>
          <div className={styles.left}>
            <div className={styles.heading}>
              <div className={classes.heading_primary}>
                <p>Welcome!</p>
              </div>
              <div className={styles.heading_secondary}>
                <p>
                  Simplify your health journey. Find, book, and prioritize your
                  well-being effortlessly with our user-friendly platform.
                  Discover the right doctor and secure appointments seamlessly.
                </p>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            Sign up and we'll get you in to see our Doctors!
            <form className={classes.login_form} onSubmit={onSubmitHandler}>
              {content}
            </form>
            <Link to="/login" className={classes.last}>
              Already have an account? Log In!
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;