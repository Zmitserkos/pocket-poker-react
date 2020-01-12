import React from 'react';
import PokerCard from './poker-card/poker-card';
import './poker-screen.sass';
import { PokerScreenProps } from '../../../interfaces/poker-screen-props';

const PokerScreen: React.FC<PokerScreenProps> = ({isGameOver, isWin, isHoldOrDraw, score, cards}: PokerScreenProps) => {
  const holdOrDrawElement = isHoldOrDraw ? <span className="hold-or-draw">HOLD or DRAW</span> : null;
  const gameOverElement = isGameOver ? <span className="game-over">GAME OVER</span> : null;
  const winElement = isWin ? <span className="win">WIN</span> : null;
  const cardElements = cards.map((card, index) => <div className="card" key={index + 1}><PokerCard card={card} /></div>);
  const pokerScreenContentElement = (
    <React.Fragment>
      <div className="header">
        {holdOrDrawElement}
        {gameOverElement}
        {winElement}
        <span className="score">{score}</span>
      </div>

      <div className="main">
        {cardElements}
      </div>
    </React.Fragment>
  );

  return (
    <div className="poker-screen">
      {pokerScreenContentElement}
    </div>
  );
};

export default PokerScreen;
