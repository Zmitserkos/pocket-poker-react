import React from 'react';
import PokerLabel from './poker-label/poker-label';
import PokerScreen from './poker-screen/poker-screen';
import PokerKeyboard from './poker-keyboard/poker-keyboard';
import './poker.sass';
import { PokerGame } from '../../entities/poker-game';
import { ScreenCardNumber } from '../../enums/screen-card-number.enum';
import { Winning } from '../../enums/winning.enum';
import { Card } from '../../entities/card';
import { AnimationFrameNumber } from '../../enums/animation-frame-number.enum';

class Poker extends React.Component<any, any> {

  private pokerGame = new PokerGame();
  private animationTimer: any;
  private animationFrame = 0;
  private readonly interval = 500;

  constructor(props: any) {
    super(props);
    this.animationTimer = setInterval(() => this.setInitAnimationFrame(), this.interval);
  }

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

  shouldComponentUpdate(nextProps: any): boolean {
    if (nextProps.isInitialized && this.animationTimer) {
      clearInterval(this.animationTimer);
      this.animationTimer = null;
    }

    return true;
  }

  holdCard(cardNumber: ScreenCardNumber) {
    if (!this.pokerGame.isFirstRound || this.pokerGame.isGameOver) return;

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

      dealData.isInitialized = this.props.isInitialized;
      this.props.deal(dealData);
    } else {
      const drawData = this.pokerGame.draw();

      this.props.draw(drawData);
    }
  }

  startNewGame() {
  }

  setInitAnimationFrame() {
    switch (this.animationFrame) {
      case AnimationFrameNumber.First:
        this.setInitFirstFrame();
        this.animationFrame = AnimationFrameNumber.Second;
        break;
      case AnimationFrameNumber.Second:
        this.setInitSecondFrame();
        this.animationFrame = AnimationFrameNumber.First;
        break;
    }
  }

  private setInitFirstFrame() {
    const newCards = PokerGame.royalFlush.map((card: Card) => Card.clone(card));

    newCards[ScreenCardNumber.Second].isVisible = false;
    newCards[ScreenCardNumber.Fourth].isVisible = false;

    this.props.setScreenData({
      newCards,
      screenData: {
        isWin: true,
        score: null,
        isHoldOrDraw: true,
      },
    });
  }

  private setInitSecondFrame() {
    const newCards = PokerGame.royalFlush.map((card: Card) => Card.clone(card));

    newCards[ScreenCardNumber.First].isVisible = false;
    newCards[ScreenCardNumber.Third].isVisible = false;
    newCards[ScreenCardNumber.Fifth].isVisible = false;

    this.props.setScreenData({
      newCards,
      screenData: {
        score: Winning.RoyalFlush,
        isGameOver: true,
      },
    });
  }

}

export default Poker;
