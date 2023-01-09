import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import smallLogo from '../socialground_small.png';
import search from '../icons/search.png';
import logout from '../icons/logout_icon.png';
import plussign from '../icons/plussign.png';
import userProfile from '../icons/userProfile.png';
import { setLogout } from '../api/mock_api';

function Navbar({ current }) {
  const navigate = useNavigate();
  const handleOnClick = async (e) => {
    e.preventDefault();
    await setLogout(current.email);
    window.location.href = '/';
    navigate('/');
  };
  return (
    <nav className="navbar">
      <div className="left-section-feed">
        <Link to="/feed">
          <img src={smallLogo} className="small-logo" alt="social ground logo " />
        </Link>
      </div>
      <div className="right-section-feed">
        <div className="logout-area">
          <button className="logout-btn" type="button" id="CypressLogout" onClick={handleOnClick}>
            <img src={logout} className="logout-icon" alt="logout icon" />
          </button>
        </div>
        <div className="search-icon-area">
          <Link to="/Find" state={{ listType: 'suggestion' }}>
            <button className="icon-btn" type="button">
              <img src={search} className="search-icon" alt="search icon" />
            </button>
          </Link>
        </div>
        <div className="plus-sign-area">
          <Link to="/upload">
            <button className="plus-btn" type="button">
              <img src={plussign} className="plus-sign-icon" alt="plus sign icon" />
            </button>
          </Link>
        </div>
        <div className="profile-icon-area">
          <Link to="/profile">
            <button className="profile-btn" type="button">
              <img src={userProfile} className="profile-icon" alt="profile-icon" />
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
Navbar.defaultProps = {
  current: null,
};

Navbar.propTypes = {
  current: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string,
    following: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
    followers: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
    suggested: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
  }),
};
export default Navbar;
