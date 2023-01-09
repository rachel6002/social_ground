/* eslint-disable no-underscore-dangle */
import React, { useRef, useEffect, useState } from 'react';
import '../css/profile.css';
import { Link } from 'react-router-dom';
import setting from '../icons/settings.png';
import defaultUser from '../icons/default_user.png';
import smallLogo from '../socialground_small.png';
import circledPlus from '../images/circled_plus.jpg';
import {
  getUser, getPostByUser, getUsers, getComments,
} from '../api/mock_api';

const profile = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [commentList, setComments] = useState();
  const [userList, setUsers] = useState();
  // const postNum = (!currentUser?.postCount || currentUser.postCount === undefined
  //   || currentUser?.postCount === null) ? 0 : currentUser?.postCount;
  const followingCount = (!currentUser?.following?.length
      || currentUser?.following?.length === undefined
      || currentUser?.following?.length === null) ? 0 : currentUser?.following?.length;
  const followerCount = (!currentUser?.follower?.length
    || currentUser?.follower?.length === undefined
    || currentUser?.follower?.length === null) ? 0 : currentUser?.follower?.length;

  useEffect(() => {
    getUser(sessionStorage.getItem('user').slice(1, -1)).then((res) => {
      setCurrentUser(res);
      const fetchUserData = async () => {
        const userData = await getUsers();
        setUsers(userData);
      };
      const fetchCommentData = async () => {
        const commentData = await getComments();
        setComments(commentData);
      };
      fetchUserData()
        .catch(console.error);
      fetchCommentData()
        .catch(console.error);
    });
  }, []);
  // using state to save image
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');
  const [image4, setImage4] = useState('');
  const [image5, setImage5] = useState('');
  const [image6, setImage6] = useState('');
  const [image7, setImage7] = useState('');
  const [image8, setImage8] = useState('');
  const [image9, setImage9] = useState('');

  const firstRendering = useRef(true);

  async function loadImage() {
    if (!firstRendering) {
      return;
    }

    const posts = await getPostByUser(sessionStorage.getItem('user').slice(1, -1));
    setImage1(posts[0]);
    setImage2(posts[1]);
    setImage3(posts[2]);
    setImage4(posts[3]);
    setImage5(posts[4]);
    setImage6(posts[5]);
    setImage7(posts[6]);
    setImage8(posts[7]);
    setImage9(posts[8]);
    // console.log(image3);
    firstRendering.current = false;
  }
  if (firstRendering.current) {
    firstRendering.current = false;
    loadImage();
  }

  return (
    <div id="react-root">
      <div aria-disabled="false" role="button">
        <Link to="/Feed">
          <img src={smallLogo} className="sg-logo-small" alt="sg-logo-small" />
        </Link>
      </div>
      <div className="main-body">
        <div className="profile-bar">
          <div aria-disabled="false" role="button">
            <img src={defaultUser} className="default-user" alt="default-user" placeholder={defaultUser} />
          </div>
          <span className="profile-username">{currentUser?.username}</span>
          {/* <span className="posts">Posts</span> */}
          <span className="followers">Followers</span>
          <span className="following">Following</span>
          {/* <span className="posts-count">{postNum}</span> */}
          <Link to="/Find" state={{ listType: 'followers' }}>
            <span className="followers-count">{followerCount}</span>
          </Link>
          <Link to="/Find" state={{ listType: 'following' }}>
            <span className="following-count" id="cypress_test_following">{followingCount}</span>
          </Link>
          <div aria-disabled="false" role="button">
            <Link to="/upload">
              <img src={circledPlus} className="circled-plus" alt="circled-plus" />
            </Link>
          </div>
          <div aria-disabled="false" role="button">
            <Link to="/setting">
              <img src={setting} className="user-setting" alt="user-setting" />
            </Link>
          </div>
        </div>
        <div className="boxes">
          <Link
            to={`/post/${image1?._id}`}
            state={{
              post: image1, users: userList, comments: commentList, current: currentUser,
            }}
          >
            <div className="box1">
              <img src={image1?.content} alt="" width="100%" height="100%" />
            </div>
          </Link>
          <Link
            to={`/post/${image2?._id}`}
            state={{
              post: image2, users: userList, comments: commentList, current: currentUser,
            }}
          >
            <div className="box2">
              <img src={image2?.content} alt="" width="100%" height="100%" />
            </div>
          </Link>
          <Link
            to={`/post/${image3?._id}`}
            state={{
              post: image3, users: userList, comments: commentList, current: currentUser,
            }}
          >
            <div className="box3">
              <img src={image3?.content} alt="" width="100%" height="100%" />
            </div>
          </Link>
          <Link
            to={`/post/${image4?._id}`}
            state={{
              post: image4, users: userList, comments: commentList, current: currentUser,
            }}
          >
            <div className="box4">
              <img src={image4?.content} alt="" width="100%" height="100%" />
            </div>
          </Link>
          <Link
            to={`/post/${image5?._id}`}
            state={{
              post: image5, users: userList, comments: commentList, current: currentUser,
            }}
          >
            <div className="box5">
              <img src={image5?.content} alt="" width="100%" height="100%" />
            </div>
          </Link>
          <Link
            to={`/post/${image6?._id}`}
            state={{
              post: image6, users: userList, comments: commentList, current: currentUser,
            }}
          >
            <div className="box6">
              <img src={image6?.content} alt="" width="100%" height="100%" />
            </div>
          </Link>
          <Link
            to={`/post/${image7?._id}`}
            state={{
              post: image7, users: userList, comments: commentList, current: currentUser,
            }}
          >
            <div className="box7">
              <img src={image7?.content} alt="" width="100%" height="100%" />
            </div>
          </Link>
          <Link
            to={`/post/${image8?._id}`}
            state={{
              post: image8, users: userList, comments: commentList, current: currentUser,
            }}
          >
            <div className="box8">
              <img src={image8?.content} alt="" width="100%" height="100%" />
            </div>
          </Link>
          <Link
            to={`/post/${image9?._id}`}
            state={{
              post: image9, users: userList, comments: commentList, current: currentUser,
            }}
          >
            <div className="box9">
              <img src={image9?.content} alt="" width="100%" height="100%" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default profile;
