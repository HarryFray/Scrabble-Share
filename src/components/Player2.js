import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import WordInput from './WordInput';

class Player2 extends Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }

  handleReady() {
    this.setState({ isReady: true });
  }
  render() {
    const { currentGameId, gameInSession } = this.props;
    return (
      <Wrapper className="App">
        <h3>PLAYER DOS</h3>
        {!this.state.isReady && (
          <button onClick={this.handleReady.bind(this)}>I'm Ready!</button>
        )}
        {this.state.isReady &&
          gameInSession && (
            <WordInput player="Player2" currentGameId={currentGameId} />
          )}
      </Wrapper>
    );
  }
}

export default Player2;

const Wrapper = styled.div`
  flex: 1;
  background-color: green;
`;
