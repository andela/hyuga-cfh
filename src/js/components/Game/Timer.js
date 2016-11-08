import React, {Component} from "react";

const Timer = () => {
  const style = {
    width: '50%',
    background: '#A1232E',
  };
  return(
    <div className="progress container" >
      <div className="determinate game-time" style={style}></div>
    </div>
  );
}
export default Timer;
