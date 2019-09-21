import React, {ReactNode} from 'react';
import './app.sass';
import Poker from "../poker/poker";
import {connect} from 'react-redux';
import actions from '../../actions/actions';


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

function mapStateToProps(state: any) {
  return {
    cards: state.cards,
  };
}

export default connect(mapStateToProps, actions)(App);
