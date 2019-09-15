import React from 'react';
import './poker-key.sass';

export interface PokerKeyData {
  disabled?: boolean;
}

const PokerKey: React.FC<PokerKeyData> = (props) => {
  return (
    <button className={`poker-key ${props.disabled ? '-disabled' : ''}`}>
      {props.children}
    </button>
  );
};

export default PokerKey;
