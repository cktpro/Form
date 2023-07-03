<>
<div className=" form-signin w-100 m-auto">
  {getTitle}

  {currentStep === REGISTER_STEP.EMAIL_STEP && (
    <>
      <div className="input-group has-validation mb-4">
        <div
          className={`form-floating ${isErrorEmail && 'is-invalid'}`}
        >
          <input
            type="text"
            className={`form-control ${isErrorEmail && 'is-invalid'}`}
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
          <div className="invalid-feedback">
            {validationEmail.errors?.email}
          </div>
        )}
      </div>
    </>
  )}

  {currentStep === REGISTER_STEP.INFO_STEP && (
    <>
      <div className="input-group has-validation mb-4">
        <div
          className={`form-floating ${isErrorInfo('name') && 'is-invalid'}`}
        >
          <input
            type="text"
            className={`form-control ${isErrorInfo('name') && 'is-invalid'}`}
            id="floatingName"
            placeholder="Name"
            name="name"
            value={validationInfo.values.name}
            onChange={validationInfo.handleChange}
            onBlur={validationInfo.handleBlur}
          />

          <label htmlFor="floatingName">Name</label>
        </div>
        {isErrorInfo('name') && (
          <div className="invalid-feedback">
            {validationInfo.errors?.name}
          </div>
        )}
      </div>

      <div className="input-group has-validation mb-4">
        <div
          className={`form-floating ${isErrorInfo('password') && 'is-invalid'}`}
        >
          <input
            type="password"
            className={`form-control ${isErrorInfo('password') && 'is-invalid'}`}
            id="floatingPass"
            placeholder="***"
            name="password"
            value={validationInfo.values.password}
            onChange={validationInfo.handleChange}
            onBlur={validationInfo.handleBlur}
          />

          <label htmlFor="floatingPass">Password</label>
        </div>
        {isErrorInfo('password') && (
          <div className="invalid-feedback">
            {validationInfo.errors?.password}
          </div>
        )}
      </div>
    </>
  )}

  {currentStep === REGISTER_STEP.SUCCESS_STEP && (
    <>
      <div className="p-3 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3">
        Registed success!!!
      </div>
    </>
  )}

  {currentStep !== REGISTER_STEP.SUCCESS_STEP && (
    <button
      className="btn btn-primary w-100 py-2"
      type="submit"
      onClick={onClickButton}
    >
      {/* {
          currentStep === REGISTER_STEP.EMAIL_STEP ? 'Continue' : '| Agree and continue'
        } */}
      {buttonContent}
    </button>
  )}
</div>
</>