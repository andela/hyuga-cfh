import React, {Component} from 'react';

class Answer extends Component{
  constructor() {
    super();
    const answers = [
      'good, chart, charity',
      'learning react',
      'cards for humanity',
      'This is Andela (TIA)',
      'good, chart, charity',
      'learning react',
      'cards for humanity',
      'This is Andela (TIA)'
    ];
    this.state = {answers};
  }

  displayAnswers() {
    return this.state.answers.map((anAnswer, index) =>
      (<div className="col s6 m4 l3" key={index}>
        <div className="card hoverable">
          <div className="card-content valign-wrapper an-answer">
            <p className="valign">{anAnswer}</p>
          </div>
        </div>
      </div>)
    );
  }

  render() {
    return (
      <div className="answer-section row container">
        <h5>PICK A CARD</h5>
        <div>
          {this.displayAnswers()}
        </div>
      </div>
    );
  }
}
export default Answer;
