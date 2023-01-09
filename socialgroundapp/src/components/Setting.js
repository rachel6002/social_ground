import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import smallLogo from '../socialground_small.png';
import '../css/loginStyle.css';
import defaultUser from '../icons/default_user.png';
import { getUser, updatePassword } from '../api/mock_api';

function setting() {
  const navigate = useNavigate();
  // const userId = '6389982a373e83308395e820';
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(true);

  const handleCurrentPassword = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmNewPassword = (e) => {
    setConfirmNewPassword(e.target.value);
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    const user = await getUser(sessionStorage.getItem('user').slice(1, -1));

    if (user.password !== currentPassword) {
      setError(true);
      setErrorMessage('Current password is not valid. Please re-enter.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setError(true);
      setErrorMessage('New password does not match confirmation password. Please re-enter.');
      return;
    }
    // eslint-disable-next-line no-underscore-dangle
    await updatePassword(sessionStorage.getItem('user').slice(1, -1), newPassword);
    setError(false);
    setErrorMessage('');
  };

  return error ? (
    <div id="react-root">
      <div className="reset_password">
        <div className="small-logo-redirect">
          <a href="/profile">
            <div aria-disabled="false" role="button">
              <img src={smallLogo} className="small_logo" alt="small_logo" />
            </div>
          </a>
        </div>
        <button type="button">
          <Link to="/profile">Back to Profile</Link>
        </button>
        <div className="form-container">
          <div className="user-setting-icon">
            <img src={defaultUser} className="user-setting-icon" alt="user-setting-icon" />
          </div>
          <form className="reset-form" id="reset-form" method="put" onSubmit={handlePasswordUpdate}>
            <div className="login-trouble-description">
              <h2 className="resetMessage">
                Update Your Account Password.
              </h2>
            </div>
            <div className="regMsg">
              {errorMessage}
            </div>
            <div className="form-divider">
              <div className="form-row-container">
                <div className="form-cell">
                  <label className="form-entry-box" htmlFor="formInput4">
                    <span className="form-fields">Current Password</span>
                    <input
                      aria-label="currPassword"
                      aria-required="true"
                      autoCapitalize="off"
                      autoCorrect="off"
                      maxLength="75"
                      name="currentPassword"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => handleCurrentPassword(e)}
                      className="form-field-entry"
                      id="formInput20"
                    />
                  </label>
                </div>
              </div>
              <div className="form-row-container">
                <div className="form-cell">
                  <label className="form-entry-box" htmlFor="formInput4">
                    <span className="form-fields">New Password</span>
                    <input
                      aria-label="newPassword"
                      aria-required="true"
                      autoCapitalize="off"
                      autoCorrect="off"
                      maxLength="75"
                      name="password"
                      type="password"
                      className="form-field-entry"
                      value={newPassword}
                      onChange={(e) => handleNewPassword(e)}
                      id="formInput4"
                    />
                  </label>
                </div>
              </div>
              <div className="form-row-container">
                <div className="form-cell">
                  <label className="form-entry-box" htmlFor="formInput4">
                    <span className="form-fields">Confirm New Password</span>
                    <input
                      aria-label="confirmNewPassword"
                      aria-required="true"
                      autoCapitalize="off"
                      autoCorrect="off"
                      maxLength="75"
                      name="confirmPassword"
                      type="password"
                      className="form-field-entry"
                      value={confirmNewPassword}
                      onChange={(e) => handleConfirmNewPassword(e)}
                      id="formInput10"
                    />
                  </label>
                </div>
              </div>
              <br />
              <div className="form-submit">
                <button className="reset-button" type="submit">
                  <div className="button-label">Submit</div>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : (navigate('/Profile'));
}

export default setting;
