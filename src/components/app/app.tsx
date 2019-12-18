import React, { ReactNode } from 'react';
import './app.sass';
import Poker from '../poker/poker';
import { connect } from 'react-redux';
import actions from '../../actions/actions';
import { State } from '../../interfaces/state';

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
  holdCard: (data: any) => dispatch(actions.holdCard(data)),
  deal: (data: any) => dispatch(actions.deal(data)),
  draw: (data: any) => dispatch(actions.draw(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
