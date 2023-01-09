/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { IconButton } from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import PropTypes from 'prop-types';
import books from '../images/books.jpeg';
import deleteIcon from '../icons/delete.png';
import hideIcon from '../icons/hide.png';
import Comments from './Comments';
import CreateComment from './Create';
import { deletePosts, editCaption, addHiddenUserToPost } from '../api/mock_api';
import Like from './Likes';

function Post({
  post, comments, current, users,
}) {
  const navigate = useNavigate();
  async function handleDelete(e) {
    // const user = current;
    deletePosts(e);
    setTimeout(navigate('/profile'), 8000);
  }
  async function handleCaption(e) {
    const newCaption = document.getElementById('editCaptionText').value;
    editCaption(e, newCaption);
  }
  async function handleHidePost(e) {
    addHiddenUserToPost(e, current._id);
  }

  return (
    <div className="post">
      <div className="profile-info">
        <div className="profile-area">
          <Avatar
            src={books}
            alt="User"
          />
        </div>
        <Link to="../profile" className="username">
          {post.author}
        </Link>
        <div className="post-top-right-section">
          <button type="button" id="editPostButton" onClick={() => handleHidePost(post)}>
            <img src={hideIcon} id="editButton" alt="editButton" />
          </button>
          <button type="button" id="deletePostButton" onClick={() => handleDelete(post)}>
            <img src={deleteIcon} id="deleteButton" alt="deleteButton" />
          </button>
        </div>
      </div>
      <div className="postArea">
        <img src={post.content} className="post-image" alt="pic" />
      </div>
      <div className="likeArea">
        <div className="like-box">
          <Like post={post} current={current} />
        </div>
        <div className="comment-box">
          <IconButton>
            <CommentIcon sx={{ fontSize: 30 }} color="inherited" />
          </IconButton>
        </div>
      </div>
      <br />
      <div className="captionArea">
        <Link to={`users/${post.userId}`} className="username">{post.author}</Link>
        <textarea id="editCaptionText" className="caption">
          {/* {' '} */}
          {post.caption}
          {/* {' '} */}
        </textarea>
        <button type="button" id="editCaptionButton" className="edit-caption-button" data-testid="editCaptionButton" onClick={() => handleCaption(post)}>Edit</button>
      </div>
      <div className="numComments">
        <Comments commentID={post.comments} comments={comments} users={users} />
      </div>
      {' '}
      <br />
      <div className="bottom">
        <CreateComment postId={post._id} users={users} />
      </div>
    </div>
  );
}

Post.defaultProps = {
  current: null,
  comments: null,
};

Post.propTypes = {
  post: PropTypes.shape({
    caption: PropTypes.string,
    content: PropTypes.string,
    author: PropTypes.string,
    _id: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    comments: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
    likes: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
  }).isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({
    user: PropTypes.string,
    content: PropTypes.string,
    _id: PropTypes.string.isRequired,
  })),
  current: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string,
    following: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
    followers: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
    suggested: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
  }),
  users: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    username: PropTypes.string.isRequired,
    email: PropTypes.string,
    password: PropTypes.string,
    following: PropTypes.arrayOf(PropTypes.string),
    followers: PropTypes.arrayOf(PropTypes.string),
    postCount: PropTypes.number,
    _id: PropTypes.string.isRequired,
  })).isRequired,
};

export default Post;
