import React from 'react';
import '../style/Feed.css';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Post from './Post';

function PostEdit() {
  const location = useLocation();
  const {
    post, users, comments, current,
  } = location.state;
  return (

    <div className="Feed">
      <Navbar />
      <section>
        <article className="post-box" key={post.id}>
          {post && users && comments && current && (
          <Post
            post={location.state.post}
            users={location.state.users}
            comments={location.state.comments}
            current={location.state.current}
          />
          )}
        </article>
      </section>
    </div>

  );
}

export default PostEdit;
