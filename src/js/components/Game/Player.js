import React, {Component} from 'react';

class Player extends Component{
  constructor() {
    super();
    const players = [
      {
        name: 'Oreoluwa Agunbiade',
        avi: 'img/chosen/FI02.png',
        score: 10
      },
      {
        name: 'Joshua Azemoh',
        avi: 'img/chosen/E01.png',
        score: 5
      },
      {
        name: 'Atanda Semiu',
        avi: 'img/chosen/F01.png',
        score: 2
      },
      {
        name: 'Ethan Nwankwo',
        avi: 'img/chosen/H01.png',
        score: 5
      },
      {
        name: 'Bayo Adesanya',
        avi: 'img/chosen/J01.png',
        score: 5
      },
      {
        name: 'Kenny Oni',
        avi: 'img/chosen/FI02.png',
        score: 10
      }
    ];
    this.state = {players};
  }

  displayPlayers() {
    return this.state.players.map((aPlayer, index) =>
      (<div className="col s6 m4 l2 a_player" key={index}>
        <div className="valign-wrapper">
          <div className="circle score">{aPlayer.score}</div>
          <span className="valign">{aPlayer.name}</span>
          <img className="avi" src={aPlayer.avi}/>
        </div>
      </div>)
    );
  }

  render() {
    return (
      <div>
        <h5>{Object.keys(this.state.players).length} Players</h5>
        <div className="row container">
          {this.displayPlayers()}
        </div>
      </div>
    );
  }
}
export default Player;
