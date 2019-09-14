import React, {Component} from 'react';
import PokerLabel from './poker-label/poker-label';
import PokerScreen from './poker-screen/poker-screen';
import PokerKeyboard from './poker-keyboard/poker-keyboard';


class Poker extends Component {
  render() {
    const score = 200;
    const cards = [] as any[];

    return (
      <div className="poker">
        <PokerLabel />

        <PokerScreen
          score={score}
          cards={cards}
        />

        <PokerKeyboard />
      </div>
    )
  }
}

export default Poker;
