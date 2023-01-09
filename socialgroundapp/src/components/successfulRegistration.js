import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import smallLogo from '../socialground_small.png';
import '../css/loginStyle.css';

function sucessfulRegistration() {
  const [redirectFlag, setRedirectFlag] = useState(false);
  setTimeout(() => setRedirectFlag(true), 10000);
  return redirectFlag ? (
    <Navigate to="/" />
  ) : (
    <div id="react-root">
      <div className="successfulRegistration">
        <div className="small-logo-redirect">
          <a href="/">
            <div aria-disabled="false" role="button">
              <img src={smallLogo} className="small_logo" alt="small_logo" />
            </div>
          </a>
        </div>
        <div className="successfulMessage" id="successfulMessage">

          <div className="successfulMessageRow">
            Your account has been successfully created! You will be redirected to the Login Page.
          </div>
          <div className="successfulMessageRow">
            <p className="mainPageredirect">
              <a href="/">
                <span className="redirectClick">Click here</span>
              </a>
              &nbsp;if the page is not redirected after a while.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default sucessfulRegistration;
