import React, { useCallback, useMemo, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import "./form.css";

const REGISTER_STEP = {
  EMAIL_STEP: 1,
  INFO_STEP: 2,
  SUCCESS_STEP: 3,
};

function Form(props) {
  const [currentStep, setCurrentStep] = useState(REGISTER_STEP.EMAIL_STEP);

  const validationEmail = useFormik({
    initialValues: {
      email: "",
    },

    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email format").required("Required!"),
    }),

    onSubmit: (values) => {
      // step 1: call Api and verify email
      // step 2: nếu thành công thì  chuyển sang step tiếp theo
      // step 2: nếu thất bại => hiển thị lỗi
      // setCurrentStep(REGISTER_STEP.INFO_STEP);
      setCurrentStep((step) => step + 1);
    },
  });

  const validationInfo = useFormik({
    initialValues: {
      name: "",
      password: "",
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Mininum 3 characters")
        .max(20, "Maximum 20 characters")
        .required("Name is Required!"),
      password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Password is Required!"),
    }),

    onSubmit: (values) => {
      const { name, password } = values;
      // const { email, password } = values;

      const data = {
        email: validationEmail.values.email,
        name,
        password,
      };

      // onSubmitAsync({ email, password })

      console.log("««««« Call API with value »»»»»", data);

      setCurrentStep(REGISTER_STEP.SUCCESS_STEP);
    },
  });

  const buttonContent = useMemo(() => {
    switch (currentStep) {
      case REGISTER_STEP.EMAIL_STEP:
        return "Continue";

      case REGISTER_STEP.INFO_STEP:
        return "Agree and continue";
      case REGISTER_STEP.SUCCESS_STEP:
        return "Login";

      default:
        return "Continue";
    }
  }, [currentStep]);

  const onClickButton = useCallback(
    (e) => {
      e.preventDefault();

      if (currentStep === REGISTER_STEP.EMAIL_STEP) {
        validationEmail.handleSubmit();
      }

      if (currentStep === REGISTER_STEP.INFO_STEP) {
        validationInfo.handleSubmit();
      }
    },
    [currentStep, validationEmail, validationInfo]
  );

  const getTitle = useMemo(() => {
    switch (currentStep) {
      case REGISTER_STEP.EMAIL_STEP:
        return <h1 className="h3 mb-3 fw-normal">Hi! </h1>;

      case REGISTER_STEP.INFO_STEP:
        return <h1 className="h3 mb-3 fw-normal">Sign up</h1>;

      default:
        return;
    }
  }, [currentStep]);

  const isErrorEmail = useMemo(() => {
    if (validationEmail.errors?.email && validationEmail.touched?.email) {
      return true;
    }
    return false;
  }, [validationEmail.errors?.email, validationEmail.touched?.email]);

  const isErrorInfo = (fieldName) => {
    if (validationInfo.errors[fieldName] && validationInfo.touched[fieldName]) {
      return true;
    }
    return false;
  };

  return (
    <div className="box">
      <div className="child">
        <div className=" form-signin w-100">
          {getTitle}

          {currentStep === REGISTER_STEP.EMAIL_STEP && (
            <>
              <div className="input-group has-validation mb-3">
                <div
                  className={`form-floating ${isErrorEmail && "is-invalid"}`}
                >
                  <input
                    type="text"
                    className={`form-control ${isErrorEmail && "is-invalid"}`}
                    id="floatingEmail"
                    placeholder="name@example.com"
                    name="email"
                    value={validationEmail.values.email}
                    onChange={validationEmail.handleChange}
                    onBlur={validationEmail.handleBlur}
                  />

                  <label htmlFor="floatingEmail">Email</label>
                </div>
                {isErrorEmail && (
                  <div className="invalid-feedback mt-3">
                    {validationEmail.errors?.email}
                  </div>
                )}
              </div>
            </>
          )}

          {currentStep === REGISTER_STEP.INFO_STEP && (
            <>
            
            <div className="term text-start my-3">
                Look like you don't have an account.<br/>Let create new account for<br/><span className="fw-bolder">{validationEmail.values.email}</span>
              </div>
              <div className="input-group has-validation mb-3">
                <div
                  className={`form-floating ${
                    isErrorInfo("name") && "is-invalid"
                  }`}
                >
                  <input
                    type="text"
                    className={`form-control ${
                      isErrorInfo("name") && "is-invalid"
                    }`}
                    id="floatingName"
                    placeholder="Name"
                    name="name"
                    value={validationInfo.values.name}
                    onChange={validationInfo.handleChange}
                    onBlur={validationInfo.handleBlur}
                  />

                  <label htmlFor="floatingName">Name</label>
                </div>
                {isErrorInfo("name") && (
                  <div className="invalid-feedback mt-3">
                    {validationInfo.errors?.name}
                  </div>
                )}
              </div>

              <div className="input-group has-validation mb-3">
                <div
                  className={`form-floating ${
                    isErrorInfo("password") && "is-invalid"
                  }`}
                >
                  <input
                    type="password"
                    className={`form-control ${
                      isErrorInfo("password") && "is-invalid"
                    }`}
                    id="floatingPass"
                    placeholder="***"
                    name="password"
                    value={validationInfo.values.password}
                    onChange={validationInfo.handleChange}
                    onBlur={validationInfo.handleBlur}
                  />

                  <label htmlFor="floatingPass">Password</label>
                </div>
                {isErrorInfo("password") && (
                  <div className="invalid-feedback mt-3">
                    {validationInfo.errors?.password}
                  </div>
                )}
              </div>
              <div className="term text-start my-3">
                By selecting Agree and continue below,
                <br />I agree to{" "}
                <a className="link" href="">
                  Terms of Services and Privacy Policy
                </a>
              </div>
            </>
          )}

          {currentStep === REGISTER_STEP.SUCCESS_STEP && (
            <>
              <div className="p-3 text-success-emphasis bg-success-subtle border border-primary-subtle rounded-3 my-3">
                Registed success!!!
              </div>
            </>
          )}

          {/* {currentStep !== REGISTER_STEP.SUCCESS_STEP && ( */}
          <button
            className="btn btn-green w-100 py-3"
            type="submit"
            onClick={onClickButton}
          >
            {/* {
          currentStep === REGISTER_STEP.EMAIL_STEP ? 'Continue' : '| Agree and continue'
        } */}
            {buttonContent}
          </button>
          {/* )} */}

          {currentStep === REGISTER_STEP.EMAIL_STEP && (
            <>
              <div className="my-2">
                <h5>or</h5>
              </div>
              <button className="btn btn-white w-100 py-3 mb-3">
                <img
                  className="logo"
                  src={require("assets/cover/facebook.png")}
                  alt="logo-facebook"
                />
                Continue with Facebook
              </button>
              <button className="btn btn-white w-100 py-3 mb-3">
                <img
                  className="logo"
                  src={require("assets/cover/google.png")}
                  alt="logo-google"
                />
                Continue with Google
              </button>
              <button className="btn btn-white w-100 py-3">
                <img
                  className="logo"
                  src={require("assets/cover/apple.png")}
                  alt="logo-apple"
                />
                Continue with Apple
              </button>
              <div className="term text-start my-3">
                <p className="mb-0">
                  Don't have an account? <a className="link" href="#">Sign up</a>
                </p>
                <p>
                  <a  className="link" href="#">Forgot your password?</a>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Form;
