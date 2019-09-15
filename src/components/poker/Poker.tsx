import React, {Component} from 'react';
import PokerLabel from './poker-label/poker-label';
import PokerScreen from './poker-screen/poker-screen';
import PokerKeyboard from './poker-keyboard/poker-keyboard';
import './poker.sass';
import {Card} from "../../entities/card";
import {CardRank} from "../../enums/card-rank.enum";
import {CardSuit} from "../../enums/card-suit.enum";

class Poker extends Component {
  render() {
    const isSwitchedOn = true;
    const isGameOver = true;
    const isWin = true;
    const isHoldOrDraw = true;
    const score = 200;
    const royalFlush = [
      new Card({rank: CardRank.Ten, suit: CardSuit.Tiles}),
      new Card({rank: CardRank.Jack, suit: CardSuit.Tiles}),
      new Card({rank: CardRank.Queen, suit: CardSuit.Tiles}),
      new Card({rank: CardRank.King, suit: CardSuit.Tiles}),
      new Card({rank: CardRank.Ace, suit: CardSuit.Tiles}),
    ];
    const cards: Card[] = royalFlush;

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
