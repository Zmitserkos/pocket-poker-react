import React, {Component} from 'react';
import './poker-keyboard.sass';
import PokerKey from './poker-key/poker-key';

class PokerKeyboard extends Component {
  render() {
    return (
      <div className="poker-keyboard">
        <div className="key hold1">
          <PokerKey>Hold</PokerKey>
        </div>
        <div className="key hold2">
          <PokerKey>Hold</PokerKey>
        </div>
        <div className="key hold3">
          <PokerKey>Hold</PokerKey>
        </div>
        <div className="key hold4">
          <PokerKey>Hold</PokerKey>
        </div>
        <div className="key hold5">
          <PokerKey>Hold</PokerKey>
        </div>
        <div className="key points">
          <PokerKey>Game</PokerKey>
        </div>
        <div className="key deal-draw">
          <PokerKey>
            <span className="line -concise">Deal</span>
            <span className="line -concise">Draw</span>
          </PokerKey>
        </div>
        <div className="key music">
          <PokerKey disabled={true}>&#9834;</PokerKey>
        </div>
      </div>
    )
  }
}

export default PokerKeyboard;
