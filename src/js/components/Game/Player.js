import React, {Component} from 'react';

class Player extends Component{
  constructor() {
    super();
    const players = [
      {
        name: 'OREOLUWA AGUNBIADE',
        avi: 'img/chosen/FI02.png',
        score: 10
      },
      {
        name: 'JOSHUA AZEMOH',
        avi: 'img/chosen/E01.png',
        score: 5
      },
      {
        name: 'ATANDA SEMIU',
        avi: 'img/chosen/F01.png',
        score: 2
      },
      {
        name: 'ETHAN NWANKWO',
        avi: 'img/chosen/H01.png',
        score: 5
      },
      {
        name: 'BAYO ADESANYA',
        avi: 'img/chosen/J01.png',
        score: 5
      },
      {
        name: 'KENNY ONI',
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
        <h5>{Object.keys(this.state.players).length} PLAYERS</h5>
        <div className="row container">
          {this.displayPlayers()}
        </div>
      </div>
    );
  }
}
export default Player;