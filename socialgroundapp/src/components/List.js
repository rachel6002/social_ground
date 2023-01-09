/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import userProfile from '../icons/userProfile.png';
import { updateFollow } from '../api/mock_api';

function Follow({ follower, following, listType }) {
  const [UnfollowStatus, setUnfollowStatus] = useState(true);
  const [FollowStatus, setFollowStatus] = useState(false);
  if (listType === 'following') {
    const handleUnfollow = async (e) => {
      e.preventDefault();
      const action = UnfollowStatus === false ? 'follow' : 'unfollow';
      await updateFollow(follower, following, action);
      setUnfollowStatus(!UnfollowStatus);
    };
    return (
      <button className="submit-button-find" type="submit" onClick={handleUnfollow}>
        <div className="button-label">
          {UnfollowStatus ? 'Unfollow' : 'Follow'}
        </div>
      </button>
    );
  } if (listType === 'followers') {
    if (follower.following.includes(following._id)) {
      const handleUnfollow = async (e) => {
        e.preventDefault();
        const action = UnfollowStatus === false ? 'follow' : 'unfollow';
        await updateFollow(follower, following, action);
        setUnfollowStatus(!UnfollowStatus);
      };
      return (
        <button className="submit-button-find" type="submit" onClick={handleUnfollow}>
          <div className="button-label">
            {UnfollowStatus ? 'Unfollow' : 'Follow'}
          </div>
        </button>
      );
    }
  }

  if (follower.following.includes(following._id)) {
    const handleUnfollow = async (e) => {
      e.preventDefault();
      const action = UnfollowStatus === false ? 'follow' : 'unfollow';
      await updateFollow(follower, following, action);
      setUnfollowStatus(!UnfollowStatus);
    };
    return (
      <button className="submit-button-find" type="submit" onClick={handleUnfollow}>
        <div className="button-label">
          {UnfollowStatus ? 'Unfollow' : 'Follow'}
        </div>
      </button>
    );
  }
  const handleOnClick = async (e) => {
    e.preventDefault();
    const action = FollowStatus === false ? 'follow' : 'unfollow';
    await updateFollow(follower, following, action);
    setFollowStatus(!FollowStatus);
  };

  return (
    <button className="submit-button-find" type="submit" onClick={handleOnClick}>
      <div className="button-label">
        {FollowStatus ? 'Unfollow' : 'Follow'}
      </div>
    </button>
  );
}

function List({
  listType, current, users, input,
}) {
  let data = '';
  if (listType === 'suggestion') {
    const defaultData = users.filter((el) => el._id !== current._id); // Exclude self

    const suggestions = defaultData.filter((el) => {
      if (el.following && el.following.length > 0
         && current.following && current.following.length > 0
        && !current.following.includes(el._id)) {
        const followInCommon = el.following.filter(((x) => current.following.includes(x)));
        return followInCommon.length > 2;
      }
      return null;
    });
    const filteredData = defaultData.filter((el) => {
    // if no input the return the original
      if (input === '') {
        return el;
      } // return the item which contains the user input
      return el.username.toLowerCase().includes(input);
    });
    data = (input === '') ? suggestions : filteredData;
    data = (input === '') ? suggestions : filteredData;
  } else if (listType === 'followers') {
    const followers = users.filter((el) => {
      if (current.follower?.includes(el._id)) {
        return el;
      }
      return null;
    });
    data = followers;
  } else if (listType === 'following') {
    const following = users.filter((el) => {
      if (current.following?.includes(el._id)) {
        return el;
      }
      return null;
    });
    data = following;
  }
  return (
    <ul>
      {data.map((user) => (
        // eslint-disable-next-line no-underscore-dangle
        <li key={user._id}>
          <div className="user-info-area">
            <div className="left">
              <img src={userProfile} className="profile-icon" alt="" />
            </div>
            <div className="middle">
              <p className="username">
                {user.username}
              </p>
            </div>
            <div className="right">
              <Follow
                following={user}
                follower={current}
                listType={listType}
              />
            </div>
          </div>
        </li>
      ))}
    </ul>

  );
}
Follow.defaultProps = {
  follower: null,
  following: null,
};
List.defaultProps = {
  follower: null,
  following: null,
};

Follow.propTypes = {
  follower: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string,
    following: PropTypes.arrayOf(PropTypes.string),
    followers: PropTypes.arrayOf(PropTypes.string),
    suggested: PropTypes.arrayOf(PropTypes.string),
  }),
  following: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string,
    following: PropTypes.arrayOf(PropTypes.string),
    followers: PropTypes.arrayOf(PropTypes.string),
    suggested: PropTypes.arrayOf(PropTypes.string),
  }),
};

List.propTypes = {
  input: PropTypes.string.isRequired,
  current: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string,
    following: PropTypes.arrayOf(PropTypes.string),
    followers: PropTypes.arrayOf(PropTypes.string),
    suggested: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string,
    password: PropTypes.string,
    following: PropTypes.arrayOf(PropTypes.string),
    followers: PropTypes.arrayOf(PropTypes.string),
    postCount: PropTypes.number,
  }).isRequired).isRequired,
  listType: PropTypes.string.isRequired,
  follower: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string,
    following: PropTypes.arrayOf(PropTypes.string),
    followers: PropTypes.arrayOf(PropTypes.string),
    suggested: PropTypes.arrayOf(PropTypes.string),
    password: PropTypes.arrayOf(PropTypes.string),
  }),
  following: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string,
    following: PropTypes.arrayOf(PropTypes.string),
    followers: PropTypes.arrayOf(PropTypes.string),
    suggested: PropTypes.arrayOf(PropTypes.string),
    password: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default List;
