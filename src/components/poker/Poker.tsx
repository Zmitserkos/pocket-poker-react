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
import { AnimationType } from '../../enums/animation-type.enum';
import { State } from '../../interfaces/state';
import { PokerProps } from '../../interfaces/poker-props';

class Poker extends React.Component<PokerProps, State> {

  private pokerGame = new PokerGame();
  private animationTimer: any;
  private animationFrame = AnimationFrameNumber.First;
  private readonly interval = 500;

  constructor(props: PokerProps) {
    super(props);
    this.props.initialize();
  }

  render() {
    const { isGameOver, isWin, isHoldOrDraw, score, cards } = this.props;

    return (
      <div className="poker">
        <PokerLabel />

        <PokerScreen
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

  shouldComponentUpdate(nextProps: PokerProps): boolean {
    if (!nextProps.animationType && this.animationTimer) {
      this.clearAnimation();
    } else if (nextProps.animationType && !this.animationTimer) {
      this.setAnimation(nextProps.animationType);
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
    if (this.props.isDealOrDrawFrozen || this.pokerGame.isGameOver) return;

    if (!this.pokerGame.isFirstRound) {
      const dealData = this.pokerGame.deal();

      dealData.animationType = this.props.animationType;
      this.props.deal(dealData);
    } else {
      const drawData = this.pokerGame.draw();

      this.props.draw(drawData);
    }
  }

  startNewGame() {
    this.pokerGame.restartGame();
    this.dealOrDraw();
  }

  private clearAnimation() {
    clearInterval(this.animationTimer);
    this.animationTimer = null;
    this.animationFrame = AnimationFrameNumber.First;
  }

  private setAnimation(animationType: AnimationType) {
    switch (animationType) {
      case AnimationType.Initialization:
        this.animationTimer = setInterval(() => this.setInitAnimationFrame(), this.interval);
        break;
      case AnimationType.Winning:
        this.animationTimer = setInterval(() => this.setWinningAnimationFrame(), this.interval);
        break
    }
  }

  private setInitAnimationFrame() {
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
    const cards = this.getClonedCards(PokerGame.royalFlush);

    [ ScreenCardNumber.Second, ScreenCardNumber.Fourth ]
      .forEach(cardNumber => cards[cardNumber].isVisible = false);

    this.props.setScreenData({
      cards,
      screenHeaderData: {
        isWin: true,
        score: 0,
        isHoldOrDraw: true,
      },
    });
  }

  private setInitSecondFrame() {
    const cards = this.getClonedCards(PokerGame.royalFlush);

    [ ScreenCardNumber.First, ScreenCardNumber.Third, ScreenCardNumber.Fifth ]
      .forEach(cardNumber => cards[cardNumber].isVisible = false);

    this.props.setScreenData({
      cards,
      screenHeaderData: {
        score: Winning.RoyalFlush,
        isGameOver: true,
      },
    });
  }

  private setWinningAnimationFrame() {
    switch (this.animationFrame) {
      case AnimationFrameNumber.First:
        this.setWinningFirstFrame();
        this.animationFrame = AnimationFrameNumber.Second;
        break;
      case AnimationFrameNumber.Second:
        this.setWinningSecondFrame();
        this.animationFrame = AnimationFrameNumber.First;
        break;
    }
  }

  private setWinningFirstFrame() {
    const cards = this.getClonedCards(this.pokerGame.cardsOnHand);

    cards.forEach((card: Card) => {
      if (card.isWinning) {
        card.isVisible = false;
      }
    });

    this.props.setScreenData({
      cards,
      screenHeaderData: {
        isGameOver: true,
      },
    });
  }

  private setWinningSecondFrame() {
    const cards = this.getClonedCards(this.pokerGame.cardsOnHand);

    this.props.setScreenData({
      cards,
      screenHeaderData: {
        isWin: true,
      },
    });
  }

  private getClonedCards(cards: Card[]): Card[] {
    return cards.map((card: Card) => Card.clone(card));
  }

}

export default Poker;
