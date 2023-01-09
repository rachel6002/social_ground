import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import largeLogo from '../socialground_large.png';
import '../css/loginStyle.css';
import { createUser } from '../api/mock_api';

function registration() {
  const navigate = useNavigate();

  // Registration states
  const [newName, setName] = useState('');
  const [newUsername, setUsername] = useState('');
  const [newEmail, setEmail] = useState('');
  const [newPassword, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Check for error
  const [blankError, setBlankError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  function registrationValidation() {
    if (newName === '' || newUsername === '' || newEmail === '' || newPassword === '' || confirmPassword === '') {
      setBlankError(true);
      setEmailError(false);
      setPasswordError(false);
      return true;
    }
    if (newEmail.indexOf('@') === -1 || newEmail.indexOf('.com') === -1) {
      setBlankError(false);
      setPasswordError(false);
      setEmailError(true);
      return true;
    }
    if (newPassword !== confirmPassword) {
      setBlankError(false);
      setEmailError(false);
      setPasswordError(true);
      return true;
    }
    // setSubmit(true);
    setBlankError(false);
    setEmailError(false);
    setPasswordError(false);
    return false;
  }
  const handleUsernameUpdate = (e) => {
    setUsername(e.target.value);
  };

  const handleNameUpdate = (e) => {
    setName(e.target.value);
    // setSubmit(false);
  };

  // Handling the email change
  const handleEmailUpdate = (e) => {
    setEmail(e.target.value);
  };

  // Handling the password change
  const handlePasswordUpdate = (e) => {
    setPassword(e.target.value);
  };

  // Handling the password change
  const handleConfirmPasswordUpdate = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (registrationValidation()) {
      return;
    }

    const newUser = {
      username: newUsername,
      name: newName,
      email: newEmail,
      password: newPassword,
      following: [],
      followers: [],
      postCount: 0,
      suggested: [],
    };
    await createUser(newUser);
    const form = document.getElementById('login-form');
    form.reset();
    navigate('/successful');
  };

  const blankErrorMessage = () => (
    <div
      className="regMsg"
      data-testid="blankregMsg"
      style={{
        display: blankError ? '' : 'none',
      }}
    >
      <h4>One or more fields is/are missing. Please fill in all fields.</h4>
    </div>
  );

  const emailErrorMessage = () => (
    <div
      className="regMsg"
      data-testid="emailErrorRegMsg"
      style={{
        display: emailError ? '' : 'none',
      }}
    >
      <h4>Your email is in an invalid format. Please re-enter.</h4>
    </div>
  );

  const passwordErrorMessage = () => (
    <div
      className="regMsg"
      data-testid="pwRegMsg"
      style={{
        display: passwordError ? '' : 'none',
      }}
    >
      <h4>Your password entries do not match. Please re-enter.</h4>
    </div>
  );

  return (
    <div id="react-root">
      <div className="login">
        <div className="form-container">
          <form className="login-form" id="login-form" method="post" onSubmit={handleSubmit}>
            <div className="large-sg-header-homepage-redirect">
              <a href="/">
                <div aria-disabled="false">
                  <img src={largeLogo} className="large-logo" alt="large_logo" />
                </div>
              </a>
            </div>
            <h2 className="registrationMessage">
              Sign up to see photos and videos from others.
            </h2>
            <div className="regMsg" id="regMsg">
              {blankErrorMessage()}
              {emailErrorMessage()}
              {passwordErrorMessage()}
            </div>
            <div className="form-divider">
              <div className="form-row-container">
                <div className="form-cell">
                  <label className="form-entry-box" htmlFor="formInput6">
                    <span className="form-fields">Full Name</span>
                    <input
                      aria-label="Full Name"
                      aria-required="true"
                      autoCapitalize="off"
                      autoCorrect="off"
                      maxLength="100"
                      name="newName"
                      type="text"
                      className="form-field-entry"
                      value={newName}
                      onChange={(e) => handleNameUpdate(e)}
                      id="formInput6"
                      data-testid="regNameUpdate"
                    />
                  </label>
                </div>
              </div>
              <div className="form-row-container">
                <div className="form-cell">
                  <label className="form-entry-box" htmlFor="formInput12">
                    <span className="form-fields">Username</span>
                    <input
                      aria-label="Username"
                      aria-required="true"
                      autoCapitalize="off"
                      autoCorrect="off"
                      maxLength="100"
                      name="newUsername"
                      type="text"
                      className="form-field-entry"
                      value={newUsername}
                      onChange={(e) => handleUsernameUpdate(e)}
                      id="formInput12"
                      data-testid="regUsernameUpdate"
                    />
                  </label>
                </div>
              </div>
              <div className="form-row-container">
                <div className="form-cell">
                  <label className="form-entry-box" htmlFor="formInput7">
                    <span className="form-fields">Email</span>
                    <input
                      aria-label="Email"
                      aria-required="true"
                      autoCapitalize="off"
                      autoCorrect="off"
                      maxLength="100"
                      name="newEmail"
                      type="text"
                      className="form-field-entry"
                      value={newEmail}
                      onChange={(e) => handleEmailUpdate(e)}
                      id="formInput7"
                      data-testid="regEmailUpdate"
                    />
                  </label>
                </div>
              </div>
              <div className="form-row-container">
                <div className="form-cell">
                  <label className="form-entry-box" htmlFor="formInput8">
                    <span className="form-fields">Password</span>
                    <input
                      aria-label="Password"
                      aria-required="true"
                      autoCapitalize="off"
                      autoCorrect="off"
                      maxLength="100"
                      name="newPassword"
                      type="password"
                      className="form-field-entry"
                      value={newPassword}
                      onChange={(e) => handlePasswordUpdate(e)}
                      id="formInput8"
                      data-testid="regPwUpdate"
                    />
                  </label>
                </div>
              </div>
              <div className="form-row-container">
                <div className="form-cell">
                  <label className="form-entry-box" htmlFor="formInput9">
                    <span className="form-fields">Confirm Password</span>
                    <input
                      aria-label="Confirm Password"
                      aria-required="true"
                      autoCapitalize="off"
                      autoCorrect="off"
                      maxLength="100"
                      name="confirmPassword"
                      type="password"
                      className="form-field-entry"
                      value={confirmPassword}
                      onChange={(e) => handleConfirmPasswordUpdate(e)}
                      id="formInput9"
                      data-testid="regConfirmPwUpdate"
                    />
                  </label>
                </div>
              </div>
              <br />
              <div className="form-submit">
                <button className="submit-button" type="submit">
                  <div className="button-label">Sign Up</div>
                </button>
              </div>
            </div>
            <div className="log-in-container">
              <p className="log-in-redirect">
                Already have an account?&nbsp;
                <a href="/">
                  <span className="log-in" id="regSign">Log In</span>
                </a>
              </p>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
}

export default registration;
