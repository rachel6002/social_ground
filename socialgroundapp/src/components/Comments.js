/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

function Comments({ commentID, comments, users }) {
  console.log('++++++++++++++++comments.js line 8; users = ');
  console.log('user is', users);
  let commentList = [];
  // console.log('The commentID in Comments.js before if statement is: ', commentID);
  if (commentID !== null && commentID !== undefined) {
    // console.log('The commentID in Comments.js is: ', commentID);
    console.log('entered comments.js line 13');
    console.log(commentList);
    commentList = comments.filter((obj) => commentID.includes(obj._id));
    console.log('the commentList is: ', commentList);
  }
  return (
    <div id="postComments">
      {commentList.map((cID) => (
        <article className="comment-lists" key={cID._id}>
          <Comment commentObj={cID} users={users} />
        </article>
      ))}
    </div>
  );
}

Comments.defaultProps = {
  commentID: null,
};

Comments.propTypes = {
  commentID: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
  comments: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.string,
    content: PropTypes.string,
    _id: PropTypes.string.isRequired,
  }).isRequired).isRequired,
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
export default Comments;
