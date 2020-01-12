import React from 'react';
import './poker-label-rule.sass';
import { PokerLabelRuleProps } from '../../../../interfaces/poker-label-rule-props';

const PokerLabelRule: React.FC<PokerLabelRuleProps> = ({description, win}: PokerLabelRuleProps) => {
  return (
    <div className="poker-label-rule">
      <span className="description">{description}</span>

      <span className="dots" />

      <span className="win">{win}</span>
    </div>
  );
};

export default PokerLabelRule;
