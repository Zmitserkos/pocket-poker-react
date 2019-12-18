import React, { ReactNode } from 'react';
import './app.sass';
import Poker from '../poker/poker';
import { connect } from 'react-redux';
import actions from '../../actions/actions';
import { State } from '../../interfaces/state';
import { Card } from '../../entities/card';

class App extends React.Component<any, any> {
  render(): ReactNode {
    return (
      <div className="app">
        <div className="content">
          <Poker {...this.props}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: State) => ({
  isGameOver: state.isGameOver,
  isWin: state.isWin,
  isHoldOrDraw: state.isHoldOrDraw,
  score: state.score,
  cards: state.cards,
  isAnimating: state.isAnimating,
});

const mapDispatchToProps = (dispatch: any) => ({
  setCards: (cards: Card[]) => dispatch(actions.setCards(cards)),
  dealCards: (cards: Card[]) => dispatch(actions.dealCards(cards)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
