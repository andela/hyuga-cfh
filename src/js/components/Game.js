import React, {Component} from "react";
import Player from "./Game/Player";
import Question from "./Game/Question";
import Timer from "./Game/Timer";
import Answer from "./Game/Answer";

const Game = () => {
  return(
    <div className="main_background">
      <nav>
        <div className="nav-wrapper container">
          <a href="#" className="brand-logo">
            <img src="img/logo.png" />
          </a>
          <a id="mobile-menu-icon" data-activates="mobile-menu" className="button-collapse">
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">
            <li><a href="exit">EXIT</a></li>
          </ul>
          <ul className="side-nav" id="mobile-menu">
            <li><a href="exit">EXIT</a></li>
          </ul>
        </div>
      </nav>
      <div className="players">
        <Player />
      </div>
      <div className="Question">
        <Question />
      </div>
      <div className="timer">
        <Timer />
      </div>
      <div>
        <Answer />
      </div>

      <div className="donate row container">
        <div className="col s6 m4 l2 offset-s3 offset-m4 offset-l5">
          <button className="btn btn-large app-buttons">DONATE NOW</button>
        </div>
      </div>
    </div>
  );
};

export default Game;
