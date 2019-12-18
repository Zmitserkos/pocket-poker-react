import React from 'react';
import PokerLabel from './poker-label/poker-label';
import PokerScreen from './poker-screen/poker-screen';
import PokerKeyboard from './poker-keyboard/poker-keyboard';
import './poker.sass';
import { PokerGame } from '../../entities/poker-game';
import { ScreenCardNumber } from '../../enums/screen-card-number.enum';

class Poker extends React.Component<any, any> {

  private pokerGame = new PokerGame();

  render() {
    const isSwitchedOn = true;
    const { isGameOver, isWin, isHoldOrDraw, score, cards } = this.props;

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

        <PokerKeyboard
          holdCard={this.holdCard.bind(this)}
          startNewGame={this.startNewGame.bind(this)}
          dealOrDraw={this.dealOrDraw.bind(this)}
          score={score}
        />
      </div>
    )
  }

  holdCard() {

  }

  dealOrDraw() {
    const cards = this.pokerGame.getNewMez(5);

    cards[0].screenNumber = ScreenCardNumber.First;
    cards[1].screenNumber = ScreenCardNumber.Second;
    cards[2].screenNumber = ScreenCardNumber.Third;
    cards[3].screenNumber = ScreenCardNumber.Fourth;
    cards[4].screenNumber = ScreenCardNumber.Fifth;

    this.props.dealCards(cards);
  }

  startNewGame() {
  }
}

export default Poker;
