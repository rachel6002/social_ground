/* eslint-disable no-underscore-dangle */
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import largeLogo from '../socialground_large.png';
import '../css/loginStyle.css';
import Feed from './ActivityFeed';
import {
  getUserByEmail, setLogin, setAccountOnHold, getAccountOnHold, deleteAccountOnHold,
} from '../api/mock_api';

function login() {
  const navigate = useNavigate();
  const loginAttempt = useRef(0);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(sessionStorage.getItem('app-token') === null);
  if (!error) {
    window.location.href = './Feed';
      <Feed />;
  }
  const userAccount = {
    accountEmail: userEmail,
    accountPassword: userPassword,
    id: '',
  };

  const handleUserEmail = (e) => {
    setUserEmail(e.target.value);
  };

  const handleUserPassword = (e) => {
    setUserPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const currUser = await getUserByEmail(userEmail);
    if (!currUser) {
      setError(true);
      setErrorMessage('Invalid Credentials.');
      return;
    }
    // STEP 2: Check if account is on hold due to too many login attempts
    const checkAccountOnHold = await getAccountOnHold(currUser._id);

    if (checkAccountOnHold) {
      const timeNow = Math.floor(120 - (Date.now() - checkAccountOnHold.time) / (1000 * 60));
      // if account is locked for more than 2 hours then unlock
      if (timeNow <= 0) {
        deleteAccountOnHold(currUser._id);
        setErrorMessage('');
      }
      setError(true);
      setErrorMessage(`Too Many Login Attempts. Please Retry Again After ${timeNow} Minutes.`);
      return;
    }
    // STEP 3: Check if credentials are correct
    if (currUser.password === userPassword
      && currUser.email === userEmail) {
      setError(false);
      setErrorMessage('');
      userAccount.id = currUser._id;
      sessionStorage.setItem('user', JSON.stringify(currUser._id));
      setLogin(currUser.email);
      // setConnected(true);
      if (currUser.following.length === 0) {
        navigate('./Find', {
          state: {
            listType: 'suggestion',
          },
        });
      }
    } else {
      setError(true);
      setErrorMessage('Invalid Credentials.');
      loginAttempt.current += 1;
      console.log(loginAttempt.current);
      // Logout policy - lock after 3 times
      if (loginAttempt.current >= 3) {
        setAccountOnHold(currUser._id, Date.now());
        setError(true);
        setErrorMessage('Too Many Login Attempts. Please Retry Again In 2 Hours.');
      }
    }
  };
  return error ? (
    <div id="react-root">
      <div className="login">
        <div className="form-container">
          <form className="login-form" id="login-form" method="post" onSubmit={handleLogin}>
            <div className="large-sg-header-homepage-redirect">
              <a href="/">
                <div aria-disabled="false">
                  <img src={largeLogo} className="large-logo" alt="large_logo" />
                </div>
              </a>
            </div>
            {error && <div className="errorMessage">{errorMessage}</div>}
            <div className="form-divider">
              <div className="form-row-container">
                <div className="form-cell">
                  <label className="form-entry-box" htmlFor="formInput1">
                    <span className="form-fields">Enter Your Email</span>
                    <input
                      aria-label="Enter Your Email"
                      aria-required="true"
                      autoCapitalize="off"
                      autoCorrect="off"
                      maxLength="100"
                      name="email"
                      type="text"
                      className="form-field-entry"
                      value={userEmail}
                      onChange={(e) => handleUserEmail(e)}
                      id="formInput1"
                      data-testid="loginUserEmail"
                    />
                  </label>
                </div>
              </div>
              <div className="form-row-container">
                <div className="form-cell">
                  <label className="form-entry-box" htmlFor="formInput2">
                    <span className="form-fields">Enter Your Password</span>
                    <input
                      aria-label="Enter Your Password"
                      aria-required="true"
                      autoCapitalize="off"
                      autoCorrect="off"
                      maxLength="100"
                      name="password"
                      type="password"
                      className="form-field-entry"
                      value={userPassword}
                      onChange={(e) => handleUserPassword(e)}
                      id="formInput2"
                      data-testid="loginUserPw"
                    />
                  </label>
                </div>
              </div>
              {/* <a className="password-reset" href="/reset">Forgot password?</a> */}
              <br />
              <div className="form-submit">
                <button className="submit-button" type="submit">
                  <div className="button-label">Log In</div>
                </button>
              </div>
            </div>
            <div className="sign-up-container">
              <p className="sign-up-redirect">
                Don&apos;t have an account?&nbsp;
                <a href="./registration">
                  <span className="sign-up">Sign up</span>
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
    : (
      navigate('./Feed')
    );
  // (navigate(`./Feed/${userAccount.id}`));
}

export default login;
