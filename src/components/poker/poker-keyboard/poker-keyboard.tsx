import React, {Component} from 'react';
import PokerKey from './poker-key/poker-key';

class PokerKeyboard extends Component {
  render() {
    return (
      <div className="poker-keyboard">
        <div>
          <PokerKey>Hold</PokerKey>
        </div>
        <div>
          <PokerKey>Hold</PokerKey>
        </div>
        <div>
          <PokerKey>Hold</PokerKey>
        </div>
        <div>
          <PokerKey>Hold</PokerKey>
        </div>
        <div>
          <PokerKey>Hold</PokerKey>
        </div>
        <div>
          <PokerKey>Game</PokerKey>
        </div>
        <div>
          <PokerKey>
            <span>Deal</span>
            <span>Draw</span>
          </PokerKey>
        </div>
        <div>
          <PokerKey>&#9834;</PokerKey>
        </div>
      </div>
    )
  }
}

export default PokerKeyboard;
