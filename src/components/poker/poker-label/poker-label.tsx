import React from 'react';
import './poker-label.sass';
import PokerLabelRule from './poker-label-rule/poker-label-rule';
import {Winning} from '../../../enums/winning.enum'

const PokerLabel: React.FC = () => {
  return (
    <div className="poker-label">
      <div className="header">
        <span className="label">
          <span className="letter">p</span>&nbsp;
          <span className="letter">o</span>&nbsp;
          <span className="letter">k</span>&nbsp;
          <span className="letter">e</span>&nbsp;
          <span className="letter">r</span>
        </span>

        <span className="best-combination">Royal Flush</span>
        <span className="max-win">{Winning.RoyalFlush}</span>
      </div>

      <div className="list list1">
        <PokerLabelRule description="Stright Flush" win={Winning.StrightFlush} />
        <PokerLabelRule description="Four Of Kind" win={Winning.FourOfKind} />
        <PokerLabelRule description="Full House" win={Winning.FullHouse} />
        <PokerLabelRule description="Flush" win={Winning.Flush} />
      </div>

      <div className="list list2">
        <PokerLabelRule description="Stright" win={Winning.Stright} />
        <PokerLabelRule description="Three Of Kind" win={Winning.ThreeOfKind} />
        <PokerLabelRule description="Two Pair" win={Winning.TwoPair} />
        <PokerLabelRule description="Jacks Or Better" win={Winning.JacksOrBetter} />
      </div>
    </div>
  );
};

export default PokerLabel;
