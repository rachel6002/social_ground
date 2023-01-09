/* eslint-disable no-await-in-loop */
import React, { useEffect, useState } from 'react';
import '../style/Feed.css';
import Navbar from './Navbar';
import Posts from './Posts';
import Welcome from './Welcome';
import {
  getUsers, getComments, getUser, getPostByUser,
} from '../api/mock_api';

function Feed() {
  const [users, setUsers] = useState();
  const [comments, setComments] = useState();
  const [posts, setPosts] = useState();
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    const fetchPostData = async () => {
      const postData = [];
      const currentUserData = await getUser(sessionStorage.getItem('user').slice(1, -1));
      let i;
      let j;
      for (i = 0; i < currentUserData.following.length; i += 1) {
        const postToShow = await getPostByUser(currentUserData.following[i]);
        for (j = 0; j < postToShow.length; j += 1) {
          if (!postToShow[j].hidden.includes(sessionStorage.getItem('user').slice(1, -1))) {
            postData.push(postToShow[j]);
          }
        }
      }

      setPosts(postData);
    };
    const fetchUserData = async () => {
      const userData = await getUsers();
      setUsers(userData);
    };
    const fetchCommentData = async () => {
      const commentData = await getComments();
      setComments(commentData);
    };
    const fetchCurrData = async () => {
      const currentUserData = await getUser(sessionStorage.getItem('user').slice(1, -1));
      setCurrentUser(currentUserData);
    };

    // we want to fetch the users frequently (5 s)
    // we will use server polling with setInterval
    setInterval(() => {
      fetchPostData()
        .catch(console.error);
      fetchUserData()
        .catch(console.error);
      fetchCommentData()
        .catch(console.error);
      fetchCurrData()
        .catch(console.error);
    }, 3000);
  }, []);
  console.log(`currentUser in feed: ${currentUser}`);
  const [redirectFlag, setRedirectFlag] = useState(false);
  setTimeout(() => setRedirectFlag(true), 5000);
  return redirectFlag
    ? (
      <div className="Feed">
        <Navbar current={currentUser} users={users} />
        <section>
          { posts && (
          <Posts
            posts={posts}
            users={users}
            comments={comments}
            current={currentUser}
          />
          ) }
        </section>
      </div>

    ) : <Welcome />;
}

export default Feed;
