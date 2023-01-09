import React, { useState } from 'react';
import '../css/upload.css';
import { Link } from 'react-router-dom';
import smallLogo from '../socialground_small.png';
import { createPost, getUser } from '../api/mock_api';

function upload() {
  const [file, setFile] = useState();
  // const [postCaption, setCaption] = useState('');

  // function handleCaption(e) {
  //   setCaption(e);
  // }
  let currentFile = null;

  async function handlePost() {
    const user = await getUser(sessionStorage.getItem('user').slice(1, -1));
    const postInfo = {
      author: user.username,
      // eslint-disable-next-line no-underscore-dangle
      userId: user._id,
      caption: document.getElementById('searchTxt').value,
      comments: [],
      likes: [],
      hidden: [],
    };
    await createPost(currentFile, postInfo, user);
    window.location.href = 'http://localhost:3000/profile';
  }

  async function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
    // console.log('file url is', URL.createObjectURL(e.target.files[0]))
    // eslint-disable-next-line prefer-destructuring
    currentFile = e.target.files[0];
    console.log('current file is', currentFile);
    document.getElementById('clickMe').onclick = function handle() { handlePost(); };
  }

  return (
    <div id="react-root">
      <div aria-disabled="false" role="button">
        <Link to="/Feed">
          <img src={smallLogo} className="sg-logo-small" alt="sg-logo-small" />
        </Link>
      </div>
      <div className="main-body">
        <div className="select-box" />
        <div className="select-text">
          {/* Select Photo/Video from Device */}
          <form action="http://localhost:3000" method="POST">
            <img id="imageid" src={file} alt="Select file from device" />
            <input type="file" data-testid="fileInput" onChange={(e) => handleChange(e)} />
          </form>
        </div>
        <span className="new-post">New Post</span>
        <button type="button" id="clickMe" className="share" data-testid="shareButton">Share</button>
        <Link to="/profile">
          <a href="/profile" className="cancel">Cancel</a>
        </Link>
        {/* use input instead of blockquote */}
        {/* <blockquote contentEditable="true" className="caption-box">
          <h1 style={{ color: 'gray' }}>Enter Caption...</h1>
        </blockquote> */}
        <textarea type="text" id="searchTxt" className="caption-box" />
        <div className="footnotes">
          <span>@ Tag Users</span>
          <br />
          <span>Privacy Settings</span>
        </div>
      </div>
    </div>
  );
}

export default upload;
