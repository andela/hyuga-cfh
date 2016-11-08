import React from 'react';

const Signup = () => {
  return (
    <div>
      <div id="main-bod">
        <div id="top-part">
          <div className="wpb-top-bar">
            <div className="mod-contain" id="navver">
              <div className="row">
                <div className="wpb-logo-container">
                  <div id="landing-logo">
                    <span id="first-word">Cards</span>
                    <span id="second-word"> for</span>
                    <span id="third-word">Humanity</span>
                  </div>
                  <div className="col-md-9 wpb-menu-container">
                    <ul className="wpb-main-menu">
                      <li><a href="/">Home</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="wpb-teaser parallax-background" id="homer">
          <div className="background-opacity"></div>
          <div className="modified-container">
            <div className="row" id="main-text">
              <div id="landing-logo">
                <h2 id="slogan">Sign Up with:</h2>
                <div id="login-buttons">
                  <a href="/auth/facebook"><img className="login-item" src="/img/icons/facebook.png" /></a>
                  <a href="/auth/github"><img className="login-item" src="/img/icons/github.png" /></a>
                  <a href="/auth/twitter"><img className="login-item" src="/img/icons/twitter.png" /></a>
                  <a href="/auth/google"><img className="login-item" src="/img/icons/google.png" /></a>
                </div>
                <p id="create">Or create a username/password and select an avatar:</p>
                <div className="sign-body">
                  <div className="more-sign">
                    <form className="signup form-horizontal" action="/users" method="post">
                      <div className="control-group">
                        <label for="name" className="control-label"></label>
                        <div className="controls">
                          <input className="input-info" id="name" type="text" name="name" placeholder="Full name" required noValidate />
                        </div>
                      </div>
                      <div className="control-group">
                        <label for="email" className="control-label"></label>
                        <div className="controls">
                          <input className="input-info" id="email" type="email" name="email" placeholder="Email" required noValidate />
                        </div>
                      </div>
                      <div className="control-group">
                        <label for="password" className="control-label"></label>
                        <div className="controls">
                          <input className="input-info" id="password" type="password" name="password" placeholder="Password" required noValidate />
                        </div>
                      </div>
                      <div className="form-actions">
                        <button id="sign-up-btn-other" type='submit'>Sign Up</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
