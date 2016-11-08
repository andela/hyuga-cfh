import React, {Component} from "react";

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
    </div>
  );
};

export default Game;
