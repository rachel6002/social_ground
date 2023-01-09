/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import { Button } from '@mui/material';
import { Mention, MentionsInput } from 'react-mentions';
import PropTypes from 'prop-types';
import {
  addCommentToPost, createComment, getUser,
} from '../api/mock_api';
import face from '../icons/face.png';
// users
function CreateComment({ postId, users }) {
  // console.log('+++++++++++++++++++++++++++++++++++++Create.js line 16 postId =');
  // console.log(JSON.stringify(users));
  // console.log(postId);
  // const [body, setBody] = useState('');
  // const [name, setname] = useState(null);
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [userdata, setUserdata] = useState([]);
  const postIdStr = JSON.stringify(postId);
  // 121622 changed to length - 1
  const postid = postIdStr.substring(postIdStr.indexOf(':') + 2, postIdStr.length - 1);
  // console.log('+++++++++++++++++++++++++++++++++++++Create.js line 25 postid =');
  // console.log(postid);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  // change fetch (below) to axios: shouldn't have API request in
  // small component (call API in top component instead)
  // 1. change to axios
  // 1. put this logic inside the activity feed page
  // 2. pass down the function in activity feed page from post to create
  // 3. comment rather than writing the API request inside the comment

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (value.length !== '') {
      const name = await getUser(sessionStorage.getItem('user').slice(1, -1));
      const commentData = await createComment(name._id, value);
      const resp = await addCommentToPost(commentData._id, postid);
      if (resp) {
        setValue('');
        document.getElementById('inpt').value = '';
        navigate('./Feed');
      }
    }
  };
  const fetchUserList = async () => {
    let i;
    const res = users;
    console.log('+++++++++++++++++++++++++++++ Create.js line 50');
    console.log(res);
    console.log(res[0]._id);
    console.log('+++++++++++++++++++++++++++++');
    const currentUser = await getUser(sessionStorage.getItem('user').slice(1, -1));

    const userArray = [];
    for (i = 0; i < res.length; i += 1) {
      console.log('This is res[i]._id !!!!!!!!!!!!!!!!!!!!!!!!!');
      console.log(res[i]._id);
      if (currentUser.following.includes(res[i]._id)) {
        userArray.push({ id: res[i]._id, display: res[i].username });
      }
    }
    setUserdata(userArray);
    console.log('this is Create.js line 62 ++++++++');
    console.log(userArray);
  };
  useEffect(() => {
    fetchUserList()
      .catch(console.err);
  }, []);
  // const fetchUserList = async () => {
  //   let i;
  //   // let obj;
  //   const res = await getUsers();
  //   // const res = users;
  //   // console.log(typeof (res));
  //   const userArray = [];

  //   for (i = 0; i < res.length; i += 1) {
  //     userArray.push({ id: res[i].id, display: res[i].username });
  //   // setUsers(res[0]);
  //   }
  //   // console.log(JSON.stringify(userArray));
  //   console.log(typeof (userArray));
  //   setUsers(userArray);
  //   console.log(userArray);
  // };
  // useEffect(() => {
  //   fetchUserList()
  //     .catch(console.err);
  // }, []);

  return (

    <form className="form-input">
      <div className="smily-face">
        <img src={face} className="happy-face-icon" alt="happy-face-icon" />
      </div>
      {/* <TextField
        sx={{ marginLeft: 1, marginRight: 2 }}
        required
        maxRows={4}
        variant="outlined"
        fullWidth
        onChange={handleChange}
        placeholder="Type"
        id="inpt"
        label="Add a comment"
        multiline
      /> */}
      <MentionsInput
        className="mentions"
        placeholder="Add a comment Here and Mention people using '@' "
        id="inpt"
        value={value}
        onChange={handleChange}
      >
        <Mention
          id="SuggestionList"
          // data={UserList}
          // data={userdata}
          data={userdata}
          trigger="@"
          // style={{overflow-y: scroll;}}
        />
      </MentionsInput>
      <Button
        sx={{ marginRight: 3 }}
        variant="contained"
        size="small"
        endIcon={<SendIcon />}
        type="submit"
        onClick={handleSubmit}
      >
        Send
      </Button>
    </form>
  );
}
CreateComment.defaultProps = {
  postId: null,
};
CreateComment.propTypes = {
  postId: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
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

export default CreateComment;
