import React from 'react';
import './poker-label-rule.sass';
import {Winning} from '../../../../enums/winning.enum';

interface PokerLabelRuleProps {
  description: string;
  win: Winning;
}

const PokerLabelRule: React.FC<PokerLabelRuleProps> = ({description, win}) => {
  return (
    <div className="poker-label-rule">
      <span className="description">{description}</span>

      <span className="dots" />

      <span className="win">{win}</span>
    </div>
  );
};

export default PokerLabelRule;
