import React, {Component} from "react";
import Player from "./Game/Player";
import Question from "./Game/Question";
import Timer from "./Game/Timer";
import Answer from "./Game/Answer";
import Waiting from "./Game/Waiting";
import Instruction from "./Game/Instruction";

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
        {/*<Waiting />*/}
      </div>
      <div className="timer">
        <Timer />
      </div>
      <div>
        {/*<Instruction />*/}
        <Answer />
      </div>
      <div className="donate row container">
        <div className="col s6 m4 l2 offset-s3 offset-m4 offset-l5">
          <button className="btn btn-large app-buttons">DONATE NOW</button>
        </div>
      </div>
      <footer className="section">
        <div className="container">
          <p className="center-align">
            Legal stuff: This game is based on the <a href="https://cardsagainsthumanity.com" className="inline-link">Cards against humanity</a> card game, which is CC licensed (BY-NC-SA). Cards for Humanity is not affiliated with Cards Against Humanity. In complying with the Creative Commons license of the Cards Against Humanity card game, all proceeds from donations go directly to charity, as managed by <a href="https://crowdrise.com" className="inline-link">crowdrise</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Game;
