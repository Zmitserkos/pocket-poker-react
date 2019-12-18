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

  holdCard(cardNumber: ScreenCardNumber) {
    // TODO: implement condition if () return;

    this.pokerGame.hold(cardNumber);
    this.props.holdCard({
      cardNumber,
      isHeld: this.pokerGame.cardsOnHand[cardNumber].isHeld,
    });
  }

  dealOrDraw() {
    if (this.props.isAnimating || this.pokerGame.isGameOver) return;

    if (!this.pokerGame.isFirstRound) {
      const dealData = this.pokerGame.deal();

      this.props.deal(dealData);
    } else {
      const drawData = this.pokerGame.draw();

      this.props.draw(drawData);
    }
  }

  startNewGame() {
  }
}

export default Poker;
