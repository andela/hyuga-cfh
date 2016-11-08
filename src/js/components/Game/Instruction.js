import React, {Component} from "react";

const Instruction = () => {
  return(
    <div className="answer-section row container">
      <h5>INSTRUCTIONS</h5>
      <div>
        <ul>
          <li>Each player begins with, and will always have, 10 white answer cards.</li>
          <li>For each round, one player is randomly chosen as the Card Czar.</li>
          <li>Everyone else answers the black question card by clicking on the answer card they want to use.</li>
          <li>The Card Czar then picks a favorite answer, and whoever played that answer wins the round.</li>
        </ul>
      </div>
    </div>
  );
}
export default Instruction;
