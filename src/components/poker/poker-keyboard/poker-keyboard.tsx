import React, {Component} from 'react';
import './poker-keyboard.sass';
import PokerKey from './poker-key/poker-key';

class PokerKeyboard extends Component {
  render() {
    return (
      <div className="poker-keyboard">
        <div className="key hold1">
          <PokerKey clickHandle={this.firstHoldKeyClickHandle}>Hold</PokerKey>
        </div>
        <div className="key hold2">
          <PokerKey clickHandle={this.secondHoldKeyClickHandle}>Hold</PokerKey>
        </div>
        <div className="key hold3">
          <PokerKey clickHandle={this.thirdHoldKeyClickHandle}>Hold</PokerKey>
        </div>
        <div className="key hold4">
          <PokerKey clickHandle={this.fourthHoldKeyClickHandle}>Hold</PokerKey>
        </div>
        <div className="key hold5">
          <PokerKey clickHandle={this.fifthHoldKeyClickHandle}>Hold</PokerKey>
        </div>
        <div className="key points">
          <PokerKey clickHandle={this.pointsKeyClickHandle}>Game</PokerKey>
        </div>
        <div className="key deal-draw">
          <PokerKey clickHandle={this.dealDrawKeyClickHandle}>
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

  firstHoldKeyClickHandle() {
  }

  secondHoldKeyClickHandle() {
  }

  thirdHoldKeyClickHandle() {
  }

  fourthHoldKeyClickHandle() {
  }

  fifthHoldKeyClickHandle() {
  }

  pointsKeyClickHandle() {
  }

  dealDrawKeyClickHandle() {
  }

}

export default PokerKeyboard;
