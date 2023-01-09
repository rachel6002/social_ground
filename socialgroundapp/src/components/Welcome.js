import React from 'react';
import '../css/Welcome.css';
import Swing from '../icons/swing.gif';

function Welcome() {
  return (
    <div className="welcome_screen">
      <h2 className="welcome_title">
        {/* <span className="welcome-word welcome-word-1">Welcome</span> */}
        <span className="welcome-word welcome-word-2">Social</span>
        <span className="welcome-word welcome-word-3">Ground</span>
        <span className="welcome-word welcome-word-4">.</span>
        <br />
        <img src={Swing} alt="welcome_swing" id="welcome_swing" data-testid="welcome_swing" />
      </h2>
    </div>
  );
}
export default Welcome;
