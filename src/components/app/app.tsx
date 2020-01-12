import React, { ReactNode } from 'react';
import './app.sass';
import Poker from '../poker/poker';
import { connect } from 'react-redux';
import actions from '../../actions/actions';
import { State } from '../../interfaces/state';
import { ThunkDispatch } from 'redux-thunk';
import { ScreenData } from '../../interfaces/screen-data';
import { HeldCardData } from '../../interfaces/held-card-data';
import { DealData } from '../../interfaces/deal-data';
import { DrawData } from '../../interfaces/draw-data';
import { PokerAction } from '../../interfaces/poker-action';
import { PokerProps } from '../../interfaces/poker-props';

class App extends React.Component<PokerProps, State> {
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
  isDealOrDrawFrozen: state.isDealOrDrawFrozen,
  animationType: state.animationType,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<State, void, PokerAction>) => ({
  initialize: () => dispatch(actions.initialize()),
  holdCard: (data: HeldCardData) => dispatch(actions.holdCard(data)),
  deal: (data: DealData) => dispatch(actions.deal(data)),
  draw: (data: DrawData) => dispatch(actions.draw(data)),
  setScreenData: (data: ScreenData) => dispatch(actions.setScreenData(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
