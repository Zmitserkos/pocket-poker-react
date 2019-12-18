import React, { ReactNode } from 'react';
import './poker-card.sass';
import { CardSuit } from '../../../../enums/card-suit.enum';
import { CardRank } from '../../../../enums/card-rank.enum';
import { Card } from '../../../../entities/card';

interface PokerCardProps {
  card: Card;
}

class PokerCard extends React.Component<PokerCardProps> {

  get rankName(): string {
    switch (this.props.card.rank) {
      case CardRank.Ace:
        return 'A';
      case CardRank.Two:
        return '2';
      case CardRank.Three:
        return '3';
      case CardRank.Four:
        return '4';
      case CardRank.Five:
        return '5';
      case CardRank.Six:
        return '6';
      case CardRank.Seven:
        return '7';
      case CardRank.Eight:
        return '8';
      case CardRank.Nine:
        return '9';
      case CardRank.Ten:
        return '10';
      case CardRank.Jack:
        return 'J';
      case CardRank.Queen:
        return 'Q';
      case CardRank.King:
        return 'K';
    }

    return '';
  }

  render() {
    if (!this.props.card) {
      return null;
    }

    const heldElements = this.getHeldElements();
    const suitElement = this.getSuitElement();
    return ( this.props.card.isVisible ?
      <div className="poker-card">
        <div className="main">
          <span className="rank">{this.rankName}</span>

          {heldElements}
        </div>

        <div className="footer">
          <span className="suit">
            {suitElement}
          </span>
        </div>
      </div> : null
    );
  }

  private getHeldElements(): ReactNode {
    return this.props.card.isHeld ? (
      <div className="held">
        <span>H</span>
        <span>E</span>
        <span>L</span>
        <span>D</span>
      </div>
    ) : null;
  }

  getSuitElement(): ReactNode {
    switch (this.props.card.suit) {
      case CardSuit.Hearts:
        return <span>&hearts;</span>;
      case CardSuit.Tiles:
        return <span>&diams;</span>;
      case CardSuit.Clovers:
        return <span>&clubs;</span>;
      case CardSuit.Pikes:
        return <span>&spades;</span>;
    }
  }

}

export default PokerCard;
