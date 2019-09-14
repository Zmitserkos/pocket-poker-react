import React from 'react';
import PokerCard from './poker-card/poker-card';

export interface PokerScreen {
  score: number;
  cards: any[];
}

const PokerScreen: React.FC<PokerScreen> = ({score, cards}) => {
  const cardElements = cards.map(card => <PokerCard card={card} />);

  return (
    <div className="poker-screen">
      <div>
        <span>HOLD or DRAW</span>
        <span>GAME OVER</span>
        <span>WIN</span>
        <span>{score}</span>
      </div>

      <div>
        {cardElements}
      </div>
    </div>
  );
};

export default PokerScreen;
