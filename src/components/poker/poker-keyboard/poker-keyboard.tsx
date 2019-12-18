import React from 'react';
import './poker-keyboard.sass';
import PokerKey from './poker-key/poker-key';
import { ScreenCardNumber } from '../../../enums/screen-card-number.enum';

class PokerKeyboard extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="poker-keyboard">
        <div className="key hold1">
          <PokerKey clickHandle={this.firstHoldKeyClickHandle.bind(this)}>Hold</PokerKey>
        </div>
        <div className="key hold2">
          <PokerKey clickHandle={this.secondHoldKeyClickHandle.bind(this)}>Hold</PokerKey>
        </div>
        <div className="key hold3">
          <PokerKey clickHandle={this.thirdHoldKeyClickHandle.bind(this)}>Hold</PokerKey>
        </div>
        <div className="key hold4">
          <PokerKey clickHandle={this.fourthHoldKeyClickHandle.bind(this)}>Hold</PokerKey>
        </div>
        <div className="key hold5">
          <PokerKey clickHandle={this.fifthHoldKeyClickHandle.bind(this)}>Hold</PokerKey>
        </div>
        <div className="key points">
          <PokerKey clickHandle={this.pointsKeyClickHandle.bind(this)}>Game</PokerKey>
        </div>
        <div className="key deal-draw">
          <PokerKey clickHandle={this.dealDrawKeyClickHandle.bind(this)}>
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
    this.props.holdCard(ScreenCardNumber.First);
  }

  secondHoldKeyClickHandle() {
    this.props.holdCard(ScreenCardNumber.Second);
  }

  thirdHoldKeyClickHandle() {
    this.props.holdCard(ScreenCardNumber.Third);
  }

  fourthHoldKeyClickHandle() {
    this.props.holdCard(ScreenCardNumber.Fourth);
  }

  fifthHoldKeyClickHandle() {
    this.props.holdCard(ScreenCardNumber.Fifth);
  }

  pointsKeyClickHandle() {
    this.props.startNewGame();
  }

  dealDrawKeyClickHandle() {
    this.props.dealOrDraw();
  }

}

export default PokerKeyboard;
