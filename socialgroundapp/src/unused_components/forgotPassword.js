import React from 'react';
// import largeLogo from './socialground_large.png';
import smallLogo from '../socialground_small.png';
import defaultUser from '../icons/default_user.png';
import '../css/loginStyle.css';

function forgot() {
  return (
    <div id="react-root">
      <div className="reset_password">
        <div className="small-sg-header-homepage-redirect">
          <a href="/">
            <div aria-disabled="false" role="button">
              <img src={smallLogo} className="small-logo" alt="SMALL_logo" />
            </div>
          </a>
        </div>
        <div className="form-container">
          <div className="question-mark-icon">
            <img src={defaultUser} className="default-user" alt="default-user" />
          </div>
          <form className="reset-form" id="reset-form" method="post">
            <div className="login-trouble">
              <h3 className="login-trouble-label">
                Can&apos;t Log In?
              </h3>
            </div>
            <div className="login-trouble-description">
              <h3 className="login-trouble-description-label">
                Enter your email and we&apos;ll send you a link to reset your password.
              </h3>
            </div>
            <div className="form-divider">
              <div className="form-row-container">
                <div className="form-cell">
                  <label className="form-entry-box" htmlFor="formInput5">
                    <span className="form-fields">Email</span>
                    <input
                      aria-label="Enter Your Email"
                      aria-required="true"
                      autoCapitalize="off"
                      autoCorrect="off"
                      maxLength="75"
                      name="resetPwEmail"
                      type="text"
                      className="form-field-entry"
                      // value=""
                      id="formInput5"
                    />
                  </label>
                </div>
              </div>
              <br />
              <div className="form-submit">
                <button className="reset-button" type="submit">
                  <div className="button-label">Get link to reset password</div>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default forgot;
