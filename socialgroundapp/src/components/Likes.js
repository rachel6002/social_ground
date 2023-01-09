import React, { useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import { updateLikes } from '../api/mock_api';

function Like({ post, current }) {
  const [LikeStatus, setLikeStatus] = useState(false);
  const handleOnClick = async (e) => {
    e.preventDefault();
    const action = LikeStatus === false ? 'like' : 'unlike';
    // eslint-disable-next-line no-underscore-dangle
    await updateLikes(current, post._id, action);
    setLikeStatus(!LikeStatus);
  };

  return (
    <IconButton onClick={handleOnClick}>
      {LikeStatus ? <FavoriteIcon color="inherited" sx={{ fontSize: 30 }} />
        : <FavoriteBorderIcon sx={{ fontSize: 30 }} color="inherited" />}
    </IconButton>
  );
}

Like.propTypes = {
  post: PropTypes.shape({
    caption: PropTypes.string,
    body: PropTypes.string,
    author: PropTypes.string,
    _id: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    likes: PropTypes.arrayOf(),
  }).isRequired,
  current: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string,
    following: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
    followers: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
    suggested: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
  })).isRequired,
};
export default Like;
