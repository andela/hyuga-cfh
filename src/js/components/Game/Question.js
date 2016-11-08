import React, {Component} from "react";

const Question = () => {
  return(
    <div className="question row container">
      <div className="col s6 m4 l3 offset-l1 offset-s3">
        <div className="card hoverable" id="banner-bg-card">
          <div className="card-content">
            <img src="img/tri_1.png" />
            <h5 className="center-align">
              <span className="app-color-blue">CARDS</span><br/>
              <span className="app-color-red">FOR</span><br/>
              <span className="app-color-green">HUMANITY</span>
            </h5>
            <img className="pull-right" src="img/tri_2.png" />
            <br/>
          </div>
        </div>
        <div className="card hoverable">
          <div className="card-content">
            <img src="img/tri_1.png" />
            <h5 className="center-align">
              <span className="app-color-blue">CARDS</span><br/>
              <span className="app-color-red">FOR</span><br/>
              <span className="app-color-green">HUMANITY</span>
            </h5>
            <img className="pull-right" src="img/tri_2.png" />
            <br/>
          </div>
        </div>
      </div>
      <div className="col s6 m4 l3 offset-l4 offset-s3">
        <div className="card hoverable">
          <div className="card-content valign-wrapper each-question">
            <p className="valign">This is a sample question with quite a number of unneccessary details</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Question;
