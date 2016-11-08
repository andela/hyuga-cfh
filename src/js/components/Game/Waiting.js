import React, {Component} from "react";

const Waiting = () => {
  return(
    <div className="question row container">
      <div className="col s4 m2 l2 offset-l5 offset-m5 offset-s4 waiting valign-wrapper">
        <div className="preloader-wrapper big active valign">
          <div className="spinner-layer spinner-red-only">
            <div className="circle-clipper left">
              <div className="circle"></div>
            </div><div className="gap-patch">
              <div className="circle"></div>
            </div><div className="circle-clipper right">
              <div className="circle"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Waiting;
