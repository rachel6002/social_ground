/* eslint-disable no-underscore-dangle */
import PropTypes from 'prop-types';
import React from 'react';
import Post from './Post';

function Posts({
  posts, comments, current, users,
}) {
  return (
    <div id="posts">
      {posts.map((post) => (
        <article className="post-box" key={post._id}>
          <Post post={post} comments={comments} current={current} users={users} />
        </article>
      ))}
    </div>
  );
}
Posts.defaultProps = {
  current: null,
  comments: null,
  users: null,
};

Posts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    caption: PropTypes.string,
    body: PropTypes.string,
    author: PropTypes.string,
    _id: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    likes: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
  }).isRequired).isRequired,
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
  })),
};

export default Posts;
