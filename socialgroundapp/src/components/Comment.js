/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
// import { mentionsInput, Mention } from 'react-mentions';

function Comment({ commentObj, users }) {
  const { userId } = commentObj;
  // const { username } = commentObj;
  const commentUser = users.find((t) => t._id === userId);

  // users.find(function (element) {
  //   // console.log('element is: ');
  //   // console.log(element);
  //   // console.log(element._id);
  // return element._id === (userId);
  // return element.username === username;
  // });
  // (t) => t._id === JSON.stringify(userId));
  // console.log(users.find);
  // console.log('' + userId);

  const displayName = commentUser?.username;
  const { content } = commentObj;

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: '36ch',
        bgcolor: 'Background.paper',
      }}
    >
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="https://images.unsplash.com/photo-1609220361638-14ceb45e5e1e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max" />
        </ListItemAvatar>
        <ListItemText
          primary={displayName}
          secondary={(
            <Typography
              component="span"
              variant="body2"
              color="textPrimary"
              sx={{
                display: 'inline',
              }}
            >
              {content}
            </Typography>
          )}
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  );
}
Comment.propTypes = {
  commentObj: PropTypes.shape({
    userId: PropTypes.string,
    content: PropTypes.string,
    _id: PropTypes.string.isRequired,
  }).isRequired,
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
export default Comment;
