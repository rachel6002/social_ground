import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Profile from './components/profile';
import Upload from './components/upload';
import Login from './components/login';
import Registration from './components/registration';
import SuccessfulRegistration from './components/successfulRegistration';
// import UpdatePassword from './components/updatePassword';
// import PasswordReset from './components/passwordReset';
import Feed from './components/ActivityFeed';
import Find from './components/FindFriends';
import NotFound from './components/NotFound';
import PostEdit from './components/PostEdit';
import Setting from './components/Setting';
// import CaptionEdit from './components/CaptionEdit';
import Welcome from './components/Welcome';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/successful" element={<SuccessfulRegistration />} />
        {/* <Route path="/update" element={<UpdatePassword />} />
        <Route path="/reset" element={<PasswordReset />} /> */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/post/:postId" element={<PostEdit />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/Feed" element={<Feed />} />
        <Route path="/Find" element={<Find />} />
        <Route path="/setting" element={<Setting />} />
        {/* <Route path="/caption" element={<CaptionEdit />} /> */}
        <Route path="/Welcome" element={<Welcome />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
