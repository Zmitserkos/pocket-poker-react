import React, {Component} from 'react';
import PokerLabel from './poker-label/poker-label';
import PokerScreen from './poker-screen/poker-screen';
import PokerKeyboard from './poker-keyboard/poker-keyboard';
import './poker.sass';
import {Card} from "../../entities/card";

class Poker extends React.Component<any, any> {
  render() {
    const isSwitchedOn = true;
    const isGameOver = true;
    const isWin = true;
    const isHoldOrDraw = true;
    const score = 200;
    const cards: Card[] = [];

    return (
      <div className="poker">
        <PokerLabel />

        <PokerScreen
          isSwitchedOn={isSwitchedOn}
          isGameOver={isGameOver}
          isWin={isWin}
          isHoldOrDraw={isHoldOrDraw}
          score={score}
          cards={cards}
        />

        <PokerKeyboard />
      </div>
    )
  }
}

export default Poker;
